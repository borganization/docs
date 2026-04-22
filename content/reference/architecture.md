# Architecture

Cargo workspace with 7 crates.

| Crate | Purpose |
|---|---|
| `cli` | Binary. REPL, TUI, clap commands, onboarding, heartbeat display |
| `core` | Library. Agent loop, multi-provider LLM, memory, identity, config, tools, skills, workflows |
| `heartbeat` | Library. Proactive scheduler with quiet hours + dedup |
| `sandbox` | Library. macOS Seatbelt + Linux Bubblewrap policies |
| `apply-patch` | Library. Patch DSL parser + filesystem applicator |
| `gateway` | Library. Webhook gateway, native channel integrations |
| `plugins` | Library. Marketplace catalog + plugin installer |

## Build

```sh
cargo build
cargo test
cargo fmt --check
cargo clippy -- -D warnings
```

Smaller crates (`apply-patch`, `sandbox`, `heartbeat`, `plugins`) enforce `#![warn(missing_docs)]`. Every public item has a `///` doc comment.

All integrations are compiled unconditionally. `iMessage` is macOS-only via `#[cfg(target_os = "macos")]`.

## Critical invariants

Sourced from `CLAUDE.md` in the main repo:

### No silent error swallowing

`let _ = …` and `.ok()` are banned on operations that matter. Every error is logged + propagated, or logged + continued in fire-and-forget contexts. If an op reports success to the user, it must actually succeed.

### No approval prompts

Per-tool-call confirmation dialogs are **explicitly removed** as a design decision. Shell commands auto-execute. Only catastrophic commands (`rm -rf /`, `mkfs`, `dd`, `curl|sh`) are denied. Sandboxing and rate-limiting are security boundaries, not approval gates.

### Mouse interaction

Native click+drag text selection must work in the transcript with no modifier keys. Implementation: xterm Alternate Scroll Mode (`?1007h`) only. Forbidden: `?1000h`, `?1002h`, `?1003h`, `?1006h`, `EnableMouseCapture`, `DisableMouseCapture`, `Event::Mouse`. Guard tests read source via `include_str!` and fail if forbidden patterns reappear.

### Tool conservation

Every tool's JSON schema is sent to the LLM every turn (~5KB+). Prefer extending an existing tool with a new `action` parameter over adding a new tool.

### Patch DSL prefixes

Every content line in the patch DSL needs `+`, ` ` (space), or `-`. See [patch-dsl](patch-dsl).

### Blocked paths

`[security] blocked_paths` are filtered from sandbox `fs_read` / `fs_write` before profile generation. `list_dir` re-checks on every entry.

## Database

SQLite at `~/.borg/borg.db`. V39 migrations run on `Database::open()`.

Key tables: `sessions`, `messages`, `scheduled_tasks`, `task_runs`, `channel_sessions`, `channel_messages`, `settings`, `pairing_requests`, `approved_senders`, `embedding_cache`, `vitals_events`, `projects`, `workflows`, `workflow_steps`, `memory_entries`, `skill_audit`, `doctor_runs`, `activity_log`.

## Git utilities

`crates/core/src/git.rs`:

- **Ghost commits.** Snapshot the repo on session start using a temp index. Enables atomic undo without polluting the real git log.
- **Git context.** Branch, recent commits, dirty status — injected into the system prompt.

## Debugging

Logs at `~/.borg/logs/`:

- `tui.log` — TUI session
- `daemon.log` / `daemon.err` — daemon
- `{date}.jsonl` — structured JSON logs

`RUST_LOG=debug borg` for module-level control.
