# Slack

Native integration. Uses Slack's Events API.

## Setup

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps).
2. Add bot scopes: `chat:write`, `app_mentions:read`, `im:history`, `im:write`, `channels:history`.
3. Install to your workspace; copy the Bot User OAuth Token (`xoxb-…`) and Signing Secret.

   ```sh
   borg credentials set SLACK_BOT_TOKEN xoxb-...
   borg credentials set SLACK_SIGNING_SECRET ...
   ```

4. Point the Events API Request URL at `https://<your-host>/slack/events`.
5. Enable:

   ```sh
   borg settings set gateway.slack.enabled true
   borg daemon restart
   ```

## Binding

```toml
[[gateway.bindings]]
channel = "slack"
workspace = "T0123ABCD"    # team id
provider = "openai"
model = "gpt-5"
memory_scope = "project:work"
```

## Threads

Slack threads use `thread_ts`. Replying in a thread keeps a separate session from channel-level DMs.

## Verification

Requests are verified with the signing secret. Replay-attack protection rejects stale timestamps.
