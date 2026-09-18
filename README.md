# Luma

Luma is a desktop code editor with optional visual Git tools.

Open a folder, edit files and search the workspace without setting up Git first. When the folder is a Git repository, Luma adds changes, history, recovery and GitHub views around it.

- Electron + React + TypeScript
- CodeMirror editor
- Git is optional for ordinary editing
- Cosmos and Liquid Glass themes
- Adjustable Liquid Glass blur
- Linux and Windows builds
- MIT licensed

## Download

The current release is **0.4.3**.

### Linux

[Download the latest Linux release](https://github.com/drainedgodw/luma-ide/releases/latest)

The release page contains an AppImage, a tarball and `SHA256SUMS.txt`.

For an AppImage:

```bash
chmod +x Luma-0.4.3.AppImage
./Luma-0.4.3.AppImage
```

The AppImage does not need a system installation. Keep it wherever you want. If you want it in the application menu, use the installer helper from the repository:

```bash
bash install.sh --install --release
```

The helper installs Luma under `~/.local`, creates a desktop entry and can be removed with:

```bash
bash install.sh --uninstall
```

Arch users can also use the package files from the release page or the AUR recipe in `aur/`.

### Windows

[Download the latest Windows release](https://github.com/drainedgodw/luma-ide/releases/latest)

Choose one of these files:

- `Luma Setup 0.4.3.exe` — normal installation with a Start menu shortcut;
- `Luma 0.4.3.exe` — portable build, if you do not want an installer.

Windows may show a SmartScreen warning because the build is not signed with a commercial certificate. Click **More info → Run anyway** only if the file was downloaded from the official release page above.

To remove the installed version, use **Windows Settings → Apps → Installed apps → Luma → Uninstall**. The portable build can be removed by deleting its file.

## Liquid Glass blur

Open **Settings → Appearance & sound** and select **Liquid Glass**. The **Liquid Glass blur** slider controls the strength of the frosted effect:

- left: blur is off;
- middle: light blur;
- right: stronger blur.

The setting is stored locally and does not change the Cosmos theme.

## Build from source

Requirements:

- Node.js 22;
- npm 10 or newer;
- the native build tools required by Electron and `node-pty`.

```bash
git clone https://github.com/drainedgodw/luma-ide.git
cd luma-ide
npm ci
npm run typecheck
npm test
npm run build
```

For a local Linux package:

```bash
npx electron-builder --linux AppImage tar.gz --publish never
```

For a local Windows package, run the same command on Windows:

```powershell
npm ci
npm run typecheck
npm test
npm run build
npx electron-builder --win nsis portable --publish never
```

## About

See [ABOUT.md](ABOUT.md) for the short product description and the Liquid Glass behavior.

## License

[MIT](LICENSE)
