# Development

## Prerequisites

- Rust 1.75+ (`rustup default stable`)
- macOS or Linux (iMessage requires macOS; everything else is cross-platform)
- `just` (optional, for coverage)

## Build + test

```sh
git clone https://github.com/borganization/borg
cd borg
cargo build
cargo test
cargo fmt --check
cargo clippy -- -D warnings
```

## Run from source

```sh
cargo run --bin borg
```

Data still lives at `~/.borg/` — dev and release share state unless you override:

```sh
BORG_HOME=/tmp/borg-dev cargo run
```

## Coverage

```sh
just coverage         # HTML report at target/coverage/index.html
just coverage-summary # text summary
```

Target: 80%+.

## Crate layout

See [reference/architecture](../reference/architecture).

Smaller crates (`apply-patch`, `sandbox`, `heartbeat`, `plugins`) enforce `#![warn(missing_docs)]`. Add `///` to every new public item.

## Adding a new setting

1. `crates/core/src/config/<section>.rs` — add the field + default.
2. `crates/core/src/config/settings_table.rs` — add one line to the `define_settings!` macro.

To show in the `/settings` TUI popup, append to `tui_settings { … }`:

```rust
"my.new.setting" => "Display Label", Bool, "Category";
```

`TuiSettingKind`: `Bool` / `Float` / `Uint` / `Select`. A unit test enforces that every `tui_settings` key resolves in `SETTING_REGISTRY`.

## Adding a new tool

Prefer extending an existing tool with an `action` parameter. If you must add:

- Definition: `crates/core/src/tool_definitions.rs`
- Handler: `crates/core/src/tool_handlers/<name>.rs`
- Group: `crates/core/src/tool_catalog.rs` (`tool_group()`)
- Plan mode: add to allowlist in `agent.rs` if read-only (new tools default to blocked)

## Adding a skill

`crates/core/skills/<name>/SKILL.md` + `include_str!` in `crates/core/src/skills.rs`.

## Adding a native channel

Directory: `crates/gateway/src/<name>/`. Modules: `types.rs`, `parse.rs`, `api.rs`, `verify.rs`. Register in `crates/gateway/src/server.rs` routes and `crates/gateway/src/channel_init.rs`.

## Debugging

```sh
RUST_LOG=debug cargo run
tail -f ~/.borg/logs/tui.log
tail -f ~/.borg/logs/daemon.log
```

Structured JSON logs are at `~/.borg/logs/{date}.jsonl`.
