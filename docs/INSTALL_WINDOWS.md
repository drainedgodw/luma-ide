# Luma for Windows — download and installation

This document is the complete Windows download and installation guide. It starts with the two ready-to-use packages, then covers checksum verification, installation, SmartScreen, antivirus and browser obstacles, removal, updates, and building from source.

## Choose a download method

### Recommended: Windows installer

Download **`Luma-Windows-Setup-x64.exe`** from the official release asset:

[Download `Luma-Windows-Setup-x64.exe`](https://github.com/drainedgodw/luma-ide-windows/releases/latest/download/Luma-Windows-Setup-x64.exe)

The installer is for Windows 10 and Windows 11 on x64. It installs the application, creates Start menu shortcuts, and includes the runtime files required by Luma. You do not need to install Node.js, npm, Git, or Electron separately to run the packaged application.

### Portable build

Download **`Luma-Windows-Portable-x64.exe`** when you do not want an installation:

[Download `Luma-Windows-Portable-x64.exe`](https://github.com/drainedgodw/luma-ide-windows/releases/latest/download/Luma-Windows-Portable-x64.exe)

Save it in a folder where you have write permission and run it. The portable build does not create Start menu entries. To remove it, close Luma and delete the executable and its local data folder if one was created beside it.

### Checksum file

Download **`SHA256SUMS.txt`** from the same release:

[Download `SHA256SUMS.txt`](https://github.com/drainedgodw/luma-ide-windows/releases/latest/download/SHA256SUMS.txt)

In PowerShell, verify a downloaded installer before running it:

```powershell
Get-FileHash .\Luma-Windows-Setup-x64.exe -Algorithm SHA256
Get-Content .\SHA256SUMS.txt
```

Compare the printed hash with the line for `Luma-Windows-Setup-x64.exe`. Do the same for the portable file when you downloaded that package.

## Install with the setup program

1. Download `Luma-Windows-Setup-x64.exe`.
2. Verify the SHA-256 hash using the commands above.
3. Double-click the installer.
4. If Windows asks for administrator approval, review the publisher and confirm only when the file came from the official Luma release.
5. Choose the installation directory if the installer asks.
6. Finish the wizard.
7. Start Luma from the Start menu or the desktop shortcut.

The installed package includes Electron, the application, production dependencies, native `node-pty`, the packaged Git runtime, the packaged Node/npm runtime, and the Windows blur helper. A separate Node.js installation is not required to run Luma.

## SmartScreen and antivirus warnings

The Windows build is currently unsigned, so Microsoft Defender SmartScreen can display **Windows protected your PC**. This is a reputation warning, not an application setting.

Before allowing the file to run:

1. Confirm that the filename is exactly `Luma-Windows-Setup-x64.exe` or `Luma-Windows-Portable-x64.exe`.
2. Confirm that it came from the official GitHub release asset above.
3. Verify the SHA-256 hash.
4. In SmartScreen, choose **More info**, inspect the file name, then choose **Run anyway** only if the checks match.

If Defender or another antivirus quarantines the file, do not disable protection globally. Re-download from the official release, verify the hash, and submit the file to your administrator or antivirus vendor for review. A corporate policy may prevent unsigned desktop applications from running; in that case, ask the administrator for an approved exception.

## Browser download problems

### The browser says the download failed

Use the direct asset link above or open the [Windows releases page](https://github.com/drainedgodw/luma-ide-windows/releases). Do not rename a Linux AppImage to `.exe`. If the browser keeps blocking the file, try another approved browser or download it with PowerShell:

```powershell
Invoke-WebRequest `
  -Uri "https://github.com/drainedgodw/luma-ide-windows/releases/latest/download/Luma-Windows-Setup-x64.exe" `
  -OutFile "$env:USERPROFILE\Downloads\Luma-Windows-Setup-x64.exe"
```

### GitHub returns 404

Make sure you are using the exact asset filename and the `releases/latest/download/` path. A release page URL by itself is not an installer URL. If the latest release has no Windows assets, open the release page and choose a release that explicitly lists the two Windows `.exe` files.

### PowerShell blocks a downloaded script

The packaged installer is an `.exe`; it does not require PowerShell execution-policy changes. Never bypass the execution policy just to run an unknown script. The source-build commands below are intended for a repository you downloaded from the official Luma repository.

## Update Luma

Download and run the newer `Luma-Windows-Setup-x64.exe`. The installer updates the installed application. Close Luma before updating. Your project files and Git repositories are not changed by the application update.

For the portable build, close Luma, replace the old executable with the new one, verify the new checksum, and run it again.

## Remove Luma

For the installed version:

1. Open **Windows Settings**.
2. Go to **Apps → Installed apps**.
3. Search for **Luma**.
4. Open the menu and choose **Uninstall**.
5. Complete the uninstall wizard.

For the portable version, close Luma and delete the `.exe`. If you want to remove user settings and cache as well, remove the Luma data directories under your Windows user profile only after backing up anything you need.

## Build from source on Windows

Use this when you want to test unreleased changes or create installers locally. The repository uses Node.js 22; the Windows workflow is intentionally not Node 20.

### Requirements

- Windows 10 or Windows 11 x64;
- Git;
- Node.js 22 and npm 10 or newer, matching `.nvmrc`;
- Python 3.11;
- Visual Studio Build Tools 2022 with the Desktop development with C++ workload;
- PowerShell 5.1 or PowerShell 7.

Check the versions before building:

```powershell
node --version
npm --version
python --version
git --version
```

### Build commands

```powershell
git clone https://github.com/drainedgodw/luma-ide.git
cd luma-ide
npm ci
npm run typecheck
npm test
npm run build
npx electron-builder --win nsis portable --publish never
```

The generated files are written to `dist/`. The CI workflow also verifies the packaged Git runtime, Node/npm runtime, native `node-pty` binary and Windows blur helper.

### Native build errors

If `node-pty` or another native module fails to build, confirm that Visual Studio Build Tools 2022 and Python 3.11 are installed. Then open a new PowerShell window and run:

```powershell
npm ci
npm run typecheck
npm test
```

Do not switch the project to a random Node version: use the version in `.nvmrc` and the `engines` field in `package.json`.

## Feedback

For quick feedback, message Telegram **[@upsetsay](https://t.me/upsetsay)**. For bugs, include the Windows version, CPU architecture, Luma version, installer type, and the relevant error text with secrets removed.
