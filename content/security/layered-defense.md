# Layered Defense

Defenses outside the main layers. Each targets a specific abuse path.

## Rate limits

Per-session caps stop a runaway loop from burning API credits or hammering your filesystem. Triggers include a bug, a bad prompt, or injected content.

Defaults, configurable under `[security.rate_limits]`:

- Tool calls per minute.
- Shell commands per minute.
- File writes per minute.
- Web fetches per minute.

On cap breach, the offending tool call returns an error into the agent loop. The model reads the error and adjusts or stops. Caps reset per session.

## Sender pairing

Unknown senders stay gated. The gateway refuses to deliver their messages to the agent until you approve them.

Set policy per gateway binding via `dm_policy`:

- `pairing`: unknown senders trigger an approval request. You approve once. The `approved_senders` table records your decision. Default.
- `open`: any sender reaches Borg. Use for internal or trusted channels only.
- `disabled`: no DMs accepted on the channel.

Per-channel overrides live under `gateway.channel_policies`. See [channels](../channels) for channel-specific setup.

## Webhook verification

Every native channel ships a verifier. The gateway rejects inbound webhooks unless the platform signature check passes:

- Slack: HMAC-SHA256 with signing secret and timestamp replay window.
- Discord: Ed25519 signature on `X-Signature-Ed25519`.
- Telegram: secret token in header matches the configured value.
- Twilio: HMAC-SHA1 with auth token.
- Teams and Google Chat: bearer token from the platform's JWT, verified against the platform JWKS.

Signature failures log and return `401`. No reach to the agent.

## Ghost commits

On session start, if your working directory is a git repo, Borg snapshots the tree into a temporary git index and writes a ghost commit. No branch points at the commit. Only the reflog holds a reference.

Atomic undo follows. If a session makes a mess, roll back:

```sh
git reset --hard <ghost-sha>
```

No files lost. Ghost commits expire via git's reflog policy, 90 days by default.

## Catastrophic command denylist

Inside the sandbox, `run_shell` refuses a short list of destructive commands regardless of sandbox config:

```
rm -rf /
mkfs
dd if=... of=/dev/...
curl ... | sh
wget ... | sh
```

Blocked pre-exec, not by the sandbox. The denylist stays narrow on purpose. Almost everything else falls to the sandbox. See [sandboxing](sandboxing).
