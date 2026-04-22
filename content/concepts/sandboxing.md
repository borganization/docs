# Sandboxing

`run_shell` and script channels execute inside OS-level sandboxes.

## macOS — Seatbelt

`sandbox-exec` with a generated `.sb` policy. Deny-all default; the `[sandbox]` section of the per-script/channel config opens specific holes.

```toml
[sandbox]
allow_network = true
allow_fs_read = ["~/Documents/work"]
allow_fs_write = ["~/Documents/work/out"]
```

## Linux — Bubblewrap

`bwrap` with user / mount / PID / network namespaces. Same config keys map to `bwrap` args.

## Blocked paths

Before profile generation, `[security] blocked_paths` are stripped from `fs_read` / `fs_write`. Defaults:

```
.ssh
.aws
.gnupg
.config/gh
.env
credentials
private_key
```

`list_dir` also checks each entry against this list.

## What's *not* sandboxed

- The `borg` binary itself.
- Compiled-in tools (`read_file`, `list_dir`, `write_memory`, etc.). These are typed handlers with their own path checks.

## Catastrophic command denylist

Even inside the sandbox, `run_shell` refuses a short list of universally-destructive commands (e.g. `rm -rf /`, `mkfs`, `dd if=…of=/dev/…`, `curl | sh`). These are blocked pre-exec, not by the sandbox.

## Reference

`crates/sandbox/` is the library. `#![warn(missing_docs)]` is enforced, so every public item has a doc comment.
