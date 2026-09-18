<div align="center">

<img src="build/icon.png" width="96" alt="Luma logo" />

# Luma

**See what Git will do before it does it.**

A visual, Git-first desktop IDE for Linux and Windows: understandable history, previewable operations, and recovery from mistakes.

![platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows-1793d1) ![license](https://img.shields.io/badge/license-MIT-22c55e) ![status](https://img.shields.io/badge/status-stable%20release-22c55e)

</div>

> [!WARNING]
> Windows installers are currently unsigned and may trigger Microsoft Defender SmartScreen. Only use files downloaded from the official Luma release pages.

## Why Luma?

Most IDEs treat Git as a sidebar. Luma treats history as the workspace itself: inspect commits in a visual web, preview a rewrite before applying it, and keep a recovery point before moving `HEAD`.

## Install

### Linux — one command

This installs Luma to `~/.local`, adds it to the application menu, installs the icon, and creates the `luma` command. Node.js is not required for the binary install.

```sh
bash -c "$(curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh)"
```

The same command installs and updates Luma. The installer downloads the current build, verifies its SHA-256 checksum, extracts the AppImage without requiring FUSE, and swaps the installation atomically.

Choose a channel explicitly when needed:

```sh
# Latest stable GitHub Release
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --release

# Rolling build from main
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --nightly

# Build the current main branch locally (AUR-style)
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --source
```

Remove only the application and keep settings:

```sh
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --uninstall
```

Remove the application, settings, cache, sessions and saved credentials:

```sh
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --purge
```

If `~/.local/bin` is not in your `PATH`, the application menu still works. To launch from a terminal, add it for the current shell:

```sh
export PATH="$HOME/.local/bin:$PATH"
luma
```

### Linux — manual download

The current stable release is **0.4.3**. Download the files directly:

- [Luma-0.4.3.AppImage](https://github.com/drainedgodw/luma-ide/releases/download/v0.4.3/Luma-0.4.3.AppImage) — graphical Linux build;
- [luma-0.4.3.tar.gz](https://github.com/drainedgodw/luma-ide/releases/download/v0.4.3/luma-0.4.3.tar.gz) — source/package archive;
- [SHA256SUMS.txt](https://github.com/drainedgodw/luma-ide/releases/download/v0.4.3/SHA256SUMS.txt) — checksums.

Run the AppImage directly:

```sh
chmod +x Luma-0.4.3.AppImage
./Luma-0.4.3.AppImage
```

Verify the download before launching it:

```sh
sha256sum -c SHA256SUMS.txt --ignore-missing
```

### Windows 10/11 — installer or portable build

For Windows, download the latest x64 release from the [official Windows release page](https://github.com/drainedgodw/luma-ide-windows/releases/latest). The release contains both packages:

- `Luma-Windows-Setup-x64.exe` — normal installation with Start menu shortcuts;
- `Luma-Windows-Portable-x64.exe` — portable build; no installation is required;
- `SHA256SUMS.txt` — SHA-256 checksums.

**Installer:** download `Luma-Windows-Setup-x64.exe`, run it, choose the installation directory, and launch Luma from the Start menu or desktop shortcut.

**Portable:** download `Luma-Windows-Portable-x64.exe` to a folder and run it. To remove it, close Luma and delete the file.

Windows may show a SmartScreen warning because the build is unsigned. Check the checksum first, then choose **More info → Run anyway** only when the file came from the official release page.

To remove the installed version, use **Windows Settings → Apps → Installed apps → Luma → Uninstall**.

### Build from source on Windows

Windows developers can build the application from PowerShell. The build uses Node.js 22 (the version in `.nvmrc`), npm 10 or newer, Visual Studio Build Tools 2022, Python 3.11, and Git.

```powershell
git clone https://github.com/drainedgodw/luma-ide.git
cd luma-ide
npm ci
npm run typecheck
npm test
npm run build
npx electron-builder --win nsis portable --publish never
```

The installers are written to `dist/`. The packaged application includes Electron, the production dependencies, Git runtime, Node/npm runtime and the native terminal dependency required by Luma.

### From source on Linux

```sh
git clone https://github.com/drainedgodw/luma-ide.git
cd luma-ide
bash scripts/bootstrap.sh dev
```

The bootstrap downloads a private, compatible Node 22 and CPython 3.11 into the ignored `.luma/` directory. It does not change your system Node, Python or shell configuration.

Useful source commands:

```sh
bash scripts/bootstrap.sh setup --force
bash scripts/bootstrap.sh test
bash scripts/bootstrap.sh ci
bash scripts/bootstrap.sh dist
bash scripts/bootstrap.sh clean
bash scripts/bootstrap.sh purge
```

## Features

- **History** — commit graph in two views: classic Lanes and an interactive Orbit web (drag to pan, wheel to zoom, hover traces the branch)
- **Changes** — staging by drag & drop, diffs, conflict resolution, commit messages with a template history
- **Visual rebase** — reorder, squash, fixup, reword and drop commits; cherry-pick, revert, tags, merge strategy choice
- **Safety net** — Secret Guard scans staged additions, every rollback creates a checkpoint branch, Rescue browses the reflog, bisect and stash included
- **Editor** — CodeMirror 6 with syntax highlighting, tabs, find & replace, project-wide search (Ctrl+Shift+F), quick open (Ctrl+P)
- **Terminal** — integrated terminal unlocked per repository via Workspace Trust
- **GitHub** — fine-grained PAT or SSH keys, clone, fetch, pull, push; the token is encrypted and never stored in plain text
- **Languages & Ecosystem** — detects runtimes and project dependencies, installs packages and frameworks with a whitelisted command set
- **Updates** — anonymous version check against `update.json` (no accounts, no telemetry)
- **Two themes** — Cosmos and Liquid Glass

## Keyboard

- Ctrl + `P` — quick open file
- Ctrl + `F` — find in editor / search workspace
- Ctrl + Shift + `F` — search across the project
- Ctrl + Shift + `P` — command palette
- Ctrl + `B` — pin/auto-hide Explorer
- Ctrl + `` ` `` — terminal
- Terminal divider: ↑ / ↓ resize, Home / End choose minimum / maximum, Enter toggles maximize

Full walkthrough: [docs/USERGUIDE.md](docs/USERGUIDE.md).

## Project structure

```text
src/main/       Electron process, Git, terminal, trust and filesystem services
src/preload/    typed and allowlisted IPC bridge
src/renderer/   React UI, editor and visual Git workflows
src/shared/     shared types and graph layout
tests/          parser, Git integration, security and recovery tests
docs/           installation and user documentation
aur/            optional Arch packaging recipe
```

## Reporting problems

- Security issue: follow [SECURITY.md](SECURITY.md); do not open a public exploit report.
- Bug or feature proposal: open a GitHub issue with OS, display server, Git version, reproduction steps and logs with secrets removed.
- Quick feedback or questions: ping the author on Telegram — [@upsetsay](https://t.me/upsetsay).
- Contribution: read [CONTRIBUTING.md](CONTRIBUTING.md).
- Changes: see [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE)

## Screenshots

**Start** — open any directory, or jump back into a recent one. Luma is an editor first; Git initializes when you ask for it.
![Start screen](docs/screenshots/login.png)

**Code** — the editor: tabs, per-file Reload / Save / History / Stage, and a status line with position, indent and encoding.
![Code](docs/screenshots/code.png)

**Changes** — the working tree and the commit container: stage with + or by dragging a file in, write the message, commit or stash.
![Changes](docs/screenshots/changes.png)

**History — Lanes** — the commit list with ordinals, authors, tags and branch refs. ↑ ↓ navigate, Enter opens a commit.
![History lanes](docs/screenshots/history_lanes.png)

**History — Orbit** — the same repository as a flat, Obsidian-style web: nodes never overlap, hovering traces the branch while the rest of the web fades.
![History orbit](docs/screenshots/history_orbit.png)

**GitHub** — connect a fine-grained token, then clone and open repositories without leaving Luma.
![GitHub](docs/screenshots/GitHub.png)

**Tools** — workspace trust, detected project tasks, a read-only Git operation preview and workspace snapshots.
![Tools](docs/screenshots/Tools.png)

**Rescue** — every move `HEAD` ever made; any moment is one click away.
![Rescue](docs/screenshots/rescue.png)

**Stack** — the runtimes actually installed on the machine and the project manifest that was detected.
![Stack](docs/screenshots/stack.png)

**Settings** — editor, Git behavior, themes, interface sounds and the anonymous update check.
![Settings](docs/screenshots/setup.png)
