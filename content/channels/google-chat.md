# Google Chat

Native integration.

## Setup

1. Create a Chat app in [Google Cloud Console](https://console.cloud.google.com/) under the Chat API.
2. Set connection type to HTTP endpoint. Endpoint URL: `https://<your-host>/gchat/events`.
3. Generate a service account key for authenticated outbound calls. Paste the JSON contents into `/settings` under credentials as `GOOGLE_CHAT_SERVICE_ACCOUNT_JSON`.

4. In `/settings`, flip `gateway.google_chat.enabled` to `true` and restart the daemon.

## Threads

Google Chat threads identify by `thread.name`. Each becomes a separate session.

## Verification

Incoming requests carry a JWT signed by Google. Borg verifies against Google's public keys.
