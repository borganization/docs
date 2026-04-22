# Tools

Tools are typed handlers compiled into the binary. Unlike [skills](skills), tools are Rust functions with JSON-schema signatures. Every tool's schema ships to the LLM every turn.

Tool conservation: every tool costs about 5KB per turn. Adding tools stays rare. Extending an existing tool with a new `action` parameter wins over adding a tool.

## Catalog

| Tool | Purpose |
|---|---|
| `write_memory` | Write or append to a memory entry. `scope`: `global` or `project:{id}`. |
| `read_memory` | Read a memory entry by name. |
| `memory_search` | Hybrid vector and BM25 search across memory and sessions. |
| `list` | List resources: tools, skills, channels, agents. |
| `apply_patch` | Create, update, delete files via the [patch DSL](../reference/patch-dsl). Target: cwd, skills, or channels. |
| `run_shell` | Execute a shell command. Sandboxed. Catastrophic commands denied. |
| `read_file` | Read a file with line numbers. Handles images and PDFs. |
| `list_dir` | List a directory, depth max 3. Honors `[security] blocked_paths`. |
| `browser` | Headless Chrome automation. Gated on `browser.enabled`. |
| `web_fetch` | Fetch a URL. Gated on `web.enabled`. |
| `web_search` | Web search. Gated on `web.enabled`. |
| `projects` | Manage [projects](projects): create, list, get, update, archive, delete. |
| `schedule` | Manage scheduled jobs: prompt tasks, cron commands, workflows. |
| `request_user_input` | Ask you a question and wait for your reply. |
| `text_to_speech` | TTS synthesis. Gated on `tts.enabled`. |
| `generate_image` | Image generation. Gated on `image_gen.enabled`. |

## Plan mode

In [Plan mode](collaboration-modes), mutating tools stay blocked. The allowlist lives in `crates/core/src/agent.rs`. New tools default to blocked. For a read-only tool, add the tool to the allowlist when you add the tool.

## Adding a tool

See [contributing/development](../contributing/development#adding-a-new-tool). Extending an existing tool wins.
