# Agent Loop

One turn = one LLM call plus any tool calls it produces, looped until the model returns text only.

## Pseudocode

```
loop:
  prompt   = assemble_system_prompt()    # IDENTITY + time + git + mode + memory + skills
  response = llm.stream(prompt, history)
  strip <internal>…</internal> tags in real-time
  if response has tool_calls:
    for call in tool_calls:
      result = execute_tool(call)
      persist_to_sqlite(result)          # crash recovery
    continue
  else:
    return response.text
```

## System prompt assembly

Assembled fresh each turn:

1. `IDENTITY.md` (agent personality, stable prefix)
2. Current time + timezone
3. Git context (branch, recent commits) if inside a repo
4. [Collaboration mode](collaboration-modes) preamble
5. `<long_term_memory trust="stored">` — INDEX + top-k semantic matches (token-budgeted)
6. Project docs (CLAUDE.md / AGENTS.md) if present
7. Coding instructions
8. Available [skills](skills) (metadata always, full body when in budget)
9. `<working_memory>` — session facts (dynamic suffix)

The stable prefix caches across turns; only the suffix changes turn-to-turn. This is what makes prompt caching pay off.

## Tool calling

The LLM emits a JSON block per tool call. Borg's tool dispatcher:

- Validates the args against the tool's JSON schema
- Runs the handler (`crates/core/src/tool_handlers/<name>.rs`)
- Streams output back as a tool-result message
- Persists the message immediately, so a crash mid-turn doesn't lose the work

See [tools](tools) for the catalog.

## Streaming

Responses stream token-by-token. `<internal>…</internal>` tags (agent's private scratchpad) are stripped before display, but kept in history so the model sees its own reasoning on the next turn.

## Crash recovery

Every message, tool call, and tool result is written to SQLite as it happens. Kill `borg` mid-turn and the next `borg` picks up the session with nothing lost.

## Source

`crates/core/src/agent.rs` is ~800 lines and the best place to understand the loop in detail.
