# Writing Skills

A skill teaches the agent to use a CLI tool via `run_shell`. A skill is a Markdown file with YAML frontmatter.

## Minimum viable skill

`~/.borg/skills/linear/SKILL.md`:

```markdown
---
name: linear
description: Manage Linear issues and projects via the linear-cli.
requires:
  bins: ["linear-cli"]
  env: ["LINEAR_API_KEY"]
---

# Linear

Use `linear-cli` to interact with Linear.

## Common operations

List my assigned issues:

​```bash
linear-cli issues list --assignee me --state "In Progress"
​```

Create an issue:

​```bash
linear-cli issues create --team ENG --title "..." --description "..."
​```
```

## Frontmatter

| Field | Type | Use |
|---|---|---|
| `name` | string | Must match directory name |
| `description` | string | One sentence. Shown to the LLM for skill selection. |
| `requires.bins` | array | All must sit on `PATH` for the skill to show as available |
| `requires.env` | array | All must be set (or in `[credentials]`) |
| `requires.any_bins` | array | At least one must exist (example: `chrome` or `chromium`) |
| `os` | array | `macos`, `linux`. The skill hides on other OSes. |
| `install` | map | `{tool: {brew: "pkg", apt: "pkg"}}`. The doctor suggests installs. |

## Body

Write for an LLM audience. Be specific:

- Lead with the "when". When should the agent reach for this skill?
- Give concrete examples with literal commands. The agent adapts them.
- Document error conditions the agent will hit.

## Overriding a built-in

A user skill named `slack` overrides the compiled-in `slack` skill. Same name, your content wins.

## Testing

1. Put the file in place.
2. Run `borg`. At session start, the skill loader picks up the file.
3. `/plugins` "Skills" shows whether the skill is available or flagged for missing requirements.
4. Ask the agent to do the thing. The agent uses your skill.

## Auditing

V39 tracks SHA-256 of every user `SKILL.md` in the `skill_audit` table. The doctor flags post-install tampering. Edit the file and the doctor notes the file as "modified" on the next daily sweep.
