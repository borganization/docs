# Projects

Projects are named contexts. Each project owns a memory scope (`project:{id}`). Each project pins a working directory, skills, and gateway bindings.

## Why

- Isolated memory — work facts for "job" stay out of "personal"
- Scoped skills — enable 1Password and GitHub for "work" only
- Per-project channels — bind a Slack workspace to "work", Telegram to "personal"

## Using

Via the `projects` tool. The agent does this on your behalf:

```
> switch to my "work" project
```

Or manually:

```
/projects
```

## Schema

Stored in the `projects` table. Fields: id, name, description, working_dir, archived_at, created_at, updated_at.

## Memory scoping

With a project active, `write_memory` defaults to `scope: "project:{id}"`. Long-term loading blends:

- `global/*` entries (always eligible).
- `project:{active}/*` entries (prioritized).

Other projects' scoped entries stay out.

## Archival

Archiving hides a project from the default list. Memory stays. Delete destroys the project.
