# Patch DSL

The `apply_patch` tool uses a deterministic, diff-like DSL. Every content line needs a prefix.

| Prefix | Meaning |
|---|---|
| `+` | Added line |
| (space) | Context line — used to anchor updates |
| `-` | Removed line |

Omitting the prefix is the most common mistake.

## Grammar

```
*** Begin Patch
*** Add File: path/to/file.py
+import sys
+print("hello")
*** Update File: path/to/file.py
@@
 context
-old line
+new line
*** Delete File: path/to/old.py
*** End Patch
```

## Hunks

`Update File` hunks use `@@` markers and a small context window. Multiple hunks per file are fine. The applicator is fuzzy on whitespace but not content.

## Targets

```json
{ "patch": "...", "target": "cwd" }       // default — current working dir
{ "patch": "...", "target": "skills" }    // writes under ~/.borg/skills/
{ "patch": "...", "target": "channels" }  // writes under ~/.borg/channels/
```

## Safety

- Paths are resolved against the target root; `..` escapes are rejected.
- `Delete File` requires the file to exist (fails loud, doesn't no-op).
- `Add File` fails if the file exists.

## Reference impl

`crates/apply-patch/` — parser + applicator. Library-only; enforces `#![warn(missing_docs)]`.
