---
name: new-project
description: Initialize a new project with proper structure and initial planning
---

# /new-project Command

## Usage

```
/new-project [project-name]
```

## Description

Initializes a new project with:
1. Directory structure
2. Git repository
3. Initial planning documents
4. Basic configuration

## Process

### 1. Create Project Directory

```bash
mkdir -p [project-name]
cd [project-name]
```

### 2. Initialize Git

```bash
git init
git commit --allow-empty -m "Initial commit"
```

### 3. Create Directory Structure

```
.
├── docs/
│   ├── planning/
│   │   ├── README.md
│   │   ├── requirements.md
│   │   └── architecture.md
│   └── specs/
├── src/
├── tests/
├── .worktrees/ (gitignored)
└── .gitignore
```

### 4. Create Initial Planning Documents

**docs/planning/README.md:**
```markdown
# [Project Name]

## Overview
Brief description of the project.

## Tech Stack
- Language: 
- Framework: 
- Testing: 
- Deployment: 

## Goals
1. 
2. 
3. 

## Architecture
See [architecture.md](./architecture.md)
```

### 5. Commit Initial Structure

```bash
git add .
git commit -m "chore: Initial project structure"
```

## Output

```
✓ Created project directory: [project-name]
✓ Initialized git repository
✓ Created project structure
✓ Created initial planning documents
✓ Committed initial structure

Next steps:
1. Update docs/planning/README.md with project details
2. Run /plan to create implementation plan
```

## Integration

Used at the start of new projects before /plan and /execute.
