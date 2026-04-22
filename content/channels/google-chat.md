# Google Chat

Native integration.

## Setup

1. Create a Chat app in [Google Cloud Console](https://console.cloud.google.com/) under the Chat API.
2. Set connection type: **HTTP endpoint**. Endpoint URL: `https://<your-host>/gchat/events`.
3. Generate a service account key for authenticated outbound calls.

   ```sh
   borg credentials set GOOGLE_CHAT_SERVICE_ACCOUNT_JSON "$(cat key.json)"
   ```

4. Enable:

   ```sh
   borg settings set gateway.google_chat.enabled true
   borg daemon restart
   ```

## Threads

Google Chat threads are identified by `thread.name`. Each becomes a separate session.

## Verification

Incoming requests carry a JWT signed by Google — verified against Google's public keys.
