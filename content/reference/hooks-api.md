# Hooks API

User script hooks live at `~/.borg/hooks.json`. The schema matches Claude Code and codex for portability.

## Full schema

```json
{
  "hooks": {
    "<HookPoint>": [
      {
        "matcher": "regex on tool name (optional, PreToolUse and PostToolUse only)",
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

- Borg runs `sh -c <command>` with the JSON payload as `$1`.
- Default timeout 60s. Clamped to `[1, 600]`.
- STDOUT gets ignored. (Future: structured response parsing.)
- STDERR logs at `warn` level.

## Semantics

- `PreToolUse` exit != 0 or timeout returns `HookAction::Skip`. The tool call aborts.
- Any other failure (parse error, spawn failure, panic) logs and returns `Continue`. Hooks never break the agent.
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
