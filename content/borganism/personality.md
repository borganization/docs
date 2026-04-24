# Personality

Personality is the voice and tone your agent speaks in. You control it directly by editing files and settings.

## IDENTITY.md

Your agent's personality lives at `~/.borg/IDENTITY.md`. This file loads as the first part of the system prompt every turn.

- Created during onboarding from a chosen style (Professional, Friendly, Terse, Playful, Custom).
- Edit it anytime with any text editor. Changes apply on the next turn.
- The agent writes to this file too. When you correct tone or style, the agent updates its own identity.

Example:

```md
# Identity

You are Borg, a personal assistant.

Tone: direct, spartan, no filler.
Avoid: hedging language, apologies, emoji.
Prefer: short sentences, concrete recommendations, code over prose.
```

Keep it short. The whole file loads every turn, so long identity files eat your context budget.

## HEARTBEAT.md

Optional checklist at `~/.borg/HEARTBEAT.md`. When present, the file injects into proactive heartbeat turns. Use it to steer what the agent checks in about.

```md
# Heartbeat checklist

- Review open GitHub issues assigned to me
- Remind me if I have not pushed code in 2 days
- Flag calendar conflicts for tomorrow
```

See [concepts/heartbeat](../concepts/heartbeat).

## Per-channel identity overrides

Gateway bindings override identity per channel or per sender. Run a strict professional tone in Slack and a casual tone in Telegram from the same agent. Set `gateway.bindings` in `/settings`:

```json
[
  {"channel":"slack","identity":"professional"},
  {"channel":"telegram","identity":"friendly"}
]
```

Identity names resolve to files at `~/.borg/identities/<name>.md`. Drop new files there to add styles.

## Collaboration modes

Modes shape behavior independent of personality:

| Mode | Behavior |
|---|---|
| Default | Asks clarifying questions before acting |
| Execute | Runs autonomously end-to-end |
| Plan | Read-only, produces a proposed plan |

Switch modes with `/mode`, or set a default in `/settings`. See [collaboration-modes](../concepts/collaboration-modes).

## Evolution identity

Once your agent reaches Stage 2, it earns a name like `Ops Borg` based on your dominant usage archetype. The name sticks forever. Personality (tone, voice) stays under your control via IDENTITY.md. Evolution adds a layer, it does not overwrite your customization. See [evolution](evolution).

## Config

Other customization knobs:

| Setting | Effect |
|---|---|
| `llm.temperature` | Creativity vs. determinism |
| `llm.thinking` | Extended reasoning on supported models |
| `collab.mode` | Default collaboration mode |
| `heartbeat.enabled` | Proactive check-ins on or off |
| `heartbeat.interval` | How often the agent reaches out |

See [reference/settings](../reference/settings) for the full list.
