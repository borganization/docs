# Discord

Native integration. Uses the Discord interactions API (webhook, not gateway websocket).

## Setup

1. Create an application at [discord.com/developers/applications](https://discord.com/developers/applications).
2. Under "Bot", copy the token.
3. Under "General Information", copy the Public Key.

   ```sh
   borg credentials set DISCORD_BOT_TOKEN ...
   borg credentials set DISCORD_PUBLIC_KEY ...
   ```

4. Set the Interactions Endpoint URL to `https://<your-host>/discord/interactions`.
5. Invite the bot to a server with `applications.commands` and `bot` scopes.
6. Enable:

   ```sh
   borg settings set gateway.discord.enabled true
   borg daemon restart
   ```

## Slash command

Borg registers a `/borg` slash command. Users invoke it in any channel it's been added to.

## Threads

Each Discord channel gets its own session (`channel_id` is the thread key).
