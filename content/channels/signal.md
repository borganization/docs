# Signal

Native integration via [signal-cli](https://github.com/AsamK/signal-cli).

## Setup

1. Install `signal-cli` and register a number (or link to an existing device).
2. Point Borg at its data dir:

   ```sh
   borg settings set gateway.signal.signal_cli_path /usr/local/bin/signal-cli
   borg settings set gateway.signal.phone_number "+1555..."
   borg settings set gateway.signal.enabled true
   borg daemon restart
   ```

Borg polls `signal-cli` for new messages and sends replies via the same binary. No webhook needed — Signal has no public webhook.

## Threads

Each `{sender}:{group_id}` combination is its own session. DMs use `{sender}:dm`.
