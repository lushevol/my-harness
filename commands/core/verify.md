---
name: verify
description: Verify implementation before claiming complete
---

# /verify Command

## Usage

```
/verify
```

## Description

Runs complete verification suite:
1. All tests pass
2. Lint/type checks pass
3. Manual verification steps
4. Requirements checklist

## Process

### 1. Test Suite

```bash
# Run full test suite
npm test
# or: pytest
# or: cargo test
# or: go test ./...
```

**Expected:** All tests pass (0 failures)

**If failures:**
```
Verification Failed: Tests
==========================

[N] test failures:
- test_name_1: error message
- test_name_2: error message

Fix failures before proceeding.
Use /debug for systematic debugging.
```

### 2. Lint/Type Checks

```bash
# TypeScript
npm run lint
npx tsc --noEmit

# Python
flake8 src/
mypy src/

# Rust
cargo clippy
cargo fmt --check

# Go
go vet ./...
gofmt -d .
```

**Expected:** No errors, no warnings

**If errors:**
```
Verification Failed: Lint/Type
==============================

[N] issues found:
- file:line: issue description

Fix issues before proceeding.
```

### 3. Manual Verification

If plan includes manual steps:
- Execute each step
- Verify expected behavior
- Document results

### 4. Requirements Checklist

Check against original spec:
```markdown
- [ ] Requirement 1 implemented
- [ ] Requirement 2 implemented
- [ ] Requirement 3 implemented
...
```

**If missing:**
```
Verification Failed: Requirements
=================================

Missing requirements:
- Requirement X not found in implementation

Add missing functionality before proceeding.
```

### 5. Final Report

**All pass:**
```
✓ Verification Complete
======================

✓ Tests: All pass (N tests)
✓ Lint/Type: Clean
✓ Manual verification: Passed
✓ Requirements: All met

Ready for completion.
Use /complete to merge/PR/discard.
```

**Any failures:**
```
✗ Verification Failed
=====================

[Section]: [Status]
[Section]: [Status]

Fix issues and re-run /verify.
```

## Integration

**Uses skill:** verification-before-completion

**Related commands:**
- /execute - Creates implementation to verify
- /complete - Finishes branch after verification

**Called by:** finishing-a-development-branch
