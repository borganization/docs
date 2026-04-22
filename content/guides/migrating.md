# Migrating

Import history, settings, and memory from other agents.

```sh
borg migrate --from claude-code
borg migrate --from codex
borg migrate --from chatgpt --export path/to/conversations.json
```

Or via the TUI:

```
/migrate
```

## What gets imported

| Source | What |
|---|---|
| Claude Code | `~/.claude/` — sessions, CLAUDE.md (per-project), memory, hooks |
| Codex | `~/.codex/` — sessions, AGENTS.md, config |
| ChatGPT export | JSON export from `chat.openai.com/data-export` — conversations |

## How it works

- Sessions import as rows in `sessions` / `messages` with a `source` tag.
- Memory / CLAUDE.md / AGENTS.md content becomes `memory_entries` under `global/imported-*`.
- Hooks from Claude Code's `hooks.json` copy over verbatim — the schema is the same.

## Safety

`migrate` is idempotent per-source. Running it twice doesn't duplicate; it skips anything with a matching external id.

Original files are not deleted.

## After import

```
> /memory
```

to see what landed, and

```
> review the imported memory entries and consolidate duplicates
```

to let Borg clean up.
