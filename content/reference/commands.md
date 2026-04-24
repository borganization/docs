# Slash Commands

Slash commands drive everything: settings, models, scheduling, status, memory, plugins.

## Core

| Command | Use |
|---|---|
| `/plugins` | Add, remove, manage plugins and channels |
| `/schedule` | Manage scheduled prompts, scripts, workflows |
| `/projects` | Browse and switch projects |
| `/settings` | Configure any setting from a popup |
| `/model` | Switch LLM provider and model |
| `/memory` | Inspect long-term memory context |
| `/migrate` | Import from another agent (Claude Code, codex) |

## Conversation

| Command | Use |
|---|---|
| `/btw <q>` | Side question using current context. No history impact. |
| `/poke` | Trigger an immediate [heartbeat](../concepts/heartbeat) |
| `/usage` | Token and cost usage for this session |
| `/plan` | Toggle Plan mode. Read-only, produces `<proposed_plan>`. |
| `/mode` | Switch collaboration mode |
| `/clear` | Clear the session |
| `/undo` | Revert to the last [ghost commit](architecture#git-utilities) |

## Personality

| Command | Use |
|---|---|
| `/evolution` | See how your Borg evolved over time |
| `/xp` | XP summary and recent feed |
| `/stats` | [Vitals](../borganism/vitals): stability, focus, sync, growth, happiness |
| `/card` | Print a shareable ASCII card of your Borg |

## Maintenance

| Command | Use |
|---|---|
| `/doctor` | Run diagnostics on Borg and host environment |
| `/heal` | Run the full [self-healing](../concepts/self-healing) maintenance sweep on demand |
| `/update` | Update Borg to the latest release |

## Utilities

| Command | Use |
|---|---|
| `/help` | Command reference |
| `/status` | Same as `/stats` |
| `/quit` | Exit |

## CLI equivalents

Run `borg help` for the full CLI reference. Common equivalents:

```sh
borg poke              # /poke
borg status            # /stats
borg daemon start      # run gateway + scheduler
borg schedule list     # /schedule
borg settings set k v  # /settings
borg credentials set K VAL
borg --mode execute
```
