# Skills

Skills are instruction bundles. Each teaches the agent how to use an external CLI tool. Skills differ from tools. Tools are typed handlers compiled in. Skills are Markdown injected into the system prompt, telling the agent to use `run_shell`.

## How they work

1. Each turn, available skills load into the system prompt.
2. The agent reads the instructions and uses `run_shell` to run the described commands.
3. Requirements (binaries, env vars) check at load time. Unavailable skills appear in the list but show as unavailable.
4. Credentials from the `[credentials]` store inject as env vars into `run_shell`.

## Built-in skills

Compiled into the binary via `include_str!`:

| Skill | Requires |
|---|---|
| `slack` | `curl`, `SLACK_BOT_TOKEN` |
| `discord` | `curl`, `DISCORD_BOT_TOKEN` |
| `github` | `gh` |
| `git` | `git` |
| `docker` | `docker` |
| `weather` | `curl` |
| `search` | `curl` |
| `database` | varies |
| `notes` | (none) |
| `calendar` | varies |
| `email` | varies |
| `browser` | varies |
| `1password` | `op` |
| `scheduler` | (none) |
| `skill-creator` | (none) |

## User skills

User skills live at `~/.borg/skills/<name>/SKILL.md`. The agent creates them via `apply_patch` with `target: skills`. A user skill named `slack` overrides the built-in `slack`.

## SKILL.md format

```markdown
---
name: my-skill
description: What the skill does and when to use the skill.
requires:
  bins: ["curl", "jq"]
  env: ["API_TOKEN"]
  any_bins: ["chrome", "chromium"]
os: ["macos", "linux"]
install:
  jq:
    brew: jq
    apt: jq
---

# My Skill

Instructions for the agent on how to use this skill.

## Examples

​```bash
curl -H "Authorization: Bearer $API_TOKEN" https://api.example.com/data | jq '.results'
​```
```

## Progressive loading

Metadata (about 50 tokens per skill) always loads. Full bodies load for available skills within the token budget. Unavailable skills stay visible so the agent knows what exists and what is missing.

## Auditing

V39 added a `skill_audit` table. SHA-256 hashes track every user `SKILL.md`. The doctor's Skills check flags post-install tampering.

## Writing skills

See [guides/writing-skills](../guides/writing-skills).
