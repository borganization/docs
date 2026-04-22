# Borganism

The living side of your agent. Borg tracks health, growth, and relationship with you across sessions. Use it long enough and your generic agent specializes into a named companion with its own stats and quirks.

- [vitals](vitals) — five health stats, event-sourced
- [bond](bond) — trust score between you and the agent
- [evolution](evolution) — stages, levels, archetypes
- [personality](personality) — identity files, tone, per-channel overrides

## How the pieces connect

- **Vitals** track moment-to-moment agent health. They rise with successful work and decay with inactivity.
- **Bond** tracks long-term trust. It rises with consistent use and correct behavior, gates Stage 2 and Stage 3 evolutions.
- **Evolution** progresses the agent through Base → Evolved → Final forms based on XP, bond, vitals, and archetype consistency.
- **Personality** shapes tone and identity. Orthogonal to progression, the agent's voice stays under your control.

## Shared foundations

All three stat systems (vitals, bond, evolution) share the same event-sourced design:

- Append-only ledger tables with HMAC-SHA256 chain signatures
- State computed by replay from baseline, no mutable snapshot
- Rate-limited replay so bulk inserts hit a ceiling
- Tamper detection via broken chain links

## Status commands

Inside Borg or any connected channel:

```
/status
/evolution
/xp
/card
```
