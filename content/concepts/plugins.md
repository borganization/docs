# Plugins

Plugins extend what the agent knows how to do. One catalog covers two kinds:

- Built-in native plugins compiled into the binary (Gmail, Calendar, Telegram, Slack, and more).
- Third-party skills you or the agent write as Markdown instruction bundles.

Both show up in the same marketplace. Install with one command, credentials land in your OS keychain.

## How plugins work

Each turn, the agent loads plugin metadata into the system prompt. Available plugins get their full instructions within the token budget. Unavailable ones stay listed so the agent knows what exists.

- Metadata (about 50 tokens each) always loads.
- Full instructions load for plugins whose requirements are met.
- Credentials from the keychain inject as env vars into `run_shell`.
- Requirements (binaries, env vars, platform) check at load time.

## Categories

| Category | Examples |
|---|---|
| Channels | Telegram, Slack, Discord, Teams, Google Chat, Signal, WhatsApp, iMessage, SMS |
| Core | Browser, search, email, calendar |
| Email | Gmail, IMAP |
| Developer | Git, GitHub, Docker, databases |
| Productivity | Notion, Linear, notes |
| Utilities | Weather, 1Password, scheduler |

## Built-in native plugins

Native plugins ship inside the binary. Install only stores credentials, no scripts on disk.

Channel natives: Telegram, Slack, Discord, Teams, Google Chat, Signal. Productivity natives: Gmail, Google Calendar, and the built-in skill set (browser, search, git, github, docker, database, notes, weather, 1password).

macOS adds iMessage via AppleScript. WhatsApp and SMS route through Twilio.

## Third-party skills

Third-party skills live at `~/.borg/skills/<name>/SKILL.md`. The agent writes them via `apply_patch` with `target: skills`. A user skill overrides a built-in with the same name.

### SKILL.md format

```markdown
---
name: linear
description: Query and update Linear issues.
requires:
  bins: ["curl", "jq"]
  env: ["LINEAR_API_KEY"]
---

# Linear

Use `curl` against the Linear GraphQL API.

​```sh
curl -H "Authorization: $LINEAR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { viewer { id name } }"}' \
  https://api.linear.app/graphql
​```
```

Frontmatter fields:

- `name`, `description` — shown in the marketplace and agent context.
- `requires.bins` — binaries that must be on `PATH`.
- `requires.env` — env vars or keychain keys that must resolve.
- `requires.any_bins` — one of the listed binaries satisfies the requirement.
- `os` — restrict to `macos` or `linux`.
- `install` — per-package-manager install commands for `bins`.

## Installation

```sh
borg plugin install messaging/telegram
borg plugin install gmail
borg plugin install linear
```

The installer prompts for required credentials, writes them to the OS keychain, and extracts any template files. Re-run `borg plugin install` to update credentials.

List installed:

```sh
borg plugin list
```

## Auditing

Borg stores a SHA-256 hash for every installed `SKILL.md`. The doctor's Skills check flags post-install tampering. Native plugins ship inside the signed binary and need no hash.

## Writing skills

See [guides/writing-skills](../guides/writing-skills).
