# Code Style

## Formatting + lint

```sh
cargo fmt --check
cargo clippy -- -D warnings
```

These pass on CI. No merges otherwise.

## Docs on public items

Smaller crates (`apply-patch`, `sandbox`, `heartbeat`, `plugins`) enforce `#![warn(missing_docs)]`. Every new public item needs `///`.

## Error handling

Never silently swallow. `let _ = …` and `.ok()` are banned on operations that matter.

- Return `Result` with `?` when the caller handles errors.
- In fire-and-forget contexts (async callbacks, hooks, delivery queues), log with `tracing::warn!` and continue.
- Acceptable `let _ = …`: truly best-effort (typing indicators, terminal cleanup in Drop impls, temp file removal).
- If an op reports success to the user, it must actually succeed.

## Tracing

Use structured logging, not `println!`:

```rust
tracing::warn!(channel = %name, error = %e, "channel delivery failed");
```

## Tool conservation

Every tool's JSON schema ships to the LLM every turn. Adding a tool costs ~5KB per turn across every Borg install forever. Prefer extending an existing tool with a new `action` parameter.

## No approval prompts

Don't add per-tool-call confirmation. The agent executes. Sandboxing is the safety boundary, not a dialog.

## Mouse interaction

Do not add to `crates/cli/src/tui/mod.rs` or `app.rs`:

- Escape sequences `?1000h`, `?1002h`, `?1003h`, `?1006h`
- Crossterm `EnableMouseCapture` / `DisableMouseCapture`
- `Event::Mouse` arms
- Scrollbar click-drag

Guard tests will fail loudly. See [reference/architecture](../reference/architecture#mouse-interaction).

## Patch DSL

Every content line needs a prefix (`+`, space, or `-`). See [reference/patch-dsl](../reference/patch-dsl).
