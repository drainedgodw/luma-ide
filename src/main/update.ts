import { app, ipcMain } from 'electron';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

const REPO = 'drainedgodw/luma-ide';
const VERSION_URL = `https://raw.githubusercontent.com/${REPO}/main/update.json`;
const INSTALLER_URL = `https://raw.githubusercontent.com/${REPO}/main/install.sh`;
const RELEASES_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

function newerThan(latest: string, current: string): boolean {
  const a = latest.split('.').map(Number);
  const b = current.split('.').map(Number);
  for (let i = 0; i < 3; i += 1) {
    if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0);
  }
  return false;
}

async function latestVersion(): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(VERSION_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`update check: HTTP ${response.status}`);
    const data = (await response.json()) as { version?: string };
    if (!data.version) throw new Error('update check: no version field');
    return data.version;
  } finally {
    clearTimeout(timer);
  }
}

async function updateWindows(): Promise<void> {
  const response = await fetch(RELEASES_URL, { headers: { 'User-Agent': 'Luma updater' } });
  if (!response.ok) throw new Error(`windows update: GitHub HTTP ${response.status}`);
  const release = (await response.json()) as {
    tag_name?: string;
    assets?: Array<{ name: string; browser_download_url: string }>;
  };
  const asset = release.assets?.find((item) => /setup.*\.exe$/i.test(item.name)) ??
    release.assets?.find((item) => item.name.endsWith('.exe'));
  if (!asset) throw new Error('windows update: installer asset was not found');
  const installerResponse = await fetch(asset.browser_download_url, {
    headers: { 'User-Agent': 'Luma updater' },
  });
  if (!installerResponse.ok) throw new Error(`windows update: download HTTP ${installerResponse.status}`);
  const installer = join(app.getPath('temp'), `Luma-${release.tag_name ?? 'update'}-Setup.exe`);
  await writeFile(installer, Buffer.from(await installerResponse.arrayBuffer()));
  spawn(installer, ['/S'], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
}

export function registerUpdateIpc(): void {
  ipcMain.handle('update:check', async () => {
    try {
      const current = app.getVersion();
      const latest = await latestVersion();
      return { ok: true, data: { current, latest, update: newerThan(latest, current) } };
    } catch (error) {
      return { ok: false, error: { message: (error as Error).message, stderr: '' } };
    }
  });

  ipcMain.handle('update:run', async (_event, channel: string) => {
    if (channel !== 'release' && channel !== 'nightly')
      return { ok: false, error: { message: 'Unknown update channel', stderr: '' } };
    try {
      if (process.platform === 'win32') {
        await updateWindows();
      } else {
        const child = spawn(
          'bash',
          ['-c', `curl -fsSL ${INSTALLER_URL} | bash -s -- --update --release`],
          { detached: true, stdio: 'ignore' }
        );
        child.unref();
      }
      setTimeout(() => {
        app.relaunch();
        app.exit(0);
      }, 300);
      return { ok: true, data: 'updating' };
    } catch (error) {
      return { ok: false, error: { message: (error as Error).message, stderr: '' } };
    }
  });
}
