# Adding Custom Channels

For anything not already native ([Telegram, Slack, Discord, Teams, Google Chat, Signal, Twilio, iMessage](../channels/)), write a script channel.

## Layout

`~/.borg/channels/<name>/`:

```
channel.toml
receive.sh        # called by the gateway to poll for inbound
send.sh           # called to send outbound
```

## channel.toml

```toml
[channel]
runtime = "bash"      # or "python", "node". Anything with a shebang works.
poll_interval = 30    # seconds, for receive.sh

[scripts]
receive = "./receive.sh"
send    = "./send.sh"

[sandbox]
allow_network = true
allow_fs_read = ["~/.local/share/my-channel"]
allow_fs_write = ["~/.local/share/my-channel"]

[auth]
token_env = "MY_CHANNEL_TOKEN"
```

## receive.sh

Emit a JSON array on stdout. Each object:

```json
{
  "sender_id": "string",
  "thread_id": "string",
  "text": "string",
  "timestamp": 1700000000,
  "attachments": []
}
```

Borg tracks the last seen timestamp per channel. Return new messages only.

## send.sh

Read a JSON object on stdin:

```json
{
  "sender_id": "string",
  "thread_id": "string",
  "text": "string"
}
```

Exit 0 on success. Non-zero on failure. STDERR logs.

## Sandboxing

All scripts run under the configured sandbox. Seatbelt on macOS, Bubblewrap on Linux. Blocked paths from `[security]` always strip. For writes, list the write targets under `allow_fs_write`.

## Credentials

Env vars listed in `[auth] token_env` resolve from the credentials store and inject. Store them in `/settings` under credentials (e.g. `MY_CHANNEL_TOKEN`).

## Promoting to native

If your channel gets popular, port it to a native gateway integration so it compiles into the binary alongside the built-in channels.
