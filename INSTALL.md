# Installation Guide

## Minimal Harness - Installation

## Quick Install (Recommended)

### Step 1: Copy Plugin to Harness Directory

```bash
# Clone or copy the minimal-harness directory
cp -r minimal-harness ~/.claude/plugins/

# Or if using a different location
cp -r minimal-harness /path/to/your/harness/plugins/
```

### Step 2: Verify Structure

```bash
ls -la ~/.claude/plugins/minimal-harness/

# Should see:
# README.md
# CLAUDE.md
# package.json
# skills/
# hooks/
# commands/
# agents/
# rules/
```

### Step 3: Configure (Optional)

Edit `CLAUDE.md` to customize for your workflow:

```bash
# Open CLAUDE.md and customize
vim ~/.claude/plugins/minimal-harness/CLAUDE.md
```

### Step 4: Verify Installation

Start a new Claude Code session and run:

```
/help
```

You should see minimal harness commands available.

## Manual Installation

### For Custom Harness Systems

If you're not using Claude Code's standard plugin directory:

1. **Copy files to your harness location:**
   ```bash
   cp -r minimal-harness/* /your/harness/path/
   ```

2. **Load skills in your harness config:**
   ```json
   {
     "skills": [
       "minimal-harness/skills/core/test-driven-development",
       "minimal-harness/skills/core/systematic-debugging",
       "minimal-harness/skills/core/using-git-worktrees",
       "minimal-harness/skills/core/writing-plans",
       "minimal-harness/skills/core/subagent-driven-development",
       "minimal-harness/skills/core/verification-before-completion",
       "minimal-harness/skills/core/brainstorming",
       "minimal-harness/skills/workflow/context-engineering"
     ]
   }
   ```

3. **Register commands:**
   ```json
   {
     "commands": [
       "minimal-harness/commands/core/new-project",
       "minimal-harness/commands/core/plan",
       "minimal-harness/commands/core/execute",
       "minimal-harness/commands/core/verify"
     ]
   }
   ```

4. **Configure hooks:**
   ```json
   {
     "hooks": "minimal-harness/hooks/hooks.json"
   }
   ```

## Testing Installation

### Test 1: Basic Commands

```
/new-project test-project
```

Expected: Creates directory structure, initializes git, creates planning docs.

### Test 2: Skills Available

```
Use test-driven-development skill
```

Expected: Loads TDD skill with Iron Law principles.

### Test 3: Plan Creation

```
/plan
```

Expected: Guides through plan creation or loads existing plan.

## Troubleshooting

### Issue: Commands not found

**Solution:** Verify plugin is in correct directory

```bash
# For Claude Code
ls ~/.claude/plugins/minimal-harness/

# If not found, copy again
cp -r minimal-harness ~/.claude/plugins/
```

### Issue: Skills not loading

**Solution:** Check file paths in config

```bash
# Verify skill files exist
ls ~/.claude/plugins/minimal-harness/skills/core/
```

### Issue: Hooks not working

**Solution:** Verify hooks.json syntax

```bash
# Validate JSON
node -e "JSON.parse(require('fs').readFileSync('hooks/hooks.json'))"
```

## Updating

### To update minimal harness:

```bash
# Backup current
cp -r ~/.claude/plugins/minimal-harness ~/.claude/plugins/minimal-harness-backup

# Copy new version
cp -r minimal-harness ~/.claude/plugins/
```

## Uninstalling

```bash
# Remove plugin directory
rm -rf ~/.claude/plugins/minimal-harness

# Or move to backup
mv ~/.claude/plugins/minimal-harness ~/.claude/plugins/minimal-harness-inactive
```

## Next Steps

After installation:

1. **Read the docs:**
   - `README.md` - Overview
   - `CLAUDE.md` - Configuration
   - Individual skill/command docs

2. **Try the workflow:**
   ```
   /new-project my-test
   /plan
   /execute
   /verify
   /complete
   ```

3. **Customize:**
   - Edit `CLAUDE.md` for your preferences
   - Modify skills for your workflow
   - Add project-specific rules

## Support

For issues or questions:
1. Check Troubleshooting section above
2. Review documentation in `README.md` and `CLAUDE.md`
3. Check individual skill/command docs
