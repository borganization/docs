# Prompt Injection Defense

Five layers. Each fails closed. Bypasses log.

## 1. Input sanitization

Scoring-based, not strip-based. Suspicious inputs flag (wrapped in `<untrusted>` tags with a score). No silent rewrites. The agent sees the flag and treats the content with skepticism.

## 2. Context segregation

Every external input wraps in XML trust boundaries:

- `<long_term_memory trust="stored">` — written by you or the agent. Higher trust.
- `<tool_result trust="untrusted">` — any tool output from a non-compiled-in tool.
- `<channel_message trust="untrusted">` — inbound messages from channels.

The system prompt orders the model to reject instructions inside `trust="untrusted"` blocks.

## 3. Prompt hardening

The system prompt prefix lists ignore-triggers the agent must reject from any source: "ignore previous", "system prompt override", role-flip attacks.

## 4. Rate limiting

Per-session action caps. A session issuing more than N tool calls of the same shape in a row queues subsequent calls with a user confirmation. Defense against tool-call flood attacks via injected content.

## 5. Secret redaction

Before any outbound send (channel delivery, logs), known secret patterns redact:

- API keys matching common provider prefixes (`sk-`, `sk-ant-`, `gsk_`, and so on).
- SSH private key blocks.
- AWS access keys.

Redaction happens in the outbound pipeline. A prompt-injection tricking the agent into exfiltrating a secret fails at the last hop.

## Memory write scanning

Orthogonal to the five layers. `write_memory` rejects:

- Prompt override: "ignore previous instructions", "you are now", "system prompt override".
- Exfiltration: `curl -d` or `wget --post-data` with credential-looking payloads.
- Invisible Unicode: zero-width spaces, RTL overrides, BOM.
