# Developer Copilot

Coding agent in the terminal. Project-scoped memory. Real tool use. No web UI.

## Setup

```sh
cd my-project
borg
```

The agent reads `CLAUDE.md` or `AGENTS.md` from the repo root and injects the content into the system prompt. Treat those files as your rules of engagement.

Enable Plan mode for anything risky:

```
/plan
```

## Daily flow

```
> /plan fix the failing test in src/auth/session.ts
(agent produces <proposed_plan>)
> proceed
(agent executes. Edits. Runs tests. Commits with your approval.)
```

## Memory

Project-scoped. Per-repo context stays in the repo's bubble:

- `project:borg/conventions` — "no silent error swallowing", tool conservation, mouse invariants
- `project:borg/recent-bugs` — specific incidents worth remembering
- `project:other-repo/...` — unrelated

## Ghost commits

Every session snapshots the repo to a temp index. `/undo` atomically reverts to the snapshot without touching your real git log.

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

## Pair with Claude Code or codex

Borg's `/migrate` imports from either. The coding styles stay compatible enough to move between them.
