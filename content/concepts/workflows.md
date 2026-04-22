# Workflows

Durable multi-step orchestration. The LLM decomposes a task into ordered steps. Each step runs as an isolated agent turn with prior outputs injected. State persists in SQLite. Workflows survive crashes and restarts.

## Lifecycle

1. You invoke a workflow via the `schedule` tool, cron, or `/schedule`.
2. A planner LLM emits N steps with explicit dependencies.
3. The dispatcher runs steps in order. Each step is a fresh turn with prior outputs as context.
4. Step results write to `workflow_steps`.
5. On completion, Borg returns a final summary.

## Why workflows beat a long single turn

A long single turn hits context limits and has no checkpointing. Workflows deliver:

- Crash recovery — restart Borg and the workflow resumes from the last completed step.
- Per-step provider override — one step on Claude, another on a cheap local model.
- Observability — every step is a queryable row.

## Claude and workflows

All Claude models skip workflows (`workflow.enabled = "auto"`). Claude's native tool-use loop stays durable enough on its own. Extra indirection adds latency with no gain.

## Key files

- `crates/core/src/workflow/` — planner and dispatcher
- `crates/core/src/db/workflow.rs` — SQLite tables

## See also

- [heartbeat](heartbeat) — one common trigger for workflows
- [guides/scheduling](../guides/scheduling) — how to schedule workflows
