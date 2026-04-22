# Hooks

Borg exposes lifecycle events through a single `Hook` trait with 9 hook points. Two layers consume them: compiled-in Rust hooks and user script hooks (Claude Code / codex schema).

## Hook points

| Event | When |
|---|---|
| `SessionStart` | New session begins |
| `SessionEnd` | Session ends (crash-safe) |
| `BeforeAgentStart` | Each turn, just before LLM call |
| `AfterAgentTurn` | Each turn, after text response |
| `UserPromptSubmit` | User input received |
| `PreToolUse` | Before a tool handler runs |
| `PostToolUse` | After a tool handler returns |
| `Stop` | Agent loop stops |
| `Heartbeat` | Proactive check-in fires |

## Compiled-in hooks

Registered in `crates/cli/src/repl.rs` and `crates/cli/src/tui/mod.rs`:

- `VitalsHook` — updates 5-stat health (stability, focus, sync, growth, happiness)
- `ActivityHook` — writes `activity_log` rows
- `BondHook` — tracks relationship progression
- `EvolutionHook` — personality drift signals for `/evolution`

## User script hooks

`ScriptHook` reads `~/.borg/hooks.json` (Claude Code / codex schema):

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "run_shell", "command": "/usr/local/bin/my-gate", "timeout": 10 }
    ],
    "SessionStart": [
      { "command": "echo session: $1 >> /tmp/borg.log" }
    ]
  }
}
```

Runs `sh -c <command>` with the JSON payload as `$1`.

### Semantics

- `timeout` default 60s, clamped to `[1, 600]`.
- `PreToolUse` non-zero exit or timeout returns `HookAction::Skip` — **aborts the tool call**.
- Every other failure mode (parse error, spawn failure, non-zero exit, panic) is logged with `tracing::warn!` and returns `Continue`. **Hooks can never break the agent.**
- Gated on `hooks.enabled` (default true).

## When to use which

- **Compiled-in** for behavior that ships with Borg.
- **User scripts** for per-user automation: notifications, audit logs, external gates.

## See also

- [reference/hooks-api](../reference/hooks-api) — full JSON schema
- `borg/docs/hooks.md` in the main repo — source of truth
