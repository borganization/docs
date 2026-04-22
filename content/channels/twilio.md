# Twilio (WhatsApp and SMS)

Native integration. One channel, two transports.

## Setup

1. Create a [Twilio](https://www.twilio.com/) account. Note the Account SID and Auth Token.
2. For WhatsApp: activate the WhatsApp sandbox or a paid sender.
3. For SMS: buy a number.

   ```sh
   borg credentials set TWILIO_ACCOUNT_SID ACxxxxxxxx
   borg credentials set TWILIO_AUTH_TOKEN ...
   ```

4. Set the inbound webhook on each number or sender to `https://<your-host>/twilio/sms` or `/twilio/whatsapp`.
5. Enable:

   ```sh
   borg settings set gateway.twilio.enabled true
   borg daemon restart
   ```

## Verification

Inbound webhooks verify with Twilio's HMAC signature.
