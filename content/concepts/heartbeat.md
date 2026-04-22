# Heartbeat

Proactive check-ins. Borg wakes itself on a schedule and decides whether to message you.

## Defaults

- Interval: 30 min (or cron expression).
- Quiet hours: 00:00 to 06:00 local.
- Injected file: `~/.borg/HEARTBEAT.md` (optional checklist).

## What happens

1. The scheduler fires at the interval, outside quiet hours.
2. Borg runs a heartbeat turn with `HEARTBEAT.md` injected.
3. Borg filters output:
   - Empty response — suppressed
   - Duplicate of the last check-in — suppressed
   - Ack-only response ("ok", "noted") — suppressed
4. The message delivers via active channels, honoring gateway bindings.

## Poke

Force an immediate heartbeat:

```
/poke
```

## Configuration

Set these in `/settings`:

| Key | Value |
|---|---|
| `heartbeat.enabled` | `true` |
| `heartbeat.interval` | `30m` |
| `heartbeat.quiet_hours` | `00:00-06:00` |

Use a cron string instead of an interval by setting `heartbeat.cron`:

```
0 9,13,17 * * 1-5    # 9am, 1pm, 5pm weekdays
```

## HEARTBEAT.md

```markdown
# Heartbeat Checklist

When you check in:

1. Any pending PR reviews?
2. Anything due today from the schedule?
3. Any ignored emails from starred senders?

Only message me with something actionable. Otherwise stay silent.
```

The agent reads the file on every heartbeat turn.
