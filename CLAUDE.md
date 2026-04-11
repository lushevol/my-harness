# Minimal Harness Configuration

## Overview

This is a minimal spliced harness combining the best of 5 plugins into essential components.

**15 Skills | 7 Hooks | 15 Commands | 6 Agents**

## Quick Start

```bash
# Initialize new project
/new-project my-app

# Create implementation plan
/plan

# Execute plan
/execute

# Verify and complete
/verify
/complete
```

## Core Workflow

```
/new-project → /plan → /execute → /verify → /complete
```

## Essential Commands

### Core (7)
- `/new-project` - Initialize project structure
- `/plan` - Create implementation plan
- `/execute` - Execute plan with subagents
- `/review` - Request code review
- `/debug` - Systematic debugging
- `/verify` - Verify implementation
- `/complete` - Finish branch

### Workflow (4)
- `/worktree` - Create/manage worktrees
- `/checkpoint` - Save progress
- `/status` - Show current state
- `/context` - Manage context

### Utility (4)
- `/browser` - Browser automation
- `/security` - Security audit
- `/cost` - Cost tracking
- `/help` - Show help

## Essential Skills

### Core Development (7)
1. **test-driven-development** - Iron Law TDD
2. **systematic-debugging** - 4-phase debugging
3. **using-git-worktrees** - Isolated workspaces
4. **writing-plans** - Bite-sized tasks
5. **subagent-driven-development** - Fresh agent per task
6. **verification-before-completion** - Evidence required
7. **brainstorming** - Design approval gates

### Workflow (3)
8. **context-engineering** - Prevent context rot
9. **phase-management** - Structured workflow
10. **wave-based-execution** - Parallel atomic tasks

### Velocity (2)
11. **browser-automation** - Persistent browser daemon
12. **persistence-loops** - Guaranteed completion

### Scale (3)
13. **security-auditing** - AgentShield
14. **cost-optimization** - 60%+ token reduction
15. **dispatching-parallel-agents** - Parallel debugging

## Essential Hooks

### Pre-Tool
- `cost-check.js` - Prevent budget overruns
- `security-scan.js` - Block secrets

### Post-Tool
- `cost-track.js` - Accumulate usage
- `auto-format.js` - Format code

### Session
- `load-context.js` - Load project state
- `save-state.js` - Persist session data

### Git
- `run-tests.js` - Prevent broken commits

## Essential Agents

1. **Implementer** - Execute tasks
2. **Spec Reviewer** - Verify spec compliance
3. **Quality Reviewer** - Code quality review
4. **Planner** - Create plans
5. **Researcher** - Gather information
6. **Coordinator** - Orchestrate agents

## Configuration

Edit `package.json` or create `.minimal-harness.json`:

```json
{
  "harness": {
    "mode": "expert",
    "language": "en",
    "strict_tdd": true,
    "verification_required": true,
    "two_stage_review": true
  }
}
```

## Philosophy

**Minimal spliced harness** - 95% of value with 10% of complexity.

From 5 plugins (200+ skills, 200+ commands, 38+ agents) → 15 skills, 15 commands, 6 agents.

**Strict discipline** (superpowers) + **broad coverage** (ECC) + **context engineering** (GSD) + **velocity tools** (gstack) + **accessibility** (OMC).
