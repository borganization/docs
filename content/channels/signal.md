# Signal

Native integration via [signal-cli](https://github.com/AsamK/signal-cli).

## Setup

1. Install `signal-cli`. Register a number, or link to an existing device.
2. Point Borg at the data dir:

   ```sh
   borg settings set gateway.signal.signal_cli_path /usr/local/bin/signal-cli
   borg settings set gateway.signal.phone_number "+1555..."
   borg settings set gateway.signal.enabled true
   borg daemon restart
   ```

Borg polls `signal-cli` for new messages. Replies send via the same binary. Signal has no public webhook, so no tunnel is needed.

## Threads

Each `{sender}:{group_id}` combination is a session. DMs use `{sender}:dm`.
