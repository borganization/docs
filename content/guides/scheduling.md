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

Or open `/schedule` to add, list, pause, run, or delete tasks from a single screen.

## Cron vs. interval

Pick one:

- Standard 5-field cron: `0 8 * * *`
- Relative interval: `30m`

## Listing and inspecting

Open `/schedule` for the full list and per-task actions (run now, pause, delete).

## Missed runs

With the daemon down past a `next_run` time plus 1h grace, the run records as `task_runs.status = 'missed'`. `next_run` advances to the next slot. No retroactive firing. You will not get a storm of notifications after a 3-day outage.

## Workflow tasks

Add a `workflow`-type task in `/schedule` with a body like:

```
Review last week's commits, open PRs, memory changes. Post a summary.
```

The planner decomposes into steps. Each step runs as an isolated turn. Crash during step 3, next boot resumes at step 3.
