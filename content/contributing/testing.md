# Testing

## Invariant: every test must be able to fail for a real reason

A passing test with no failure mode is noise. It inflates the suite, slows CI, and provides false confidence. Reject these patterns in review:

| Pattern | Why it's wrong | Fix |
|---|---|---|
| **Tautological** — asserting on a value the test just set, or on `Default::default()`, or on a compile-time constant | The compiler already checks this | Delete |
| **Over-mocked** — mock returns canned data, test asserts on the canned data | Production path isn't exercised | Real fixture or delete |
| **Smoke-only** — `.is_ok()` / `.is_some()` / "didn't panic" | No real assertion | Add a real assertion or delete |
| **Enum-variant-exists** — `let x = Event::Foo{}; assert!(matches!(x, Event::Foo{..}))` | Compiler-checked | Delete |
| **Source-grep** — `include_str!(…); assert!(src.contains("fn foo"))` | Brittle, re-asserts what the compiler enforces | Delete (exceptions below) |
| **Near-duplicate per-variant** — one test per enum variant, same body | Redundant | Collapse into one table-driven test |

## What a good test looks like

- Exercises a real code path.
- Inputs that could realistically occur.
- Asserts a specific **observable** outcome.
- Would fail if the production logic broke.

Prefer fewer strong tests to many weak ones.

## Exceptions to source-grep

Source-grep tests are acceptable **only** when enforcing an invariant types can't express:

- **Prompt cache stability** guards in `build_system_prompt_*`.
- **Forbidden mouse-capture patterns** in `crates/cli/src/tui/mod.rs` and `app.rs`.

When you write one, add a comment naming the invariant and the incident that motivated the guard. Otherwise reviewers will correctly delete it.

## Running

```sh
cargo test                           # all
cargo test -p borg-core              # one crate
cargo test --test agent_loop         # one integration test
cargo test -- --ignored              # slow/network tests
```

## Coverage

```sh
just coverage
just coverage-summary
```

Target 80%+.
