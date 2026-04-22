# Signal

Native integration via [signal-cli](https://github.com/AsamK/signal-cli).

## Setup

1. Install `signal-cli`. Register a number, or link to an existing device.
2. In `/settings`, configure these keys then restart the daemon:

   | Key | Value |
   |---|---|
   | `gateway.signal.signal_cli_path` | `/usr/local/bin/signal-cli` |
   | `gateway.signal.phone_number` | `+1555...` |
   | `gateway.signal.enabled` | `true` |

Borg polls `signal-cli` for new messages. Replies send via the same binary. Signal has no public webhook, so no tunnel is needed.

## Threads

Each `{sender}:{group_id}` combination is a session. DMs use `{sender}:dm`.
