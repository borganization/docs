# Vitals

Event-sourced agent health. Five stats computed by replaying HMAC-verified events.

| Stat | What it measures |
|---|---|
| **Stability** | Crash-free sessions, clean tool exits |
| **Focus** | Task completion vs. drift |
| **Sync** | Alignment with user corrections |
| **Growth** | New skills, new memory entries over time |
| **Happiness** | Positive vs. negative user signals |

## Architecture

- Events are appended to `vitals_events` with an HMAC signature.
- Replaying events from zero always reconstructs the current snapshot — no mutable state.
- `VitalsHook` listens on `SessionStart`, `BeforeAgentStart`, `AfterToolCall`.

## Viewing

```sh
borg status
```

In the TUI:

```
/status
```

## Why event-sourced?

So stats can't be silently tampered with. HMAC verification means a corrupted row is detected, not acted on.
