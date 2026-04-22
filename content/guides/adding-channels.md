# Adding Channels

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
runtime = "bash"      # or "python", "node" — anything with a shebang works
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

Borg tracks the last seen timestamp per channel, so you only need to return new messages.

## send.sh

Reads a JSON object on stdin:

```json
{
  "sender_id": "string",
  "thread_id": "string",
  "text": "string"
}
```

Exit 0 on success, non-zero on failure. STDERR is logged.

## Sandboxing

All scripts run under the configured sandbox (Seatbelt on macOS, Bubblewrap on Linux). Blocked paths from `[security]` are always stripped. If your script needs to write somewhere, list it under `allow_fs_write`.

## Credentials

Env vars listed in `[auth] token_env` are resolved from the `[credentials]` store and injected. Store them with:

```sh
borg credentials set MY_CHANNEL_TOKEN ...
```

## Promoting to native

If your channel gets popular, port it to native: `crates/gateway/src/<name>/` with `types.rs`, `parse.rs`, `api.rs`, `verify.rs`. Register in `server.rs` and `channel_init.rs`.
