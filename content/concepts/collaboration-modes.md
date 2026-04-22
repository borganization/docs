# Collaboration Modes

Three modes control how proactive the agent gets. Switch via config, the `/mode` TUI popup, or `--mode` on the CLI.

| Mode | Behavior |
|---|---|
| Default | Asks clarifying questions when things look ambiguous. Balanced. |
| Execute | Autonomous. Makes assumptions and proceeds on low-risk work. |
| Plan | Read-only. Blocks mutating tools. Produces `<proposed_plan>`. |

Templates live at `crates/core/templates/collaboration_mode/`.

## Plan mode

Plan mode blocks every tool off the read-only allowlist. The agent produces a structured plan instead of executing. On approval, Borg auto-restores the previous mode and runs.

- Shortcut: `/plan` toggles Plan mode.
- `App::previous_collab_mode` is the single source of truth for the Plan-to-execute flow.
- New tools default to blocked. For a read-only tool in Plan mode, add the tool to the allowlist in `crates/core/src/agent.rs`.

## Switching

```sh
borg --mode execute
```

```
> /mode
```

```sh
borg settings set collab.default_mode execute
```
