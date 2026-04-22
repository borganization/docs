# Bond

Bond is a long-term trust score between you and the agent. Vitals swing turn-to-turn. Bond accumulates across weeks and months.

## Score

A single number from 0 to 100. Tiers label the score in `/status`:

| Range | Label |
|---|---|
| 0 to 19 | Stranger |
| 20 to 39 | Familiar |
| 40 to 59 | Trusted |
| 60 to 79 | Close |
| 80 to 100 | Devoted |

## What moves it

Bond rises from sustained, correct behavior. It falls from repeated corrections and long gaps.

| Signal | Effect |
|---|---|
| Successful multi-turn task | + |
| Tool call you accepted without correction | + |
| Creation event (memory, skill, channel) | + |
| User correction ("that's wrong", "try again") | — |
| Long inactivity | decay |

Exact weights live in the scoring module. Bond is slow by design, a meaningful score takes weeks.

## Why it matters

Bond gates evolution:

- Stage 1 → Stage 2 requires bond ≥ 30
- Stage 2 → Stage 3 requires bond ≥ 55

A low bond blocks progression even at Lvl.99. The agent has the XP but has not earned the trust.

## Architecture

Event-sourced, same design as [vitals](vitals) and [evolution](evolution):

- `bond_events` table, append-only
- HMAC-SHA256 chain links each event to the prior
- `BondHook` listens on `SessionStart`, `AfterToolCall`, correction signals
- Score replays from baseline on every read
- Tamper-evident, rate-limited, lazy decay

## Viewing

```
/status
```

The bond line appears under vitals with score and tier.
