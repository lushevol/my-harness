---
name: test-driven-development
description: Use when implementing any feature or bugfix, before writing implementation code
---

# Test-Driven Development (TDD)

## Overview

Write the test first. Watch it fail. Write minimal code to pass.

**Core principle:** If you didn't watch the test fail, you don't know if it tests the right thing.

**Violating the letter of the rules is violating the spirit of the rules.**

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? Delete it. Start over.

## Red-Green-Refactor

1. **RED** - Write one minimal failing test
2. **Verify RED** - Run test, confirm it fails for expected reason
3. **GREEN** - Write simplest code to pass test
4. **Verify GREEN** - Run test, confirm passes
5. **REFACTOR** - Clean up, keep tests green
6. **Repeat** - Next behavior

## Good Tests

- One behavior per test
- Clear name describing behavior
- Real code (avoid mocks)
- Test the what, not the how

## Verification Checklist

Before marking work complete:
- [ ] Every function has a test
- [ ] Watched each test fail first
- [ ] Wrote minimal code to pass
- [ ] All tests pass
- [ ] Refactored while green
