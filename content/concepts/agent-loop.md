# Agent Loop

One turn equals one LLM call plus any tool calls the model issues. The loop repeats until the model returns text only.

## Pseudocode

```
loop:
  prompt   = assemble_system_prompt()    # IDENTITY + time + git + mode + memory + skills
  response = llm.stream(prompt, history)
  strip <internal>...</internal> tags in real-time
  if response has tool_calls:
    for call in tool_calls:
      result = execute_tool(call)
      persist_to_sqlite(result)          # crash recovery
    continue
  else:
    return response.text
```

## System prompt assembly

Borg rebuilds the prompt each turn:

1. `IDENTITY.md`. Agent personality. Stable prefix.
2. Current time and timezone.
3. Git context (branch, recent commits) inside a repo.
4. [Collaboration mode](collaboration-modes) preamble.
5. `<long_term_memory trust="stored">`. INDEX plus top-k semantic matches. Token-budgeted.
6. Project docs (`CLAUDE.md`, `AGENTS.md`) when present.
7. Coding instructions.
8. Available [plugins](plugins). Metadata always, full body when in budget.
9. `<working_memory>`. Session facts. Dynamic suffix.

The stable prefix caches across turns. Only the suffix changes turn to turn. Prompt caching pays off.

## Tool calling

The LLM emits a JSON block per tool call. The dispatcher:

- Validates args against the tool's JSON schema.
- Runs the tool's handler.
- Streams output back as a tool-result message.
- Persists the message immediately. A crash mid-turn loses no work.

See [tools](tools) for the catalog.

## Streaming

Responses stream token by token. The renderer strips `<internal>...</internal>` tags (agent scratchpad) before display. History keeps the scratchpad so the model sees prior reasoning on the next turn.

## Crash recovery

Every message, tool call, and tool result writes to SQLite as you go. Kill `borg` mid-turn. The next `borg` resumes the session with no lost work.
