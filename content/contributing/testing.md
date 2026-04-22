# Testing

## Invariant: every test must fail for a real reason

A passing test with no failure mode is noise. Noise inflates the suite, slows CI, and gives false confidence. Reject these patterns in review:

| Pattern | Why wrong | Fix |
|---|---|---|
| Tautological | Asserting on a value the test just set, on `Default::default()`, or on a compile-time constant. The compiler checks this. | Delete |
| Over-mocked | Mock returns canned data, test asserts on the canned data. Production path stays unexercised. | Real fixture, or delete |
| Smoke-only | `.is_ok()`, `.is_some()`, "did not panic". No real assertion. | Add a real assertion, or delete |
| Enum-variant-exists | `let x = Event::Foo{}; assert!(matches!(x, Event::Foo{..}))`. Compiler-checked. | Delete |
| Source-grep | `include_str!(...); assert!(src.contains("fn foo"))`. Brittle. Re-asserts what the compiler enforces. | Delete (exceptions below) |
| Near-duplicate per-variant | One test per enum variant, same body. Redundant. | Collapse into one table-driven test |

## What a good test looks like

- Exercises a real code path.
- Inputs that occur in practice.
- Asserts a specific observable outcome.
- Fails when the production logic breaks.

Prefer fewer strong tests over many weak ones.

## Exceptions to source-grep

Source-grep tests stay acceptable only when enforcing an invariant types cannot express:

- Prompt cache stability guards in `build_system_prompt_*`.
- Forbidden mouse-capture patterns in `crates/cli/src/tui/mod.rs` and `app.rs`.

When you write one, add a comment naming the invariant and the incident motivating the guard. Otherwise reviewers will correctly delete the test.

## Running

```sh
cargo test                           # all
cargo test -p borg-core              # one crate
cargo test --test agent_loop         # one integration test
cargo test -- --ignored              # slow and network tests
```

## Coverage

```sh
just coverage
just coverage-summary
```

Target 80% or higher.
