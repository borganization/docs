# Tool Catalog

See [concepts/tools](../concepts/tools) for the overview. This page lists every tool with its input shape.

## `write_memory`

```json
{
  "filename": "string",
  "content":  "string",
  "append":   false,
  "scope":    "global" | "project:{id}"
}
```

Rejects entries > 20k tokens. Warns at 8k. Injection-scanned.

## `read_memory`

```json
{ "filename": "string" }
```

## `memory_search`

```json
{ "query": "string", "scope": "optional", "limit": 10 }
```

Hybrid vector + BM25. Falls back to per-term matching if no phrase hits.

## `list`

```json
{ "kind": "tools" | "skills" | "channels" | "agents" }
```

## `apply_patch`

```json
{ "patch": "string", "target": "cwd" | "skills" | "channels" }
```

See [patch-dsl](patch-dsl).

## `run_shell`

```json
{ "command": "string", "cwd": "optional", "timeout_secs": 120 }
```

Sandboxed. Catastrophic commands denied pre-exec.

## `read_file`

```json
{ "path": "string", "start_line": 1, "num_lines": 200 }
```

Handles images (returned as image content) and PDFs (page ranges required for > 10 pages).

## `list_dir`

```json
{ "path": "string", "depth": 3 }
```

Max depth 3. Honors `[security] blocked_paths`.

## `browser`

```json
{ "action": "visit" | "click" | "type" | "snapshot", ... }
```

Headless Chrome. Gated on `browser.enabled`.

## `web_fetch`

```json
{ "url": "string", "format": "text" | "html" | "markdown" }
```

## `web_search`

```json
{ "query": "string", "max_results": 10 }
```

## `projects`

```json
{ "action": "create" | "list" | "get" | "update" | "archive" | "delete", ... }
```

## `schedule`

```json
{ "action": "create" | "list" | "update" | "delete" | "run", ... }
```

Job types: `prompt`, `command`, `workflow`.

## `request_user_input`

```json
{ "question": "string", "timeout_secs": 300 }
```

## `text_to_speech`

```json
{ "text": "string", "voice": "optional" }
```

## `generate_image`

```json
{ "prompt": "string", "size": "1024x1024" }
```
