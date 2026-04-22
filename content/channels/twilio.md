# Twilio (WhatsApp and SMS)

Native integration. One channel, two transports.

## Setup

1. Create a [Twilio](https://www.twilio.com/) account. Note the Account SID and Auth Token.
2. For WhatsApp: activate the WhatsApp sandbox or a paid sender.
3. For SMS: buy a number. Store both in `/settings` under credentials as `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`.

4. Set the inbound webhook on each number or sender to `https://<your-host>/twilio/sms` or `/twilio/whatsapp`.
5. In `/settings`, flip `gateway.twilio.enabled` to `true` and restart the daemon.

## Verification

Inbound webhooks verify with Twilio's HMAC signature.
