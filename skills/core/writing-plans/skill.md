---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
---

# Writing Plans

## Overview

Write comprehensive implementation plans with bite-sized tasks. Document everything: which files to touch, code examples, testing approach.

**Core principle:** Plan before coding. Bite-sized tasks. Exact file paths.

## Plan Structure

### Header Template

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** Use subagent-driven-development to implement this plan.

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

### Task Template

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

- [ ] **Step 1: Write the failing test**

```python
def test_specific_behavior():
    result = function(input)
    assert result == expected
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest tests/path/test.py::test_name -v`
Expected: FAIL with "function not defined"

- [ ] **Step 3: Write minimal implementation**

```python
def function(input):
    return expected
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest tests/path/test.py::test_name -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/path/test.py src/path/file.py
git commit -m "feat: add specific feature"
```
```

## Task Granularity

**Each step is one action (2-5 minutes):**
- "Write the failing test" - step
- "Run it to make sure it fails" - step
- "Implement the minimal code to make the test pass" - step
- "Run the tests and make sure they pass" - step
- "Commit" - step

## No Placeholders

Every step must contain actual content. Never write:
- "TBD", "TODO", "implement later"
- "Add appropriate error handling"
- "Write tests for the above" (without actual test code)
- "Similar to Task N" (repeat the code)

## File Structure

Before defining tasks, map out files:

- Design units with clear boundaries
- 200-400 lines typical, 800 max
- Split by responsibility, not by technical layer
- Follow existing codebase patterns

## Self-Review

After writing the plan:

1. **Spec coverage:** Can you point to a task for each requirement?
2. **Placeholder scan:** Any TBD, TODO, vague requirements?
3. **Type consistency:** Do signatures match across tasks?

Fix issues inline. No need to re-review.

## Execution Handoff

After saving the plan:

**"Plan complete. Two execution options:**

1. **Subagent-Driven (recommended)** - Fresh subagent per task, two-stage review
2. **Inline Execution** - Execute tasks in this session with checkpoints

Which approach?"

**If Subagent-Driven:** Use subagent-driven-development skill.

**If Inline:** Use executing-plans skill.
