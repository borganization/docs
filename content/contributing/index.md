# Contributing

- [development](development) — workspace layout, build, test, lint
- [testing](testing) — what a good test looks like in this repo
- [roadmap](roadmap) — what's next
- [style](style) — code style + invariants worth preserving

## Ground rules

Borg has a small set of hard invariants that every contribution must preserve. They're listed in `CLAUDE.md` at the repo root and mirrored in [reference/architecture](../reference/architecture#critical-invariants).

The highlights:

- **Never silently swallow errors.** Log + propagate, or log + continue. Never `.ok()` on an operation that matters.
- **No approval prompts.** The agent just executes. Shell commands auto-run. Only catastrophic commands are denied.
- **Mouse text selection is sacred.** Don't reintroduce `EnableMouseCapture` or xterm mouse-tracking escape codes. Guard tests will fail loudly.
- **Be conservative adding tools.** Every tool's schema costs ~5KB per turn. Prefer extending an existing tool.
- **No fluff tests.** Every test must be able to fail for a real reason.

## PRs

- `cargo fmt --check` and `cargo clippy -- -D warnings` must pass.
- Tests for any new behavior.
- Don't reformat unrelated files.
- Small PRs land faster.
