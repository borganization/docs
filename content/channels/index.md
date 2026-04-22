# Channels

Native channels are compiled into the binary. Setup is: get API credentials, drop them in `borg credentials`, add a `[[gateway.bindings]]`, done.

- [telegram](telegram)
- [slack](slack)
- [discord](discord)
- [teams](teams)
- [google-chat](google-chat)
- [signal](signal)
- [twilio](twilio) (WhatsApp + SMS)
- [imessage](imessage) (macOS only)

For anything else, see [guides/adding-channels](../guides/adding-channels) for script channels.

## The gateway

The gateway is a single HTTP server inside the Borg daemon (`crates/gateway/`). Each channel registers routes and webhook verifiers. Inbound messages parse into a common shape; outbound messages go through a delivery queue with retries.

## Running

Channels need the daemon:

```sh
borg daemon start
```

The daemon also runs the scheduler, heartbeat, and self-healing sweep.
