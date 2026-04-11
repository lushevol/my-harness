---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
---

# Systematic Debugging

## Overview

Random fixes waste time and create new bugs. Find root cause before attempting fixes.

**Core principle:** ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

## The Four Phases

### Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

1. **Read Error Messages Carefully**
   - Don't skip errors or warnings
   - Read stack traces completely
   - Note line numbers, file paths, error codes

2. **Reproduce Consistently**
   - Can you trigger it reliably?
   - What are the exact steps?

3. **Check Recent Changes**
   - What changed that could cause this?
   - Git diff, recent commits

4. **Gather Evidence**
   - Log data at each layer
   - Verify environment/config propagation
   - Check state at each boundary

5. **Trace Data Flow**
   - Where does bad value originate?
   - Keep tracing up to find source
   - Fix at source, not symptom

### Phase 2: Pattern Analysis

1. **Find Working Examples** - Locate similar working code
2. **Compare Against References** - Read reference implementation completely
3. **Identify Differences** - List every difference
4. **Understand Dependencies** - What does this need to work?

### Phase 3: Hypothesis and Testing

1. **Form Single Hypothesis** - "I think X is the root cause because Y"
2. **Test Minimally** - Smallest possible change to test hypothesis
3. **Verify Before Continuing** - Did it work? Yes → Phase 4. No → New hypothesis.
4. **When You Don't Know** - Say "I don't understand X"

### Phase 4: Implementation

1. **Create Failing Test Case** - Reproduce bug in test
2. **Implement Single Fix** - Address root cause, ONE change
3. **Verify Fix** - Test passes? No other tests broken?
4. **If 3+ Fixes Failed** - STOP. Question the architecture.

## Quick Reference

| Phase | Key Activities | Success Criteria |
|-------|---------------|----------------|
| **1. Root Cause** | Read errors, reproduce, check changes | Understand WHAT and WHY |
| **2. Pattern** | Find working examples, compare | Identify differences |
| **3. Hypothesis** | Form theory, test minimally | Confirmed or new hypothesis |
| **4. Implementation** | Create test, fix, verify | Bug resolved, tests pass |

## Red Flags - STOP

- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "Skip the test, I'll manually verify"
- "One more fix attempt" (when already tried 2+)
- **Each fix reveals new problem in different place**
