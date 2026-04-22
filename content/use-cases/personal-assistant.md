# Personal Assistant

Your Borg on your phone, talking to you where you already are.

## Setup

1. Pick a channel you will read. iMessage on Apple, Telegram otherwise.
   - [channels/imessage](../channels/imessage)
   - [channels/telegram](../channels/telegram)
2. Point Borg at your calendar and email via skills. Store `GOOGLE_CALENDAR_TOKEN` and `GMAIL_TOKEN` in `/settings` under credentials.
3. Enable the [heartbeat](../concepts/heartbeat) in `/settings`:
   - `heartbeat.enabled` → `true`
   - `heartbeat.cron` → `0 8,13,18 * * *`
4. Write `~/.borg/HEARTBEAT.md`:
   ```markdown
   # Heartbeat
   At check-in, if any of these apply, message me:
   - a meeting starts in the next 30 minutes
   - an email from a starred sender sits unread > 4 hours
   - a todo scheduled for today is not done
   Otherwise stay silent.
   ```

## Example conversation

```
You:   remind me to call mom sunday after lunch
Borg:  Scheduled: "call mom" Sunday 2pm. I will ping you here.

You:   what's my week look like?
Borg:  Mon. 3 meetings. Tue. Clear until 3pm. Wed. Offsite all day. ...

You:   move the wed offsite note to my "family" context
Borg:  Done. The note is now scoped to project:family.
```

## Memory

Over a few weeks the agent builds up entries like:

- `global/preferences` — how you like summaries, timezone, pace
- `global/people` — names, relationships, context
- `global/routines` — morning, weekly review, Sunday planning
