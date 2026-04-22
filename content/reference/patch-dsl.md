# Patch DSL

The `apply_patch` tool uses a deterministic, diff-like DSL. Every content line needs a prefix.

| Prefix | Meaning |
|---|---|
| `+` | Added line |
| (space) | Context line. Anchors updates. |
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

`Update File` hunks use `@@` markers and a small context window. Multiple hunks per file work fine. The applicator stays fuzzy on whitespace but strict on content.

## Targets

```json
{ "patch": "...", "target": "cwd" }       // default: current working dir
{ "patch": "...", "target": "skills" }    // writes under ~/.borg/skills/
{ "patch": "...", "target": "channels" }  // writes under ~/.borg/channels/
```

## Safety

- Paths resolve against the target root. `..` escapes reject.
- `Delete File` requires the file to exist. Fails loud, no no-op.
- `Add File` fails when the file exists.

## Reference impl

`crates/apply-patch/`. Parser and applicator. Library-only. Enforces `#![warn(missing_docs)]`.
