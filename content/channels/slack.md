# Slack

Native integration. Uses Slack's Events API.

## Setup

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps).
2. Add bot scopes: `chat:write`, `app_mentions:read`, `im:history`, `im:write`, `channels:history`.
3. Install to your workspace. Copy the Bot User OAuth Token (`xoxb-...`) and Signing Secret. Store both in `/settings` under credentials as `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET`.

4. Point the Events API Request URL at `https://<your-host>/slack/events`.
5. In `/settings`, flip `gateway.slack.enabled` to `true` and restart the daemon.

## Threads

Slack threads use `thread_ts`. A thread reply keeps a separate session from the channel-level DM.

## Verification

Requests verify with the signing secret. Replay-attack protection rejects stale timestamps.
