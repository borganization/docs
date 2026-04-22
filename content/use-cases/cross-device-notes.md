# Cross-Device Notes

Capture from your phone. Retrieve anywhere. Borg's memory is the notebook.

## Setup

1. A channel on your phone. Telegram or iMessage.
2. Memory scope: `global` (default) or a dedicated project `project:notes`.

## Capture

```
[phone, 11:47am]
you:   add to notes: paperclip maximizer talk saturday 3pm, UCSF
borg:  saved.
```

Under the hood, the agent called `write_memory` with:

```json
{
  "filename": "events-2026",
  "content": "...paperclip maximizer talk saturday 3pm, UCSF...",
  "append": true,
  "scope": "global"
}
```

## Retrieve

```
[laptop, later]
you:   what's saturday?
borg:  Paperclip maximizer talk, 3pm at UCSF.
```

Hybrid search (vector plus BM25) finds the note even with different wording.

## Why not Apple Notes or Notion

Two reasons:

- No context switch. You are already chatting with Borg. Do not open another app.
- The agent understands the notes. "What's on my todo list in the next 2 weeks?" is a query, not a text search.

## Consolidation

Nightly consolidation (3 AM) merges scattered memory entries. Weekly review (4 AM Sunday) tightens them. Over time, your notes self-organize.
