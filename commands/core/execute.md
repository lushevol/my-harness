---
name: execute
description: Execute implementation plan using subagent-driven development
---

# /execute Command

## Usage

```
/execute [plan-file]
```

## Description

Executes implementation plan using subagent-driven development:
1. Load plan from file or docs/planning/implementation-plan.md
2. Create todo list from tasks
3. For each task: dispatch implementer, review, mark complete
4. Final review of entire implementation

## Process

### 1. Load Plan

```bash
# If plan file provided
cat [plan-file]

# Default location
cat docs/planning/implementation-plan.md
```

If plan not found:
```
No implementation plan found.

Options:
1. Specify plan file: /execute path/to/plan.md
2. Create plan first: /plan
```

### 2. Extract Tasks

Read plan and extract:
- Task names
- File paths (create/modify/test)
- Step details
- Verification commands

### 3. Create TodoWrite

```markdown
- [ ] Task 1: [Name]
- [ ] Task 2: [Name]
- [ ] Task 3: [Name]
...
```

### 4. Execute Tasks

For each task:

#### 4.1 Mark In Progress
```markdown
- [x] Task N-1: [Name]
- [/] Task N: [Name]  <- current
- [ ] Task N+1: [Name]
```

#### 4.2 Dispatch Implementer Subagent

Use subagent-driven-development skill with:
- Task text from plan
- Context from previous tasks
- Clear instructions

#### 4.3 Wait for Completion

Implementer returns status:
- **DONE** → Proceed to review
- **DONE_WITH_CONCERNS** → Review concerns
- **NEEDS_CONTEXT** → Provide context, re-dispatch
- **BLOCKED** → Assess and resolve

#### 4.4 Spec Compliance Review

Dispatch spec-reviewer subagent:
- Did implementer follow plan?
- Are all requirements met?
- Any missing pieces?
- Any unrequested additions?

If issues found: implementer fixes, re-review

#### 4.5 Code Quality Review

Dispatch quality-reviewer subagent:
- Code follows best practices?
- Proper error handling?
- Edge cases covered?
- Tests adequate?

If issues found: implementer fixes, re-review

#### 4.6 Mark Complete

```markdown
- [x] Task N-1: [Name]
- [x] Task N: [Name]  <- complete
- [ ] Task N+1: [Name]
```

### 5. Final Review

After all tasks complete:

#### 5.1 Full Test Suite
```bash
npm test  # or: pytest, cargo test, go test ./...
```

#### 5.2 Final Code Review
Dispatch final reviewer for entire implementation:
- Overall architecture
- Integration between components
- Consistency across codebase

#### 5.3 Completion Report

```
Implementation Complete
======================

Tasks completed: N
Tests passing: X/Y
Code review: Passed

Next steps:
1. /verify - Run final verification
2. /complete - Merge/PR/Discard
```

## Options

### Execution Mode

```
/execute --mode=subagent  # Default: fresh subagent per task
/execute --mode=inline    # Inline execution with checkpoints
```

### Start From Task

```
/execute --from=3  # Start from Task 3 (for resuming)
```

## Integration

**Required skills:**
- subagent-driven-development - Core execution pattern
- test-driven-development - Subagents follow TDD
- verification-before-completion - Verify after all tasks

**Related commands:**
- /plan - Creates the plan this executes
- /verify - Verifies implementation after execution
- /complete - Finishes branch after verification
