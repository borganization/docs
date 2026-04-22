# Install

## One-line installer (recommended)

```sh
curl -fsSL https://raw.githubusercontent.com/borganization/borg/main/scripts/install.sh | bash
```

The installer:

1. Detects your OS and CPU architecture (macOS arm64/x86_64, Linux x86_64/aarch64).
2. Downloads the matching binary from the latest [release](https://github.com/borganization/borg/releases).
3. Installs to `/usr/local/bin/borg` (or `~/.local/bin/borg` if no sudo).
4. Runs `borg` for first-time onboarding.

## Manual download

Grab the binary for your platform from [Releases](https://github.com/borganization/borg/releases), then:

```sh
chmod +x borg
mv borg /usr/local/bin/
borg
```

## Build from source

Requires Rust 1.75+.

```sh
git clone https://github.com/borganization/borg
cd borg
cargo build --release
./target/release/borg
```

See [contributing/development](../contributing/development) for the full dev setup.

## Data directory

Everything lives under `~/.borg/`:

```
~/.borg/
  borg.db            SQLite: sessions, messages, memory, settings, schedules
  IDENTITY.md        agent personality (editable)
  HEARTBEAT.md       optional heartbeat checklist
  skills/            user skills (override built-ins)
  channels/          user script-based channels
  logs/              tui.log, daemon.log, {date}.jsonl
```

No `config.toml`. All settings live in `borg.db` — use `borg settings …` or the `/settings` popup in the TUI.

## Uninstall

```sh
rm /usr/local/bin/borg
rm -rf ~/.borg
```
