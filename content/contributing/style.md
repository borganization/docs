# Code Style

## Formatting and lint

```sh
cargo fmt --check
cargo clippy -- -D warnings
```

Both pass on CI. No merges otherwise.

## Docs on public items

Smaller crates (`apply-patch`, `sandbox`, `heartbeat`, `plugins`) enforce `#![warn(missing_docs)]`. Every new public item gets `///`.

## Error handling

Never silently swallow. `let _ = ...` and `.ok()` stay banned on operations of consequence.

- Return `Result` with `?` when the caller handles errors.
- In fire-and-forget contexts (async callbacks, hooks, delivery queues), log with `tracing::warn!` and continue.
- Acceptable `let _ = ...`: truly best-effort work. Typing indicators, terminal cleanup in Drop impls, temp file removal.
- When an operation reports success to the user, the operation must succeed.

## Tracing

Use structured logging, not `println!`:

```rust
tracing::warn!(channel = %name, error = %e, "channel delivery failed");
```

## Tool conservation

Every tool's JSON schema ships to the LLM every turn. Adding a tool costs about 5KB per turn across every Borg install forever. Extend an existing tool with a new `action` parameter first.

## No approval prompts

Do not add per-tool-call confirmation. The agent executes. Sandboxing is the safety boundary, not a dialog.

## Mouse interaction

Do not add to `crates/cli/src/tui/mod.rs` or `app.rs`:

- Escape sequences `?1000h`, `?1002h`, `?1003h`, `?1006h`
- Crossterm `EnableMouseCapture`, `DisableMouseCapture`
- `Event::Mouse` arms
- Scrollbar click-drag

Guard tests fail loudly. See [reference/architecture](../reference/architecture#mouse-interaction).

## Patch DSL

Every content line needs a prefix (`+`, space, or `-`). See [reference/patch-dsl](../reference/patch-dsl).
