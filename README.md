<div align="center">

<img src="build/icon.png" width="96" alt="Luma logo" />

# Luma

**See what Git will do before it does it.**

A visual, Git-first desktop IDE for Linux and Windows: understandable history, previewable operations, and recovery from mistakes.

![platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows-1793d1) ![license](https://img.shields.io/badge/license-MIT-22c55e) ![status](https://img.shields.io/badge/status-stable%20release-22c55e)

</div>

> [!WARNING]
> Windows installers are currently unsigned and may trigger Microsoft Defender SmartScreen. Only use files downloaded from the official Luma release pages.

## Previews

<table>
<tr>
<td><img src="docs/screenshots/login.png" alt="Luma start screen" /></td>
<td><img src="docs/screenshots/code.png" alt="Luma code editor" /></td>
</tr>
<tr>
<td><img src="docs/screenshots/changes.png" alt="Luma changes view" /></td>
<td><img src="docs/screenshots/history_orbit.png" alt="Luma history view" /></td>
</tr>
</table>

## Install

[Windows download and installation documentation](docs/INSTALL_WINDOWS.md)

[Linux download and installation documentation](docs/INSTALL_LINUX.md)

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
