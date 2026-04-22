# Vitals

Event-sourced agent health. Five stats, computed by replaying HMAC-verified events.

| Stat | Measures |
|---|---|
| Stability | Crash-free sessions, clean tool exits |
| Focus | Task completion vs. drift |
| Sync | Alignment with your corrections |
| Growth | New skills, new memory entries over time |
| Happiness | Positive vs. negative user signals |

## Architecture

- Events append to `vitals_events` with an HMAC signature.
- Replaying events from zero reconstructs the current snapshot. No mutable state.
- `VitalsHook` listens on `SessionStart`, `BeforeAgentStart`, `AfterToolCall`.

## Viewing

```
/status
```

## Why event-sourced

Stats stay tamper-evident. HMAC verification detects corrupted rows. Tampered rows get rejected, not acted on.
