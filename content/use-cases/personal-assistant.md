# Personal Assistant

Your Borg on your phone, talking to you where you already are.

## Setup

1. Pick a channel you'll actually read. iMessage if you're on Apple, Telegram otherwise.
   - [channels/imessage](../channels/imessage)
   - [channels/telegram](../channels/telegram)
2. Point Borg at your calendar + email via skills:
   ```sh
   borg credentials set GOOGLE_CALENDAR_TOKEN ...
   borg credentials set GMAIL_TOKEN ...
   ```
3. Enable the [heartbeat](../concepts/heartbeat):
   ```sh
   borg settings set heartbeat.enabled true
   borg settings set heartbeat.cron "0 8,13,18 * * *"
   ```
4. Write a `~/.borg/HEARTBEAT.md`:
   ```markdown
   # Heartbeat
   At check-in, if anything below is true, message me:
   - a meeting starts in the next 30 minutes
   - an email from a starred sender is unread > 4 hours
   - a todo was scheduled for today and not done
   Otherwise stay silent.
   ```

## Example conversation

```
You:   remind me to call mom sunday after lunch
Borg:  Scheduled: "call mom" Sunday 2pm. I'll ping you here.

You:   what's my week look like?
Borg:  Mon — 3 meetings. Tue — clear until 3pm. Wed — offsite all day. ...

You:   move the wed offsite note to my "family" context
Borg:  Done. It's now scoped to project:family.
```

## Memory

Over a few weeks the agent builds up entries like:

- `global/preferences` — how you like summaries, timezone, pace
- `global/people` — names, relationships, context
- `global/routines` — morning, weekly review, Sunday planning
