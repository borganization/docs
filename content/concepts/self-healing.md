# Self-Healing

A daily maintenance task keeps the system healthy with no human intervention. No LLM call. Pure Rust. Runs with no provider configured.

## Daily sweep (02:00 local)

- Prunes `~/.borg/logs/*.jsonl` and `activity_log` past retention.
- Evicts stale embeddings (>30 days unused).
- Heals stalled scheduled tasks.
- Runs the headless doctor.
- Surfaces warnings persisting across two consecutive runs.

Seeded in V37. `task_type = 'maintenance'`. The dispatcher calls `borg_core::maintenance::run_daily_maintenance` directly.

## Stall detection

The daemon scans every 5 minutes for scheduled tasks whose `next_run` drifted more than `STALLED_TASK_GRACE_SECS` (1 hour) into the past. Stalled tasks get `task_runs.status = 'missed'`. Their `next_run` resets.

## Memory guardrails

`write_memory` enforces a hard 20,000-token cap. Warns at 8,000. Oversized entries fail loudly at write time. No silent drops from the token-budget loader.

## Skill tamper detection

V39 added a `skill_audit` table. SHA-256 hashes track every user `SKILL.md`. The doctor's Skills check flags post-install tampering.

## Warning surfacing

On TUI open, `App::new` reads the latest `doctor_runs` row. Any `persistent_warnings` surface as a one-shot `System` cell after the opening card. Not a pinned banner by design. Noise shows once, not forever.
