# Projects

Projects are named contexts. Each project has its own memory scope (`project:{id}`) and can pin a working directory, skills, and gateway bindings.

## Why

- **Isolated memory.** Work facts for "job" shouldn't pollute context for "personal".
- **Scoped skills.** Enable 1Password + GitHub for "work" only.
- **Per-project channels.** A Slack workspace bound to "work", Telegram to "personal".

## Using

Via the `projects` tool (the agent can do this on its own):

```
> switch to my "work" project
```

Or manually:

```
/projects
```

## Schema

Stored in `projects` table. Fields: id, name, description, working_dir, archived_at, created_at, updated_at.

## Memory scoping

When a project is active, `write_memory` defaults to `scope: "project:{id}"`. Long-term memory loading blends:

- `global/*` entries (always eligible)
- `project:{active}/*` entries (prioritized)

Other projects' scoped entries are not loaded.

## Archival

Archiving hides a project from the default list but preserves its memory. Delete is destructive.
