# Self-Healing

A daily maintenance task keeps the system healthy without human intervention. No LLM call — it runs pure Rust so it works even with no provider configured.

## Daily sweep (02:00 local)

- Prunes `~/.borg/logs/*.jsonl` and `activity_log` past retention
- Evicts stale embeddings (>30 days unused)
- Heals stalled scheduled tasks
- Runs the headless doctor
- Surfaces warnings that persist across two consecutive runs

Seeded in V37. `task_type = 'maintenance'`. Dispatcher calls `borg_core::maintenance::run_daily_maintenance` directly.

## Stall detection

The daemon loop scans every 5 minutes for scheduled tasks whose `next_run` drifted more than `STALLED_TASK_GRACE_SECS` (1 hour) into the past. Stalled tasks get `task_runs.status = 'missed'` and their `next_run` is reset.

## Memory guardrails

`write_memory` enforces a hard 20,000-token cap (warn at 8,000) so oversized entries fail loudly at write time instead of getting silently dropped by the token-budget loader.

## Skill tamper detection

V39 added a `skill_audit` table: SHA-256 of every user `SKILL.md`. The doctor's Skills check flags post-install tampering.

## Warning surfacing

On TUI open, `App::new` reads the latest `doctor_runs` row and surfaces any `persistent_warnings` as a one-shot `System` cell after the opening card. Intentionally not a pinned banner — noise should be visible once, not forever.
