# Workflows

Durable multi-step orchestration. The LLM decomposes a task into ordered steps; each step runs as an isolated agent turn with prior step outputs injected. State persists in SQLite, so workflows survive crashes and restarts.

## Lifecycle

1. User invokes a workflow (via `schedule` tool, cron, or `/schedule`).
2. Planner LLM emits N steps with explicit dependencies.
3. Dispatcher runs steps in order; each step is a fresh turn with prior outputs as context.
4. Step results written to `workflow_steps`.
5. On completion, final summary returned.

## Why not just loop?

A long single turn hits context limits and has no checkpointing. Workflows get:

- **Crash recovery.** Restart Borg; the workflow resumes from the last completed step.
- **Per-step provider override.** One step on Claude, another on a cheap local model.
- **Observability.** Every step is a queryable row.

## Claude and workflows

All Claude models skip workflows (`workflow.enabled = "auto"`). Claude's native tool-use loop is already durable enough; the extra indirection adds latency without gain.

## Key files

- `crates/core/src/workflow/` — planner, dispatcher
- `crates/core/src/db/workflow.rs` — SQLite tables

## See also

- [heartbeat](heartbeat) — one common trigger for workflows
- [guides/scheduling](../guides/scheduling) — how to schedule workflows
