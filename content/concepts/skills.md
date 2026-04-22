# Skills

Skills are **instruction bundles** that teach the agent how to use external CLI tools. They are not tools — tools are typed handlers compiled in; skills are Markdown injected into the system prompt, telling the agent to use `run_shell`.

## How they work

1. Each turn, available skills are loaded and formatted into the system prompt.
2. The agent reads the instructions and uses `run_shell` to execute the described commands.
3. Requirements (binaries, env vars) are checked at load time; unavailable skills are listed but flagged.
4. Credentials from the `[credentials]` store are injected as env vars into `run_shell`.

## Built-in skills

Embedded in the binary via `include_str!`:

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
| `notes` | — |
| `calendar` | varies |
| `email` | varies |
| `browser` | varies |
| `1password` | `op` |
| `scheduler` | — |
| `skill-creator` | — |

## User skills

Live at `~/.borg/skills/<name>/SKILL.md`. The agent creates them via `apply_patch` with `target: skills`. User skills with the same name as a built-in **override** the built-in.

## SKILL.md format

```markdown
---
name: my-skill
description: What it does and when to use it.
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

Metadata (~50 tokens per skill) is always loaded. Full bodies load for **available** skills within the token budget. Unavailable skills stay listed so the agent knows they exist and what's missing.

## Auditing

V39 added a `skill_audit` table that tracks SHA-256 of every user `SKILL.md`. The doctor's Skills check flags post-install tampering.

## Writing skills

See [guides/writing-skills](../guides/writing-skills).
