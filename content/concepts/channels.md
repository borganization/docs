# Channels

Channels are the ways you talk to Borg from messaging apps.

## Native integrations

Compiled into the binary. No scripts needed:

- [Telegram](../channels/telegram)
- [Slack](../channels/slack)
- [Discord](../channels/discord)
- [Teams](../channels/teams)
- [Google Chat](../channels/google-chat)
- [Signal](../channels/signal)
- [Twilio](../channels/twilio) (WhatsApp and SMS)
- [iMessage](../channels/imessage) (macOS only)

## Script channels

For anything else: `~/.borg/channels/<name>/` with a `channel.toml`:

```toml
[channel]
runtime = "bash"

[scripts]
receive = "./receive.sh"
send    = "./send.sh"

[sandbox]
allow_network = true
allow_fs_read = ["~/my-data"]

[auth]
token_env = "MY_CHANNEL_TOKEN"
```

See [guides/adding-custom-channels](../guides/adding-custom-channels).

## Gateway bindings

Bindings route per-channel or per-sender LLM overrides (provider, model, memory scope, identity, temperature). Set `gateway.bindings` in `/settings`:

```json
[
  {"channel":"slack","workspace":"acme","provider":"anthropic","model":"claude-opus-4-7","memory_scope":"project:work","identity":"professional","temperature":0.3},
  {"channel":"telegram","sender":"123456789","provider":"openai","model":"gpt-5","memory_scope":"global"}
]
```

See [reference/settings](../reference/settings).

## Sender pairing

Unknown senders sit behind approval. Policy via `dm_policy`:

| Policy     | Behavior                                                  |
| ---------- | --------------------------------------------------------- |
| `pairing`  | Unknown senders request approval. You approve through `/settings`. |
| `open`     | Anyone talks to Borg.                                     |
| `disabled` | Only approved senders.                                    |

Per-channel overrides via `gateway.channel_policies`.

## Thread-scoped history

The DB session key is `{sender_id}:{thread_id}`. Parsers populate `thread_id` from:

- Slack: `thread_ts`
- Teams: `reply_to_id`
- Discord: `channel_id`
- Google Chat: `thread.name`
- Telegram: `message_thread_id`

One sender runs multiple parallel conversations with independent history.
