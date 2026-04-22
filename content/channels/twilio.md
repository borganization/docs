# Twilio (WhatsApp + SMS)

Native integration. One channel, two transports.

## Setup

1. Create a [Twilio](https://www.twilio.com/) account. Note the Account SID and Auth Token.
2. For WhatsApp: activate the WhatsApp sandbox or a paid sender.
3. For SMS: buy a number.

   ```sh
   borg credentials set TWILIO_ACCOUNT_SID ACxxxxxxxx
   borg credentials set TWILIO_AUTH_TOKEN ...
   ```

4. Set the inbound webhook on each number/sender to `https://<your-host>/twilio/sms` (or `/twilio/whatsapp`).
5. Enable:

   ```sh
   borg settings set gateway.twilio.enabled true
   borg daemon restart
   ```

## Binding

```toml
[[gateway.bindings]]
channel = "twilio"
transport = "whatsapp"
sender = "+1555..."
provider = "anthropic"
```

## Verification

Inbound webhooks are verified with Twilio's HMAC signature.
