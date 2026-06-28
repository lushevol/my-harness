#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
# update-all.sh — Pull latest for every git repo in this folder
# ─────────────────────────────────────────────────────────────

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

REPOS=()
for item in */; do
  dir="${item%/}"  # strip trailing /
  git_dir="$ROOT/$dir/.git"
  if [ -d "$git_dir" ] || [ -f "$git_dir" ]; then
    REPOS+=("$dir")
  fi
done

if [ ${#REPOS[@]} -eq 0 ]; then
  echo "No git repositories found in $ROOT"
  exit 0
fi

echo "Found ${#REPOS[@]} git repo(s) to update:"
printf "  • %s\n" "${REPOS[@]}"
echo ""

UPDATED=0
SKIPPED=0
ERRORS=0

for dir in "${REPOS[@]}"; do
  echo "──────────────────────────────────────────────"
  echo "→ $dir"
  echo "──────────────────────────────────────────────"

  cd "$ROOT/$dir"

  # Check for unstaged/untracked files and stash if dirty
  if ! git diff --quiet HEAD 2>/dev/null; then
    echo "  ⚠  Uncommitted changes — stashing"
    git stash push --include-untracked --message "auto-stash before update-all" 2>&1 | sed 's/^/  /'
  fi

  # Determine default branch
  default_branch="$(git remote show origin 2>/dev/null | sed -n '/HEAD branch/s/.*: //p' || true)"
  if [ -z "$default_branch" ]; then
    # Fallback: try main, then master
    if git show-ref --verify --quiet refs/heads/main; then
      default_branch="main"
    elif git show-ref --verify --quiet refs/heads/master; then
      default_branch="master"
    else
      echo "  ✗ Could not determine default branch — skipping"
      ((SKIPPED++)) || true
      continue
    fi
  fi

  echo "  Branch: $default_branch"
  git checkout "$default_branch" 2>&1 | sed 's/^/  /'

  # Fetch and pull
  echo "  Fetching origin..."
  git fetch origin 2>&1 | sed 's/^/  /'

  # Check if there's anything to pull (fast-forward check)
  behind_count="$(git rev-list --count "HEAD..origin/$default_branch" 2>/dev/null || echo 0)"
  if [ "$behind_count" -gt 0 ]; then
    echo "  Behind by $behind_count commit(s) — pulling..."
    git pull --ff-only origin "$default_branch" 2>&1 | sed 's/^/  /'
    echo "  ✅ Updated to $(git rev-parse --short HEAD)"
    ((UPDATED++)) || true
  else
    echo "  ✓ Already up to date"
    ((SKIPPED++)) || true
  fi
done

echo ""
echo "══════════════════════════════════════════════"
echo "Done: $UPDATED updated, $SKIPPED up-to-date, $ERRORS errors"
echo "══════════════════════════════════════════════"
