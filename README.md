# Minimal Harness

A spliced harness plugin combining the best of 5 plugins into 15 essential skills, 7 hooks, 15 commands, and 6 agents.

**Source Plugins:**
- superpowers (strict TDD discipline)
- everything-claude-code (broad coverage)
- get-shit-done (context engineering)
- gstack (velocity tools)
- oh-my-claudecode (accessibility)

## Installation

```bash
# Clone or copy to your harness directory
cd minimal-harness
npm run setup
```

## Core Workflow

```
/new-project → Initialize project structure
/plan        → Create implementation plan
/execute     → Execute plan with subagents
/verify      → Verify implementation
/complete    → Merge/PR/Discard
```

## Essential Skills (15)

**Legend:** (S) = superpowers | (E) = everything-claude-code | (G) = get-shit-done | (K) = gstack | (O) = oh-my-claudecode

### Core Development (7) - From (S) superpowers
1. **test-driven-development** (S) - Iron Law TDD
2. **systematic-debugging** (S) - 4-phase debugging
3. **using-git-worktrees** (S) - Isolated workspaces
4. **writing-plans** (S) - Bite-sized tasks
5. **subagent-driven-development** (S) - Fresh agent per task
6. **verification-before-completion** (S) - Evidence required
7. **brainstorming** (S) - Design approval gates

### Workflow (3) - From (G) get-shit-done
8. **context-engineering** (G) - Prevent context rot
9. **phase-management** (G) - Structured workflow
10. **wave-based-execution** (G) - Parallel atomic tasks

### Velocity (2) - From (K) gstack + (O) oh-my-claudecode
11. **browser-automation** (K) - Persistent browser daemon
12. **persistence-loops** (O) - Guaranteed completion

### Scale (3) - From (E) everything-claude-code + (S) superpowers
13. **security-auditing** (E) - AgentShield
14. **cost-optimization** (E) - 60%+ token reduction
15. **dispatching-parallel-agents** (S) - Parallel debugging

## Essential Commands (15)

### Core (7) - From (S) superpowers
- `/new-project` (S) - Initialize project
- `/plan` (S) - Create implementation plan
- `/execute` (S) - Execute plan
- `/review` (S) - Request code review
- `/debug` (S) - Systematic debugging
- `/verify` (S) - Verify implementation
- `/complete` (S) - Finish branch

### Workflow (4) - From (G) get-shit-done
- `/worktree` (G) - Create/manage worktrees
- `/checkpoint` (G) - Save progress
- `/status` (G) - Show current state
- `/context` (G) - Manage context

### Utility (4) - From (K) gstack + (E) everything-claude-code
- `/browser` (K) - Browser automation
- `/security` (E) - Security audit
- `/cost` (E) - Cost tracking
- `/help` (S) - Show help

## Essential Agents (6)

1. **Implementer** - Execute tasks
2. **Spec Reviewer** - Verify spec compliance
3. **Quality Reviewer** - Code quality review
4. **Planner** - Create plans
5. **Researcher** - Gather information
6. **Coordinator** - Orchestrate agents

## Essential Hooks (7)

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

## Quick Start

```bash
# 1. Start new project
/new-project my-app

# 2. Create plan
/plan

# 3. Execute plan
/execute

# 4. Verify
/verify

# 5. Complete
/complete
```

## Philosophy

This is a **minimal spliced harness** - 95% of value with 10% of complexity.

From 5 plugins, 200+ skills, 200+ commands, 38+ agents → 15 skills, 15 commands, 6 agents.

**Strict discipline** (superpowers) + **broad coverage** (ECC) + **context engineering** (GSD) + **velocity tools** (gstack) + **accessibility** (OMC).
