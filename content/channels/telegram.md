# Telegram

Native integration. Webhook-based.

## Setup

1. Create a bot with [@BotFather](https://t.me/BotFather). Save the token.
2. Store the token in `/settings` under credentials as `TELEGRAM_BOT_TOKEN`.

3. Expose the gateway publicly via a tunnel or VPS. Set the webhook:

   ```sh
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-host>/telegram/webhook"
   ```

4. In `/settings`, flip `gateway.telegram.enabled` to `true` and restart the daemon.

5. Message your bot. First contact triggers a pairing request inside Borg.

## Threads

Telegram supergroup topics map to `message_thread_id`. Each topic gets a session.
