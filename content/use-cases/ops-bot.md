# Ops Bot

Slack bot that runs scripts, reads logs, and pages on-call.

## Setup

1. [channels/slack](../channels/slack) with a bot in `#oncall`.
2. Bind a capable model. Set `gateway.bindings` in `/settings`:
   ```json
   [{"channel":"slack","workspace":"T0123...","provider":"anthropic","model":"claude-sonnet-4-6","memory_scope":"project:ops","identity":"ops-bot"}]
   ```
3. Install relevant skills:
   - `github` — PR and issue ops
   - `database` — read-only SQL
   - A custom `pagerduty` skill for on-call management

## Sandbox boundaries

`run_shell` stays sandboxed. An ops bot often wants more holes — allow outbound network and read access to `/var/log` and your deployment scripts, keep writes off by default. Configure per-channel/skill sandbox knobs (`allow_network`, `allow_fs_read`, `allow_fs_write`). See [security/sandboxing](../security/sandboxing).

## Example

```
you:   @borg what's failing in prod?
borg:  Last 30 min of errors from api-gateway:
       - 47x "connection refused" on orders-svc (10.0.1.4)
       - 3x timeouts on stripe-webhook
       orders-svc shows CPU pegged. Scale up?

you:   yes and page alice
borg:  Scaled orders-svc from 3 to 6. PagerDuty incident opened,
       assigned to alice. Incident id INC-10234.
```

## Safety

- `PreToolUse` hook to deny production-mutating commands outside business hours.
- `dm_policy = "pairing"` so only approved Slack users talk to the bot.
- All tool calls write to `activity_log`. The daily sweep keeps 30 days.
