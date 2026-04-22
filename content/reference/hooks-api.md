# Hooks API

User script hooks live at `~/.borg/hooks.json`. Schema matches Claude Code / codex for portability.

## Full schema

```json
{
  "hooks": {
    "<HookPoint>": [
      {
        "matcher": "regex on tool name (optional, PreToolUse/PostToolUse only)",
        "command": "sh command to run",
        "timeout": 60
      }
    ]
  }
}
```

## Hook points

| Point | `$1` payload |
|---|---|
| `SessionStart` | `{ "session_id": ..., "project_id": ... }` |
| `SessionEnd` | `{ "session_id": ..., "duration_secs": ... }` |
| `UserPromptSubmit` | `{ "prompt": "...", "session_id": ... }` |
| `PreToolUse` | `{ "tool": "run_shell", "input": {...}, "session_id": ... }` |
| `PostToolUse` | `{ "tool": "run_shell", "input": {...}, "output": "...", "session_id": ... }` |
| `Stop` | `{ "session_id": ..., "reason": "..." }` |

## Execution

- `sh -c <command>` with the JSON payload as `$1`.
- Default timeout 60s. Clamped to `[1, 600]`.
- STDOUT is ignored (future: structured response parsing).
- STDERR is logged at `warn` level.

## Semantics

- `PreToolUse` exit != 0 or timeout → `HookAction::Skip` aborts the tool call.
- Any other failure (parse error, spawn failure, panic) → logged, `Continue`. **Hooks can never break the agent.**
- Gated on `hooks.enabled` (default `true`).

## Example

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "run_shell",
        "command": "jq -e '.input.command | test(\"rm -rf\") | not' <<< \"$1\"",
        "timeout": 5
      }
    ],
    "PostToolUse": [
      {
        "matcher": "write_memory",
        "command": "echo \"$(date -Iseconds) memory written\" >> ~/.borg/audit.log"
      }
    ]
  }
}
```
