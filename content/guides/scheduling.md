# Scheduling

Three kinds of scheduled work. All live in the `scheduled_tasks` table.

| Type | What it runs |
|---|---|
| `prompt` | A natural-language prompt, in a fresh agent turn |
| `command` | A shell command, via `run_shell` |
| `workflow` | A multi-step [workflow](../concepts/workflows) |

## Creating

Via the agent:

```
> schedule a daily 8am summary of my calendar and unread email
```

Via the `/schedule` TUI popup or the CLI:

```sh
borg schedule add \
  --name "daily-digest" \
  --type prompt \
  --cron "0 8 * * *" \
  --body "Summarize my calendar and unread email. Post to #me in Slack."
```

## Cron vs. interval

Either:

- `--cron "0 8 * * *"` — standard 5-field cron
- `--interval "30m"` — relative

## Listing / inspecting

```sh
borg schedule list
borg schedule show <id>
borg schedule run  <id>      # force-run once, now
borg schedule pause <id>
borg schedule delete <id>
```

## Missed runs

If the daemon was down past a `next_run` time + 1h grace, that run is recorded as `task_runs.status = 'missed'` and `next_run` advances to the next slot. No retroactive firing — you won't get a storm of notifications after a 3-day outage.

## Workflow tasks

```sh
borg schedule add \
  --name "weekly-review" \
  --type workflow \
  --cron "0 9 * * 1" \
  --body "Review last week's commits, open PRs, memory changes. Post a summary."
```

The planner decomposes into steps. Each step runs as an isolated turn. Crash during step 3 → next boot resumes at step 3.
