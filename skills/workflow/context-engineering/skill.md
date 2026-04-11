---
name: context-engineering
description: Use when project context grows large or AI performance degrades - maintains structured, size-optimized project artifacts
---

# Context Engineering

## Overview

As context windows fill, AI performance degrades. Context engineering maintains structured, size-optimized project artifacts to keep AI performance high.

**Core principle:** Size-optimized context = maintained AI performance.

## The Context Rot Problem

**Symptoms:**
- Responses become slower
- Quality of suggestions degrades
- Agent starts missing obvious patterns
- "Forgetting" things mentioned earlier

**Cause:** Context window fills with irrelevant history, pushing out critical project context.

## Context Engineering Solutions

### 1. Structured Project Artifacts

Maintain these files in `.planning/` or `docs/planning/`:

```
.planning/
├── README.md              # Project overview, tech stack
├── requirements.md        # Functional requirements
├── architecture.md        # System design
├── decisions.md           # Key decisions with rationale
├── roadmap.md             # Milestones and phases
└── current-phase.md       # Active phase details
```

### 2. Size-Optimized Documents

**Keep each document focused:**
- README: 1-2 pages
- Requirements: 2-3 pages
- Architecture: 3-5 pages
- Decisions: 1 page per major decision

**Use links, not duplication:**
```markdown
# Good
See [Authentication Architecture](./architecture.md#authentication)

# Bad
Authentication is implemented using JWT tokens...
[50 lines of duplicated content]
```

### 3. Current Context Window

Maintain a `.planning/current-context.md` that fits within a small context window:

```markdown
# Current Context

## Active Tasks
- [ ] Task 1: Description
- [ ] Task 2: Description

## Current File
- Working on: `src/components/Button.tsx`
- Lines: 45-89

## Recent Decisions
1. Use React Context for state (not Redux)

## Blockers
- None
```

### 4. Reference Summaries

For large external documents, create summaries:

```markdown
# API Reference Summary

Original: `docs/api-full.md` (150 pages)

## Key Endpoints

### GET /users
- Returns: List of users
- Auth: Required
- Rate limit: 100/min

[... summary of most important endpoints ...]

## Full Reference
See [Full API Documentation](./api-full.md)
```

## Context Loading Strategy

### Before Starting Work

1. **Load project overview** (always)
   - `.planning/README.md`
   - `.planning/current-phase.md`

2. **Load relevant domain** (as needed)
   - `.planning/architecture.md` (relevant sections)
   - `.planning/decisions.md` (relevant decisions)

3. **Load current context** (always)
   - `.planning/current-context.md`

### During Work

1. **Update current-context.md** frequently
2. **Reference external docs** via summaries, not full docs
3. **Offload to planning docs** instead of keeping in context

### When Context Grows Large

1. **Summarize current work** to current-context.md
2. **Offload details** to appropriate planning docs
3. **Reload fresh** with just essential context

## Anti-Patterns

### Bad: Everything in Context
```
[50 files of code]
[Full API documentation]
[Complete test output]
[Entire architecture doc]
[... too much ...]
```

### Good: Curated Context
```
[current-context.md - 1 page]
[RELEVANT code file - 50 lines]
[API summary - 10 endpoints]
[Architecture section - relevant component]
```

## Metrics

**Good context hygiene:**
- Context window: < 50% full
- Planning docs: < 5 pages each
- Current context: < 1 page
- Load time: < 10 seconds

**Bad context hygiene:**
- Context window: > 80% full
- Documents: > 10 pages
- Load time: > 30 seconds

## Summary

1. **Maintain planning docs** - Structured, size-optimized
2. **Keep current context** - Small, frequently updated
3. **Reference summaries** - Not full documents
4. **Curate context** - Load only what's needed
5. **Monitor metrics** - Keep context window healthy
