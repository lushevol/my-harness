---
name: subagent-driven-development
description: Use when executing implementation plans with independent tasks in the current session
---

# Subagent-Driven Development

## Overview

Execute plan by dispatching fresh subagent per task, with two-stage review after each: spec compliance first, then code quality review.

**Why subagents:** You delegate tasks to specialized agents with isolated context. By precisely crafting their instructions and context, you ensure they stay focused and succeed at their task. They should never inherit your session's context or history.

**Core principle:** Fresh subagent per task + two-stage review (spec then quality) = high quality, fast iteration

## The Process

### Step 1: Load and Review Plan

1. Read plan file
2. Review critically - identify any questions or concerns
3. If concerns: Raise them with your human partner before starting
4. If no concerns: Create TodoWrite and proceed

### Step 2: Execute Tasks

For each task:
1. Mark as in_progress
2. Follow each step exactly
3. Run verifications as specified
4. Mark as completed

### Step 3: Complete Development

After all tasks complete and verified:
- Use finishing-a-development-branch skill to complete work

## Two-Stage Review Process

### Stage 1: Spec Compliance Review

After implementer completes:
- Dispatch spec reviewer subagent
- Verify code matches plan requirements
- Check for missing requirements or extra unrequested features
- If issues found: implementer fixes, re-review

### Stage 2: Code Quality Review

After spec compliance passes:
- Dispatch code quality reviewer subagent
- Check code quality, patterns, edge cases
- If issues found: implementer fixes, re-review

## Model Selection

Use the least powerful model that can handle each role:

- **Mechanical implementation tasks** (isolated functions, clear specs): use fast, cheap model
- **Integration and judgment tasks** (multi-file coordination): use standard model
- **Architecture, design, and review tasks**: use most capable available model

## Handling Implementer Status

Implementer subagents report one of four statuses:

**DONE:** Proceed to spec compliance review.

**DONE_WITH_CONCERNS:** Read concerns before proceeding. If about correctness or scope, address before review.

**NEEDS_CONTEXT:** Provide missing context and re-dispatch.

**BLOCKED:** Assess the blocker:
1. Context problem → provide more context, re-dispatch
2. Needs more reasoning → re-dispatch with more capable model
3. Task too large → break into smaller pieces
4. Plan itself wrong → escalate to human

## Red Flags

**Never:**
- Start implementation on main/master branch without explicit user consent
- Skip reviews (spec compliance OR code quality)
- Proceed with unfixed issues
- Dispatch multiple implementation subagents in parallel (conflicts)
- Make subagent read plan file (provide full text instead)
- Skip scene-setting context
- Ignore subagent questions
- Accept "close enough" on spec compliance
- Skip review loops
- Start code quality review before spec compliance is ✅
- Move to next task while either review has open issues

**If reviewer finds issues:**
- Implementer (same subagent) fixes them
- Reviewer reviews again
- Repeat until approved
- Don't skip the re-review

## Integration

**Required workflow skills:**
- using-git-worktrees - Set up isolated workspace before starting
- writing-plans - Creates the plan this skill executes
- finishing-a-development-branch - Complete development after all tasks

**Subagents should use:**
- test-driven-development - Subagents follow TDD for each task
