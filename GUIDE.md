# Minimal Harness - Installation & Usage Guide

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Core Workflow](#core-workflow)
4. [Detailed Usage](#detailed-usage)
5. [Examples](#examples)
6. [Troubleshooting](#troubleshooting)

---

## Installation

### Prerequisites

- Claude Code installed and configured
- Git installed
- Node.js (optional, for hook scripts)

### Step 1: Copy Plugin to Harness Directory

```bash
# Option A: Copy to Claude Code plugins (recommended)
cp -r minimal-harness ~/.claude/plugins/

# Option B: Copy to custom location
cp -r minimal-harness /path/to/your/harness/plugins/
```

### Step 2: Verify Installation

```bash
# Check plugin structure
ls -la ~/.claude/plugins/minimal-harness/

# Expected output:
# README.md
# CLAUDE.md
# GUIDE.md (this file)
# package.json
# skills/
# hooks/
# commands/
# agents/
# rules/
```

### Step 3: Start Claude Code

```bash
# Start a new Claude Code session
claude

# Or navigate to your project directory first
cd /path/to/your/project
claude
```

### Step 4: Verify Plugin Loaded

In Claude Code, run:

```
/help
```

You should see minimal harness commands available.

---

## Quick Start

### 5-Minute Quick Start

```bash
# 1. Start Claude Code in your project directory
claude

# 2. Initialize a new project (or skip if existing)
/new-project my-app

# 3. Create an implementation plan
/plan

# 4. Execute the plan
/execute

# 5. Verify the implementation
/verify

# 6. Complete the work (merge/PR)
/complete
```

---

## Core Workflow

The minimal harness follows a **6-step development workflow**:

```
┌─────────────────────────────────────────────────────────┐
│                    DEVELOPMENT WORKFLOW                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. NEW-PROJECT                                          │
│     └─> Initialize project structure                    │
│                                                         │
│  2. PLAN                                                 │
│     └─> Create implementation plan                      │
│        - Break into bite-sized tasks                   │
│        - Define exact file paths                       │
│        - Include verification steps                    │
│                                                         │
│  3. EXECUTE                                              │
│     └─> Execute plan with subagents                   │
│        - Fresh subagent per task                     │
│        - Two-stage review (spec + quality)             │
│        - Atomic commits                                │
│                                                         │
│  4. VERIFY                                               │
│     └─> Verify implementation                          │
│        - All tests pass                                │
│        - Lint/type checks pass                         │
│        - Requirements met                            │
│                                                         │
│  5. COMPLETE                                             │
│     └─> Finish branch                                  │
│        - Merge locally                                 │
│        - Create PR                                     │
│        - Or discard                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Detailed Usage

### 1. /new-project

**Purpose:** Initialize a new project with proper structure

**Usage:**
```
/new-project [project-name]
```

**Example:**
```
/new-project my-web-app
```

**What it does:**
- Creates project directory
- Initializes git repository
- Creates `.planning/` directory structure
- Creates initial planning documents
- Creates `.worktrees/` directory (gitignored)
- Creates basic `.gitignore`

**Output:**
```
✓ Created project directory: my-web-app
✓ Initialized git repository
✓ Created project structure
✓ Created initial planning documents
✓ Committed initial structure

Next steps:
1. Update docs/planning/README.md with project details
2. Run /plan to create implementation plan
```

---

### 2. /plan

**Purpose:** Create implementation plan from spec or requirements

**Usage:**
```
/plan [spec-file]
```

**Examples:**
```
/plan                          # Use interactive mode
/plan docs/specs/auth.md       # Use spec file
/plan docs/requirements.md    # Use requirements
```

**What it does:**
- Reads spec/requirements (or asks user)
- Analyzes scope and dependencies
- Breaks work into bite-sized tasks (2-5 min each)
- Defines exact file paths
- Includes verification steps
- Saves to `docs/planning/implementation-plan.md`

**Output:**
```
✓ Read spec: docs/specs/auth.md
✓ Analyzed scope: 3 components, 12 tasks
✓ Created implementation plan
✓ Saved to docs/planning/implementation-plan.md
✓ Committed plan

Plan Summary:
- Tasks: 12
- Estimated time: 60 minutes
- Components: Authentication, API, Tests

Next steps:
1. Review plan: cat docs/planning/implementation-plan.md
2. Run /execute to start implementation
```

---

### 3. /execute

**Purpose:** Execute implementation plan using subagent-driven development

**Usage:**
```
/execute [plan-file]
```

**Examples:**
```
/execute                          # Use default plan
/execute docs/planning/impl-v2.md # Use specific plan
```

**What it does:**
- Loads plan
- Creates todo list from tasks
- For each task:
  1. Dispatches implementer subagent
  2. Waits for completion
  3. Runs spec compliance review
  4. Runs code quality review
  5. Marks task complete
- Runs final review

**Output:**
```
✓ Loaded plan: 12 tasks
✓ Created todo list

Task 1/12: Setup authentication module
  ✓ Implementer: DONE
  ✓ Spec review: PASSED
  ✓ Quality review: PASSED (1 minor suggestion)
  ✓ Committed: 2 commits

Task 2/12: Create user model
  ✓ Implementer: DONE
  ✓ Spec review: PASSED
  ✓ Quality review: PASSED
  ✓ Committed: 1 commit

...

Task 12/12: Add integration tests
  ✓ Implementer: DONE
  ✓ Spec review: PASSED
  ✓ Quality review: PASSED
  ✓ Committed: 2 commits

✓ All tasks complete
✓ Final review: PASSED
✓ 12 commits total

Next steps:
1. Run /verify for final verification
2. Run /complete to merge/PR
```

---

### 4. /verify

**Purpose:** Verify implementation before claiming complete

**Usage:**
```
/verify
```

**What it does:**
- Runs full test suite
- Runs lint/type checks
- Runs manual verification steps
- Checks requirements checklist

**Output (Success):**
```
✓ Verification Complete
======================

✓ Tests: All pass (34 tests)
✓ Lint/Type: Clean
✓ Manual verification: Passed
✓ Requirements: All met

Ready for completion.
Use /complete to merge/PR/discard.
```

**Output (Failure):**
```
✗ Verification Failed
=====================

✗ Tests: 2 failures
  - test_auth.py::test_login: AssertionError
  - test_api.py::test_endpoint: Timeout

✓ Lint/Type: Clean
⚠ Manual verification: Partial (see notes)
✓ Requirements: All met

Fix issues and re-run /verify.
```

---

### 5. /complete

**Purpose:** Finish development branch

**Usage:**
```
/complete
```

**What it does:**
1. Verifies tests pass
2. Determines base branch
3. Presents options:
   - Merge locally
   - Create PR
   - Keep as-is
   - Discard
4. Executes chosen option
5. Cleans up worktree (if applicable)

**Output:**
```
Implementation complete. What would you like to do?

1. Merge back to main locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)
4. Discard this work

Which option? 2

Pushing branch...
Creating PR...
✓ Created PR #42: https://github.com/user/repo/pull/42
✓ Worktree cleaned up

Next: Review and merge PR #42
```

---

## Examples

### Example 1: New Web Application

```bash
# Start Claude Code
claude

# Create new project
/new-project my-web-app

# Navigate to project
cd my-web-app

# Create plan for authentication feature
/plan

# [Interactive: describe auth requirements]

# Execute plan
/execute

# Verify implementation
/verify

# Create PR
/complete
```

### Example 2: Bug Fix in Existing Project

```bash
# Navigate to existing project
cd existing-project

# Start Claude Code
claude

# Debug issue
/debug

# [Interactive: describe symptoms]

# [Systematic debugging process]

# Write fix with TDD
# [TDD cycle: test → fail → fix → pass → refactor]

# Verify fix
/verify

# Complete
/complete
```

### Example 3: Refactoring

```bash
# Start in project directory
claude

# Create refactoring plan
/plan

# [Interactive: describe refactoring goals]

# Plan includes:
# - Step-by-step refactoring tasks
# - Test preservation
# - Verification steps

# Execute plan
/execute

# Verify all tests pass
/verify

# Complete
/complete
```

---

## Troubleshooting

### Issue: Commands not recognized

**Solution:**
```bash
# Verify plugin is in correct location
ls ~/.claude/plugins/minimal-harness/

# If not found, reinstall:
cp -r /path/to/minimal-harness ~/.claude/plugins/

# Restart Claude Code
```

### Issue: /plan creates empty plan

**Solution:**
```bash
# Ensure you're in a project directory with .planning/ folder
ls .planning/

# If missing, initialize project first:
/new-project my-app
```

### Issue: /execute fails immediately

**Solution:**
```bash
# Check if plan file exists:
cat docs/planning/implementation-plan.md

# If missing, create plan first:
/plan
```

### Issue: Worktree creation fails

**Solution:**
```bash
# Check if .worktrees is gitignored:
git check-ignore .worktrees

# If not ignored, add to .gitignore:
echo ".worktrees/" >> .gitignore
git add .gitignore
git commit -m "chore: gitignore worktrees"
```

### Issue: Subagent execution times out

**Solution:**
- Break task into smaller pieces
- Ensure clear instructions in plan
- Check if model has sufficient context

### Issue: Verification fails on first run

**Solution:**
```bash
# Check test failures:
npm test  # or pytest, cargo test, etc.

# Fix failures
# Re-run verification:
/verify
```

---

## Tips & Best Practices

### 1. Always Start with /new-project

```bash
/new-project my-project
```

This creates proper structure and planning documents.

### 2. Review Plan Before Executing

```bash
/plan
# Review: cat docs/planning/implementation-plan.md
/execute
```

Catching issues in planning saves time.

### 3. Use Checkpoints for Long Tasks

```bash
/plan
/execute  # Task 1-5 complete
/checkpoint
/execute  # Task 6-10 complete
/checkpoint
```

Preserves progress if session ends.

### 4. Verify Before Completing

```bash
/execute
/verify   # Don't skip this!
/complete
```

Catches issues before merge/PR.

### 5. Use Worktrees for Isolation

```bash
/worktree  # Creates isolated workspace
/plan
/execute
/complete  # Auto-cleans worktree
```

Keeps main branch clean.

---

## Next Steps

### Learn More

- Read `README.md` for overview
- Read `CLAUDE.md` for configuration
- Explore individual skill documents in `skills/`

### Customize

1. Edit `CLAUDE.md` for your preferences
2. Modify skills for your workflow
3. Add project-specific rules in `rules/`

### Extend

1. Add remaining skills from splice analysis
2. Create additional agent prompts
3. Implement hook scripts
4. Add more commands

---

## Support

For issues or questions:

1. Check **Troubleshooting** section above
2. Review documentation in `README.md` and `CLAUDE.md`
3. Check individual skill/command docs
4. Review source plugins for original context

---

**Happy coding with Minimal Harness! 🚀**
