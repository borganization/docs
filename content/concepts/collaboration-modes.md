# Collaboration Modes

Three modes control how proactive the agent gets. Switch with `/mode` or set a default in `/settings`.

| Mode | Behavior |
|---|---|
| Default | Asks clarifying questions when things look ambiguous. Balanced. |
| Execute | Autonomous. Makes assumptions and proceeds on low-risk work. |
| Plan | Read-only. Blocks mutating tools. Produces `<proposed_plan>`. |

## Plan mode

Plan mode blocks every tool off the read-only allowlist. The agent produces a structured plan instead of executing. On approval, Borg auto-restores the previous mode and runs.

- Shortcut: `/plan` toggles Plan mode.
- New tools default to blocked. For a read-only tool in Plan mode, add the tool to the allowlist.

## Switching

```
/mode execute
```

Set a default in `/settings` under `collab.default_mode`.
