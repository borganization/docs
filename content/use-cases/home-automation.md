# Home Automation

Shell out to Home Assistant, HomeKit via `shortcuts`, or any HTTP API.

## Setup (Home Assistant)

1. Store your HA long-lived token:
   ```sh
   borg credentials set HA_TOKEN eyJ...
   borg credentials set HA_URL "http://homeassistant.local:8123"
   ```
2. Write a `home` skill at `~/.borg/skills/home/SKILL.md`:

```markdown
---
name: home
description: Control Home Assistant entities.
requires:
  bins: ["curl", "jq"]
  env: ["HA_TOKEN", "HA_URL"]
---

# Home

Call the Home Assistant REST API to read and control entities.

## List entities

​```bash
curl -s -H "Authorization: Bearer $HA_TOKEN" "$HA_URL/api/states" | \
  jq '[.[] | {id: .entity_id, state: .state}]'
​```

## Turn something on

​```bash
curl -s -X POST -H "Authorization: Bearer $HA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"entity_id": "light.kitchen"}' \
  "$HA_URL/api/services/light/turn_on"
​```
```

## Setup (macOS Shortcuts)

```markdown
---
name: shortcuts
description: Run macOS Shortcuts by name.
requires:
  bins: ["shortcuts"]
os: ["macos"]
---

# Shortcuts

Run a Shortcut by name:

​```bash
shortcuts run "Good Morning"
​```

List available:

​```bash
shortcuts list
​```
```

## Example

```
you:   turn on the kitchen lights and start the morning routine
borg:  Kitchen lights on. Running "Good Morning" shortcut.
```

## Scoping

- Bind your home channel (iMessage or Telegram from your phone) to `memory_scope = "project:home"`.
- Keep home-automation memory separate from work.
