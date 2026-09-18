# Luma for Linux — download and installation

This document is the complete Linux download and installation guide. It starts with the fastest method, then covers manual downloads, verification, updates, removal, source builds, and the small problems that most often interrupt an installation.

## Choose a download method

### Recommended: one-command installer

The installer downloads the current Luma build, verifies its SHA-256 checksum, unpacks the AppImage without requiring FUSE, installs the application under `~/.local/opt/luma`, creates a desktop entry and icon, and creates the `luma` command under `~/.local/bin`.

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh)"
```

The same command installs Luma for the first time and updates an existing installation. It does not require Node.js, npm, Git, or a system-wide package installation for the prebuilt AppImage.

If you use Fish, run the same installer explicitly through Bash. This avoids Fish interpreting Bash syntax:

```fish
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/scripts/visible-install.sh | bash
```

Pass installer options after `--` when using a pipe:

```bash
# Stable GitHub Release
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --release

# Rolling build from main
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --nightly

# Download the source and build the current main branch
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --source
```

### Manual AppImage download

The stable release currently provides:

- [`Luma-0.4.3.AppImage`](https://github.com/drainedgodw/luma-ide/releases/download/v0.4.3/Luma-0.4.3.AppImage) — the graphical application;
- [`luma-0.4.3.tar.gz`](https://github.com/drainedgodw/luma-ide/releases/download/v0.4.3/luma-0.4.3.tar.gz) — the release archive;
- [`SHA256SUMS.txt`](https://github.com/drainedgodw/luma-ide/releases/download/v0.4.3/SHA256SUMS.txt) — checksums for the release assets.

Download the AppImage and checksum file into the same directory. Then verify it before launching:

```bash
sha256sum -c SHA256SUMS.txt --ignore-missing
chmod +x Luma-0.4.3.AppImage
./Luma-0.4.3.AppImage
```

The AppImage can remain in any directory. It does not have to be copied to `/usr/bin` or `/opt`.

### Build from source

Use this when you want to test unreleased changes or create your own package:

```bash
git clone https://github.com/drainedgodw/luma-ide.git
cd luma-ide
bash scripts/bootstrap.sh dev
```

The bootstrap keeps a private compatible Node.js 22 and CPython 3.11 under the ignored `.luma/` directory. It does not change the system Node.js installation, Python installation, or shell configuration.

Useful commands:

```bash
bash scripts/bootstrap.sh setup --force  # install or repair dependencies
bash scripts/bootstrap.sh doctor         # check Electron and native modules
bash scripts/bootstrap.sh test           # run tests
bash scripts/bootstrap.sh ci             # typecheck, test and build
bash scripts/bootstrap.sh dist           # create Linux packages
bash scripts/bootstrap.sh clean          # remove build output and node_modules
bash scripts/bootstrap.sh purge          # also remove private toolchains
```

For a normal local development environment, the bootstrap may need Git, `make`, a C/C++ compiler, `curl` or `wget`, and `tar`. If they are missing, the script prints the exact package-manager command; rerun with `--install-system-deps` when you want it to install them automatically.

## Update Luma

Run the recommended one-command installer again. It downloads the selected channel and replaces the installation atomically:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh)"
```

To update specifically to a stable release:

```bash
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --release
```

## Remove Luma

Remove the application but keep settings, cache and saved credentials:

```bash
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --uninstall
```

Remove the application and all Luma settings, cache, sessions and stored credentials:

```bash
curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash -s -- --purge
```

## Where files are installed

The user-local installer uses these locations:

- application: `~/.local/opt/luma`;
- terminal launcher: `~/.local/bin/luma`;
- desktop entry: `~/.local/share/applications/luma.desktop`;
- icon: `~/.local/share/icons/hicolor/512x512/apps/luma.png`;
- settings: `~/.config/Luma` or `~/.config/luma`;
- cache: `~/.cache/Luma` or `~/.cache/luma`;
- state and sessions: `~/.local/state/Luma` or `~/.local/state/luma`.

## Common download and installation problems

### `curl: command not found`

Install curl with the package manager, or use wget:

```bash
wget -qO- https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh | bash
```

### The download returns 404

Use the official `main` installer URL exactly as shown above. Do not replace `luma-ide` with the old repository name. For a manual release, open the release page and copy the asset name exactly; Linux filenames are case-sensitive.

### A proxy, firewall or corporate certificate blocks the download

First check the connection to the official hosts:

```bash
curl -I https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh
curl -I https://github.com/drainedgodw/luma-ide/releases/latest
```

If the network requires a proxy, configure `HTTPS_PROXY` and `HTTP_PROXY` for the current shell before running the installer. Do not disable TLS verification. If your organization intercepts TLS, ask the administrator for the approved CA configuration instead of using `curl -k`.

### `Permission denied` when launching the AppImage

Make it executable and launch it from the same directory:

```bash
chmod +x Luma-0.4.3.AppImage
./Luma-0.4.3.AppImage
```

### FUSE errors

The Luma installer extracts the AppImage and therefore does not need FUSE. For a manually downloaded AppImage, use the installer or run the AppImage with its extraction support rather than installing random FUSE packages:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/drainedgodw/luma-ide/main/install.sh)"
```

### The `luma` command is not found

The application menu can still launch Luma. Add the user-local bin directory to the current shell and then to your shell profile if you want it permanently:

```bash
export PATH="$HOME/.local/bin:$PATH"
luma
```

### The icon or desktop entry does not appear immediately

Log out and back in, or refresh the desktop database if the commands are available:

```bash
update-desktop-database "$HOME/.local/share/applications" 2>/dev/null || true
gtk-update-icon-cache -f -t "$HOME/.local/share/icons/hicolor" 2>/dev/null || true
```

### Checksum verification fails

Do not launch the file. Delete it, download it again, and verify again. A mismatch usually means a partial download, a proxy cache problem, or that the checksum file and AppImage came from different releases.

### The application opens with a blank or incorrect window on Wayland

Update your graphics drivers and compositor first. For a diagnostic launch, try:

```bash
~/.local/bin/luma --ozone-platform-hint=auto
```

If the problem remains, report your desktop environment, display server, GPU, and terminal output in a GitHub issue.

## Feedback

For quick feedback, message Telegram **[@upsetsay](https://t.me/upsetsay)**. For bugs, include your Linux distribution, desktop environment, display server, Luma version, and the command output with secrets removed.
