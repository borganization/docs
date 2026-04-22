# Developer Copilot

Coding agent in the terminal. Project-scoped memory, real tool use, no web UI.

## Setup

```sh
cd my-project
borg
```

The agent reads `CLAUDE.md` / `AGENTS.md` from the repo root and injects it into the system prompt. Treat that file as your rules of engagement.

Enable Plan mode for anything risky:

```
/plan
```

## Daily flow

```
> /plan fix the failing test in crates/core/src/agent.rs
(agent produces <proposed_plan>)
> proceed
(agent executes — edits, runs tests, commits if you asked)
```

## Memory

Project-scoped. Per-repo context stays in its own bubble:

```
project:borg/conventions   — "no silent error swallowing", tool conservation, mouse invariants
project:borg/recent-bugs   — specific incidents worth remembering
project:other-repo/...     — unrelated
```

## Ghost commits

Every session snapshots the repo to a temp index. `/undo` atomically reverts to that snapshot without touching your real git log.

## Hooks

Gate dangerous commands with a `PreToolUse` hook:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "run_shell",
        "command": "jq -e '.input.command | test(\"git push --force\") | not' <<< \"$1\"",
        "timeout": 5
      }
    ]
  }
}
```

## Pair with Claude Code / codex

Borg's `/migrate` can import from either. The coding styles are compatible enough that you can move between them.
