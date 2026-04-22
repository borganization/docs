# Channels

Native channels compile into the binary. Setup: get API credentials, drop them in `/settings` under credentials, flip `gateway.<channel>.enabled` to `true` in `/settings`. Done.

- [telegram](telegram)
- [slack](slack)
- [discord](discord)
- [teams](teams)
- [google-chat](google-chat)
- [signal](signal)
- [twilio](twilio) (WhatsApp and SMS)
- [imessage](imessage) (macOS only)

For anything else, see [guides/adding-custom-channels](../guides/adding-custom-channels) for script channels.

## The gateway

The gateway runs as one HTTP server inside the Borg daemon. Each channel registers routes and webhook verifiers. Inbound messages parse into a common shape. Outbound messages go through a delivery queue with retries.

## Running

Channels need the daemon running. Start it with `borg daemon start` (see `borg help`). The daemon also runs the scheduler, heartbeat, and self-healing sweep.
