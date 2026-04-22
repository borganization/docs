# Microsoft Teams

Native integration. Uses the Bot Framework connector.

## Setup

1. Register an Azure Bot or Bot Framework app. Grab the App ID and Password.
2. Enable the Teams channel on the bot. Store both in `/settings` under credentials as `TEAMS_APP_ID` and `TEAMS_APP_PASSWORD`.

3. Point the messaging endpoint at `https://<your-host>/teams/messages`.
4. In `/settings`, flip `gateway.teams.enabled` to `true` and restart the daemon.

5. Sideload the app manifest (zip) in Teams to chat with the bot.

## Threads

Replies populate `reply_to_id`. The value becomes the session thread key.
