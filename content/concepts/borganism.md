# Borganism

The living side of your agent: health, trust, growth, and voice. Borg accumulates state across sessions, so a generic agent turns into a specialized companion over time.

## The four systems

- [Vitals](../borganism/vitals) — five health stats (stability, focus, sync, growth, happiness) that swing turn-to-turn.
- [Bond](../borganism/bond) — long-term trust score. Gates evolution progression.
- [Evolution](../borganism/evolution) — three-stage progression (Base → Evolved → Final) with archetype-based specialization.
- [Personality](../borganism/personality) — IDENTITY.md, per-channel overrides, tone customization.

## Shared design

All three stat systems share one event-sourced pattern:

- Append-only ledger tables with HMAC-SHA256 chain signatures
- State computed by replay from baseline
- Rate-limited during replay so bulk inserts hit a ceiling
- Tamper-evident through broken chain detection

Personality is orthogonal: it sits in config files and settings under your direct control.

## See the section

Full pages live in [borganism](../borganism).
