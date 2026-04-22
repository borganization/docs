# Telegram

Native integration. Webhook-based.

## Setup

1. Create a bot with [@BotFather](https://t.me/BotFather). Save the token.
2. Store credentials:

   ```sh
   borg credentials set TELEGRAM_BOT_TOKEN 123456:ABC-...
   ```

3. Expose the gateway publicly via a tunnel or VPS. Set the webhook:

   ```sh
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-host>/telegram/webhook"
   ```

4. Enable the channel:

   ```sh
   borg settings set gateway.telegram.enabled true
   borg daemon restart
   ```

5. Message your bot. First contact triggers a pairing request in the TUI.

## Threads

Telegram supergroup topics map to `message_thread_id`. Each topic gets a session.
