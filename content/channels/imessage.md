# iMessage

**macOS only.** Compiled behind `#[cfg(target_os = "macos")]`.

## How it works

Reads and writes iMessage through the local Messages database + AppleScript:

- Inbound: polls `~/Library/Messages/chat.db`
- Outbound: AppleScript bridge (`osascript`)

No cloud, no phone jailbreak, no separate device. Your Mac must be signed into iMessage.

## Setup

1. Grant Borg **Full Disk Access** in System Settings → Privacy & Security (so it can read `chat.db`).
2. Grant **Automation** permission for Messages (so AppleScript can send).
3. Enable:

   ```sh
   borg settings set gateway.imessage.enabled true
   borg daemon restart
   ```

That's it — no tokens, no webhooks.

## Limitations

- Requires the Mac to be powered on and signed in.
- Reactions and tapbacks are read but not sent.
- No group-chat admin features.

## Binding

```toml
[[gateway.bindings]]
channel = "imessage"
sender = "+1555..."
provider = "openai"
memory_scope = "global"
```
