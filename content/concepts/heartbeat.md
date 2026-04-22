# Heartbeat

Proactive check-ins. Borg wakes itself up on a schedule and decides whether to message you.

## Defaults

- **Interval:** 30 min (or cron expression)
- **Quiet hours:** 00:00–06:00 local
- **Injected file:** `~/.borg/HEARTBEAT.md` (optional checklist)

## What happens

1. Scheduler fires at the interval (outside quiet hours).
2. Borg runs a heartbeat turn with `HEARTBEAT.md` injected.
3. Output is filtered:
   - empty response → suppressed
   - duplicate of last check-in → suppressed
   - ack-only ("ok", "noted") → suppressed
4. Delivered via active channels, honoring gateway bindings.

## Poke

Force an immediate heartbeat:

```sh
borg poke
```

Or in the TUI:

```
/poke
```

## Configuration

```sh
borg settings set heartbeat.enabled true
borg settings set heartbeat.interval "30m"
borg settings set heartbeat.quiet_hours "00:00-06:00"
```

Or use a cron string:

```sh
borg settings set heartbeat.cron "0 9,13,17 * * 1-5"   # 9am/1pm/5pm weekdays
```

## HEARTBEAT.md

```markdown
# Heartbeat Checklist

When you check in:

1. Any pending PR reviews?
2. Anything due today from the schedule?
3. Any ignored emails from starred senders?

Only message me if something is actionable. Otherwise stay silent.
```

The agent reads this at every heartbeat turn.
