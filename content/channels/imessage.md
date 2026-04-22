# iMessage

macOS only. Guarded at compile time so non-macOS builds omit the integration.

## How it works

Reads and writes iMessage through the local Messages database and AppleScript:

- Inbound: polls `~/Library/Messages/chat.db`.
- Outbound: AppleScript bridge (`osascript`).

No cloud. No phone jailbreak. No separate device. Your Mac must sign into iMessage.

## Setup

1. Grant Borg Full Disk Access in System Settings, Privacy and Security. Borg needs access to read `chat.db`.
2. Grant Automation permission for Messages. AppleScript needs the grant to send.
3. In `/settings`, flip `gateway.imessage.enabled` to `true` and restart the daemon.

Done. No tokens. No webhooks.

## Limitations

- Your Mac must stay powered on and signed in.
- Reactions and tapbacks read but do not send.
- No group-chat admin features.
