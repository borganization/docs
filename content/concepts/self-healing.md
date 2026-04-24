# Self-Healing

A daily maintenance task keeps the system healthy with no human intervention. It runs as native code with no LLM call and works even when no provider is configured.

## Daily sweep (02:00 local)

- Prunes `~/.borg/logs/*.jsonl` and `activity_log` past retention.
- Evicts stale embeddings (>30 days unused).
- Heals stalled scheduled tasks.
- Runs the headless doctor.
- Surfaces warnings persisting across two consecutive runs.

`task_type = 'maintenance'`. The dispatcher runs daily maintenance directly, no LLM call.

## On-demand sweep

`/heal` runs the full sweep immediately — same code path, same `doctor_runs` row written. Use when you don't want to wait for 02:00.

`/doctor` is read-only diagnostics. `/heal` is `/doctor` plus the mutating housekeeping steps (log truncation, activity pruning, embedding eviction, workflow pruning, stalled-task recovery).

## Stall detection

The daemon scans every 5 minutes for scheduled tasks whose `next_run` drifted more than `STALLED_TASK_GRACE_SECS` (1 hour) into the past. Stalled tasks get `task_runs.status = 'missed'`. Their `next_run` resets.

## Memory guardrails

`write_memory` enforces a hard 20,000-token cap. Warns at 8,000. Oversized entries fail loudly at write time. No silent drops from the token-budget loader.

## Skill tamper detection

A `skill_audit` table tracks SHA-256 hashes for every user `SKILL.md`. The doctor's Skills check flags post-install tampering.

## Warning surfacing

At session start, Borg reads the latest `doctor_runs` row. Any `persistent_warnings` surface as a one-shot system message after the opening card. Not a pinned banner by design. Noise shows once, not forever.
