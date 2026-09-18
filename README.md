<div align="center">

<img src="build/icon.png" width="96" alt="Luma logo" />

# Luma

**See what Git will do before it does it.**

A visual, Git-first desktop IDE for Linux and Windows: understandable history, previewable operations, and recovery from mistakes.

![platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows-1793d1) ![license](https://img.shields.io/badge/license-MIT-22c55e) ![status](https://img.shields.io/badge/status-stable%20release-22c55e)

</div>

> [!WARNING]
> Windows installers are currently unsigned and may trigger Microsoft Defender SmartScreen. Only use files downloaded from the official Luma release pages.

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


## Install

**Windows installer — `Luma-Windows-Setup-x64.exe`**

[Open the complete Windows download and installation guide](docs/INSTALL_WINDOWS.md)

**Linux package — `Luma-0.4.3.AppImage`**

[Open the complete Linux download and installation guide](docs/INSTALL_LINUX.md)

The two guides contain direct download methods, verification steps, installation and removal instructions, source builds, and fixes for common download problems.

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
- Contribution: read [CONTRIBUTING.md](CONTRIBUTING.md).
- Changes: see [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE)

## Feedback

Telegram: **[@upsetsay](https://t.me/upsetsay)**
