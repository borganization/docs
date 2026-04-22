# Scheduling

Three kinds of scheduled work. All live in the `scheduled_tasks` table.

| Type | Runs |
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

Pick one:

- `--cron "0 8 * * *"` — standard 5-field cron
- `--interval "30m"` — relative

## Listing and inspecting

```sh
borg schedule list
borg schedule show <id>
borg schedule run  <id>      # force-run once, now
borg schedule pause <id>
borg schedule delete <id>
```

## Missed runs

With the daemon down past a `next_run` time plus 1h grace, the run records as `task_runs.status = 'missed'`. `next_run` advances to the next slot. No retroactive firing. You will not get a storm of notifications after a 3-day outage.

## Workflow tasks

```sh
borg schedule add \
  --name "weekly-review" \
  --type workflow \
  --cron "0 9 * * 1" \
  --body "Review last week's commits, open PRs, memory changes. Post a summary."
```

The planner decomposes into steps. Each step runs as an isolated turn. Crash during step 3, next boot resumes at step 3.
