# Onboarding

Your first `borg` command starts an onboarding flow. You pick:

1. A provider and API key:
   - `OPENROUTER_API_KEY` — recommended default. One account, many models.
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `GEMINI_API_KEY`
   - `DEEPSEEK_API_KEY`
   - `GROQ_API_KEY`
   - A running local [Ollama](https://ollama.com) instance — no key needed
   - The Claude Code CLI — Borg falls through to whatever `claude` uses

2. A personality style. Borg seeds `~/.borg/IDENTITY.md` from a template. Edit the file any time. The agent edits itself too, via `write_memory`.

3. Time zone and quiet hours. Used by the [heartbeat](../concepts/heartbeat) scheduler.

## What just happened

- First memories formed. Borg opened its private store under `~/.borg/` and started a fresh session.
- Default [plugins](../concepts/plugins) registered.
- Nightly memory consolidation scheduled for 3 AM.
- Weekly memory review scheduled for 4 AM Sunday.
- Daily self-healing sweep scheduled for 2 AM.
- A ghost commit snapshotted your working directory, so any edit Borg makes is reversible with `/undo`.

## Common first-session commands

| Command | Use |
|---|---|
| `/help` | List all commands |
| `/settings` | Interactive settings popup |
| `/model` | Switch provider or model |
| `/mode` | Switch collaboration mode: Default, Execute, or Plan |
| `/plan` | Toggle read-only Plan mode with auto-restore on proceed |
| `/memory` | Inspect what Borg remembers |
| `/plugins` | Manage plugins and channels |
| `/skills` | List built-in and user skills |
| `/schedule` | Manage scheduled prompts, cron commands, and workflows |
| `/projects` | Create, switch, and archive projects |
| `/status` | [Vitals](../borganism/vitals): stability, focus, sync, growth, happiness |
| `/card` | Your agent's evolution card |
| `/xp` | Progression level and bond |
| `/poke` | Trigger an immediate heartbeat check-in |
| `/doctor` | Run the self-healing sweep on demand |

See [reference/commands](../reference/commands) for the full list.
