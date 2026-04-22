# First Run

Your first `borg` command starts an onboarding flow. You pick:

1. A provider and API key. Pick one:
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

After onboarding you land in the TUI:

```
~ borg
(hit / to open the command palette, Ctrl+C twice to quit)
> 
```

## What just happened

- `~/.borg/borg.db` was created. V1 through V39 migrations ran.
- Default [skills](../concepts/skills) registered.
- Two recurring tasks scheduled: nightly memory consolidation (3 AM) and weekly memory review (4 AM Sunday).
- A daily self-healing sweep scheduled for 02:00.

## Smoke test

```
> what's the weather in brooklyn?
```

With the `weather` skill available and `curl` installed, you get a live answer. Otherwise Borg explains what is missing.

## Common first-session commands

| Command | Use |
|---|---|
| `/settings` | Interactive settings popup |
| `/model` | Switch provider or model |
| `/memory` | Inspect what Borg remembers |
| `/plugins` | Manage plugins and channels |
| `/stats` | Vitals: stability, focus, sync, growth, happiness |
| `/help` | All commands |

See [reference/commands](../reference/commands) for the full list.
