# Architecture

Borg ships as one binary. The process splits cleanly into a few subsystems.

| Subsystem | Purpose |
|---|---|
| CLI | Interactive session, subcommands, onboarding, heartbeat display |
| Core | Agent loop, multi-provider LLM, memory, identity, config, tools, skills, workflows |
| Heartbeat | Proactive scheduler with quiet hours and dedup |
| Sandbox | macOS Seatbelt and Linux Bubblewrap policies |
| Apply-patch | Patch DSL parser and filesystem applicator |
| Gateway | Webhook gateway and native channel integrations |
| Plugins | Marketplace catalog and plugin installer |

All integrations compile unconditionally. iMessage stays macOS-only behind a platform guard.

## Critical invariants

### No silent error swallowing

Ignoring errors is banned on operations of any consequence. Every error logs and either propagates, or logs and continues in fire-and-forget contexts. When an operation reports success to you, the operation must succeed.

### No approval prompts

Per-tool-call confirmation dialogs are removed as a design decision. Shell commands auto-execute. Only catastrophic commands (`rm -rf /`, `mkfs`, `dd`, `curl|sh`) are denied. Sandboxing and rate-limiting are security boundaries, not approval gates.

### Mouse interaction

Native click+drag text selection must work in the transcript with no modifier keys. Implementation: xterm Alternate Scroll Mode (`?1007h`) only. Forbidden: `?1000h`, `?1002h`, `?1003h`, `?1006h`, `EnableMouseCapture`, `DisableMouseCapture`, and any per-event mouse capture. Guard tests fail when forbidden patterns reappear.

### Tool conservation

Every tool's JSON schema ships to the LLM every turn (~5KB per turn). Extend an existing tool with a new `action` parameter over adding a new tool.

### Patch DSL prefixes

Every content line in the patch DSL needs `+`, (space), or `-`. See [patch-dsl](patch-dsl).

### Blocked paths

`[security] blocked_paths` filter from sandbox `fs_read` and `fs_write` before profile generation. `list_dir` rechecks on every entry.

## Database

SQLite at `~/.borg/borg.db`. Migrations run on open.

Key tables: `sessions`, `messages`, `scheduled_tasks`, `task_runs`, `channel_sessions`, `channel_messages`, `settings`, `pairing_requests`, `approved_senders`, `embedding_cache`, `vitals_events`, `projects`, `workflows`, `workflow_steps`, `memory_entries`, `skill_audit`, `doctor_runs`, `activity_log`.

## Git utilities

- Ghost commits — snapshot the repo on session start using a temp index. Enables atomic undo without polluting the real git log.
- Git context — branch, recent commits, dirty status. Injected into the system prompt.

## Debugging

Logs at `~/.borg/logs/`:

- Session log — interactive session output
- `daemon.log`, `daemon.err` — daemon
- `{date}.jsonl` — structured JSON logs

Raise verbosity with `borg --verbose`. See [contributing/development](../contributing/development) for module-level log-level control.
