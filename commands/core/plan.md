---
name: plan
description: Create implementation plan from spec or requirements
---

# /plan Command

## Usage

```
/plan [spec-file]
```

## Description

Creates detailed implementation plan from spec:
1. Read spec/requirements
2. Break into bite-sized tasks (2-5 min each)
3. Define exact file paths
4. Include verification steps
5. Save to docs/planning/implementation-plan.md

## Process

### 1. Read Input

If spec file provided:
```bash
cat [spec-file]
```

If no spec file:
- Ask user for requirements
- Guide through clarification questions

### 2. Analyze Scope

- What files need creating/modifying?
- What are the dependencies?
- What tests are needed?
- What are the verification criteria?

### 3. Create Task Breakdown

Each task must have:
- Clear name
- Exact file paths (create/modify/test)
- Steps with code examples
- Verification commands
- Expected outputs

### 4. Write Plan Document

**Location:** `docs/planning/implementation-plan.md`

**Structure:**
```markdown
# [Feature] Implementation Plan

**Goal:** One sentence describing what this builds

**Architecture:** 2-3 sentences about approach

**Tech Stack:** Key technologies/libraries

**Dependencies:** What must be in place first

---

## Task 1: [Name]

**Files:**
- Create: `exact/path/to/file.py`
- Test: `tests/path/to/test_file.py`

**Steps:**

- [ ] Step 1: Write failing test
  ```python
  def test_behavior():
      result = function(input)
      assert result == expected
  ```

- [ ] Step 2: Run test, verify it fails
  ```bash
  pytest tests/path/test_file.py::test_behavior -v
  # Expected: FAIL
  ```

- [ ] Step 3: Write minimal implementation
  ```python
  def function(input):
      return expected
  ```

- [ ] Step 4: Run test, verify it passes
  ```bash
  pytest tests/path/test_file.py::test_behavior -v
  # Expected: PASS
  ```

- [ ] Step 5: Commit
  ```bash
  git add tests/path/test_file.py src/path/file.py
  git commit -m "feat: add specific feature"
  ```

## Task 2: [Name]

[... similar structure ...]

---

## Verification

After all tasks complete:

- [ ] All tests pass: `npm test` / `pytest` / etc.
- [ ] No lint errors: `npm run lint` / `flake8` / etc.
- [ ] Type check passes: `tsc --noEmit` / `mypy` / etc.
- [ ] Manual verification: [specific steps]

## Notes

- [Any special considerations, edge cases, etc.]
```

### 5. Self-Review

Before saving, check for:
- [ ] All requirements from spec covered
- [ ] No "TBD", "TODO", or vague requirements
- [ ] File paths exact and consistent
- [ ] Types/methods match across tasks
- [ ] Verification steps specific and testable

### 6. Save and Offer Execution

Save plan to `docs/planning/implementation-plan.md`

Commit:
```bash
git add docs/planning/implementation-plan.md
git commit -m "docs: add implementation plan for [feature]"
```

Offer execution:
```
Plan saved to docs/planning/implementation-plan.md

Two execution options:

1. **Subagent-Driven (recommended)** - Fresh subagent per task, two-stage review
2. **Inline Execution** - Execute tasks in this session with checkpoints

Which approach?
```

## Integration

- Uses **writing-plans** skill internally
- Output feeds **subagent-driven-development** or **executing-plans**
- Part of core workflow: brainstorm → plan → execute → review
