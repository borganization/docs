# Migrating

Import history, settings, and memory from other agents.

Open `/migrate` and pick the source:

- Claude Code
- Codex
- ChatGPT (JSON export)

## What gets imported

| Source | Contents |
|---|---|
| Claude Code | `~/.claude/` — sessions, CLAUDE.md per project, memory, hooks |
| Codex | `~/.codex/` — sessions, AGENTS.md, config |
| ChatGPT export | JSON export from `chat.openai.com/data-export` — conversations |

## How the import works

- Sessions import as rows in `sessions` and `messages` with a `source` tag.
- Memory, CLAUDE.md, and AGENTS.md content becomes `memory_entries` under `global/imported-*`.
- Hooks from Claude Code's `hooks.json` copy over verbatim. The schema matches.

## Safety

`migrate` stays idempotent per source. Running twice does not duplicate. Borg skips anything with a matching external id.

Original files stay in place. Nothing deletes.

## After import

```
> /memory
```

to see what landed, then:

```
> review the imported memory entries and consolidate duplicates
```

to let Borg clean up.
