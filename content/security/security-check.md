# Security Check

`borg doctor` runs a headless health sweep. It runs as native code with no LLM call and works even when no provider is configured.

Your security feedback loop lives here. Silent issues become loud warnings.

```sh
borg doctor
```

Runs on demand. The daily maintenance task also invokes the same sweep (`task_type = 'maintenance'`, fires at 02:00 local). See [concepts/self-healing](../concepts/self-healing) for the operational side.

## What the sweep checks

- Log retention: prunes `~/.borg/logs/*.jsonl` and the `activity_log` table past retention.
- Stale embeddings: evicts entries unused for more than 30 days from the embedding cache.
- Stalled tasks: any scheduled task whose `next_run` drifted more than one hour into the past (`STALLED_TASK_GRACE_SECS`) gets `task_runs.status = 'missed'` and resets `next_run`.
- Memory guardrails: `write_memory` hard-caps entries at 20,000 tokens. Warns at 8,000. Oversized writes fail loud.
- Skill tampering: hashes user skills and flags drift (see below).
- Settings sanity: missing API keys for configured providers, unresolved credentials, impossible bindings.

## Skill tamper detection

The `skill_audit` table stores SHA-256 hashes for every user `SKILL.md` under `~/.borg/skills/`. Each run rehashes and compares.

A mismatch means a user skill changed after install. The doctor surfaces a warning. No auto-revert. Your call.

Built-in skills ship embedded inside the binary. No hash needed.

## Persistent warnings

A warning appearing in two consecutive doctor runs gets promoted to a persistent warning.

At session start, Borg reads the latest `doctor_runs` row. Any `persistent_warnings` surface as a one-shot system message after the opening card. Not a pinned banner by design. Noise shows once per session, never forever.

See the full list:

```sh
borg doctor --verbose
```

## Why security cares

Silent drift is the enemy. Examples the doctor surfaces loudly:

- A skill modified by a compromised package manager.
- A credential the upstream provider revoked.
- A scheduled task missing its window.
- A memory entry grown past the loader's budget and dropped from context.
- DB file permissions drifted off `0600`.

Each failure mode would run quietly without the sweep.
