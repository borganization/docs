# Sandboxing

`run_shell` and script channels run inside OS-level sandboxes.

## macOS: Seatbelt

`sandbox-exec` with a generated `.sb` policy. Deny-all default. The `[sandbox]` section per script or channel opens specific holes.

```toml
[sandbox]
allow_network = true
allow_fs_read = ["~/Documents/work"]
allow_fs_write = ["~/Documents/work/out"]
```

## Linux: Bubblewrap

`bwrap` with user, mount, PID, and network namespaces. The same config keys map to `bwrap` args.

## Blocked paths

Before profile generation, `[security] blocked_paths` strip from `fs_read` and `fs_write`. Defaults:

```
.ssh
.aws
.gnupg
.config/gh
.env
credentials
private_key
```

`list_dir` rechecks every entry against this list.

## Not sandboxed

- The `borg` binary itself.
- Compiled-in tools (`read_file`, `list_dir`, `write_memory`, and so on). These are typed handlers with their own path checks.

## Catastrophic command denylist

Inside the sandbox, `run_shell` still refuses a short list of universally destructive commands: `rm -rf /`, `mkfs`, `dd if=...of=/dev/...`, `curl | sh`. Blocked pre-exec, not by the sandbox.

## Reference

`crates/sandbox/` is the library. `#![warn(missing_docs)]` stays enforced. Every public item gets a doc comment.
