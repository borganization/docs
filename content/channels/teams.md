# Microsoft Teams

Native integration. Uses the Bot Framework connector.

## Setup

1. Register an Azure Bot (or Bot Framework) app. Grab the App ID and Password.
2. Enable the Teams channel on the bot.

   ```sh
   borg credentials set TEAMS_APP_ID ...
   borg credentials set TEAMS_APP_PASSWORD ...
   ```

3. Point the messaging endpoint at `https://<your-host>/teams/messages`.
4. Enable:

   ```sh
   borg settings set gateway.teams.enabled true
   borg daemon restart
   ```

5. Sideload the app manifest (zip) in Teams to chat with the bot.

## Threads

Replies populate `reply_to_id`, which becomes the session thread key.
