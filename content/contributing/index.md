# Contributing

- [development](development) — workspace layout, build, test, lint
- [testing](testing) — what a good test looks like in this repo
- [roadmap](roadmap) — what's next
- [style](style) — code style and invariants worth preserving

## Ground rules

Borg has a small set of hard invariants. Every contribution preserves them. They live in `CLAUDE.md` at the repo root and mirror in [reference/architecture](../reference/architecture#critical-invariants).

Highlights:

- Never silently swallow errors. Log and propagate, or log and continue. Never `.ok()` on an operation of consequence.
- No approval prompts. The agent executes. Shell commands auto-run. Only catastrophic commands are denied.
- Mouse text selection is sacred. Do not reintroduce `EnableMouseCapture` or xterm mouse-tracking escape codes. Guard tests fail loudly.
- Be conservative adding tools. Every tool's schema costs about 5KB per turn. Extend an existing tool first.
- No fluff tests. Every test must fail for a real reason.

## PRs

- `cargo fmt --check` and `cargo clippy -- -D warnings` must pass.
- Tests for any new behavior.
- Do not reformat unrelated files.
- Small PRs land faster.
