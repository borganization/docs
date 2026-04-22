# First Run

The first time you run `borg`, an onboarding flow asks for:

1. **A provider + API key.** Any of:
   - `OPENROUTER_API_KEY` — recommended default, access to many models through one account
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `GEMINI_API_KEY`
   - `DEEPSEEK_API_KEY`
   - `GROQ_API_KEY`
   - A running local [Ollama](https://ollama.com) instance (no key needed)
   - The Claude Code CLI at runtime (falls through to whatever `claude` is configured with)

2. **A personality style.** Borg seeds `~/.borg/IDENTITY.md` from a template. You can edit this file any time; the agent can also edit itself via `write_memory`.

3. **Time zone + quiet hours.** Used for the [heartbeat](../concepts/heartbeat) scheduler.

After onboarding you're dropped into the TUI:

```
~ borg
(hit / to open the command palette, Ctrl+C twice to quit)
> 
```

## What just happened

- `~/.borg/borg.db` was created and all V1–V39 migrations applied.
- Default [skills](../concepts/skills) were registered.
- Two recurring tasks were scheduled: nightly memory consolidation (3 AM) and weekly memory review (4 AM Sunday).
- A daily self-healing sweep was scheduled for 02:00.

## Smoke test

```
> what's the weather in brooklyn?
```

If the `weather` skill is available and you have `curl`, you'll get a live answer. Otherwise Borg will explain what's missing.

## Common first-session commands

| Command | What it does |
|---|---|
| `/settings` | Interactive settings popup |
| `/model` | Switch provider/model |
| `/memory` | Inspect what Borg remembers |
| `/plugins` | Manage plugins and channels |
| `/stats` | Vitals — stability, focus, sync, growth, happiness |
| `/help` | All commands |

See [reference/commands](../reference/commands) for the full list.
