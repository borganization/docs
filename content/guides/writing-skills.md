# Writing Skills

A skill teaches the agent to use a CLI tool via `run_shell`. It's just a Markdown file with YAML frontmatter.

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

| Field | Type | What |
|---|---|---|
| `name` | string | Must match directory name |
| `description` | string | One sentence. Shown to the LLM for skill selection |
| `requires.bins` | array | All must be on `PATH` for the skill to be "available" |
| `requires.env` | array | All must be set (or in `[credentials]`) |
| `requires.any_bins` | array | At least one must be present (e.g. `chrome` OR `chromium`) |
| `os` | array | `macos`, `linux` — skill hidden on other OSes |
| `install` | map | `{tool: {brew: "pkg", apt: "pkg"}}` — the doctor suggests installs |

## Body

Write for an LLM audience. Be specific:

- Lead with the **when** — when should the agent reach for this?
- Give concrete examples with literal commands. The agent will adapt them.
- Document error conditions the agent will actually hit.

## Overriding a built-in

A user skill named `slack` overrides the compiled-in `slack` skill. Same name, your content wins.

## Testing

1. Put the file in place.
2. Run `borg` — at session start, the skill loader picks it up.
3. `/plugins` → "Skills" shows whether it's available or flagged for missing requirements.
4. Ask the agent to do the thing — it should use your skill.

## Auditing

V39 tracks SHA-256 of every user `SKILL.md` in the `skill_audit` table. The doctor flags post-install tampering. If you edit the file, the doctor notes it as "modified" on the next daily sweep.
