#!/usr/bin/env node

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");

function run(cmd, options = {}) {
  execSync(cmd, {
    cwd: ROOT,
    stdio: "inherit",
    ...options,
  });
}

function listSubmodulePaths() {
  const gitmodules = path.join(ROOT, ".gitmodules");
  if (!fs.existsSync(gitmodules)) {
    return [];
  }

  const output = execSync("git config -f .gitmodules --get-regexp '^submodule\\..*\\.path$'", {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();

  if (!output) {
    return [];
  }

  return output
    .split("\n")
    .map((line) => line.split(/\s+/)[1])
    .filter(Boolean);
}

function capture(cmd, options = {}) {
  return execSync(cmd, {
    cwd: ROOT,
    encoding: "utf8",
    ...options,
  }).trim();
}

function repoHasGitDir(dir) {
  const gitDir = path.join(ROOT, dir, ".git");
  return fs.existsSync(gitDir) && (fs.statSync(gitDir).isDirectory() || fs.statSync(gitDir).isFile());
}

function getDefaultBranch(repoDir) {
  try {
    const headBranch = capture("git remote show origin", { cwd: path.join(ROOT, repoDir) })
      .split("\n")
      .find((line) => line.includes("HEAD branch:"));
    if (headBranch) {
      return headBranch.split(":").pop().trim();
    }
  } catch {
    // Fall through to local branch detection.
  }

  if (fs.existsSync(path.join(ROOT, repoDir, ".git"))) {
    try {
      capture("git show-ref --verify --quiet refs/heads/main", { cwd: path.join(ROOT, repoDir) });
      return "main";
    } catch {}
    try {
      capture("git show-ref --verify --quiet refs/heads/master", { cwd: path.join(ROOT, repoDir) });
      return "master";
    } catch {}
  }

  return "";
}

function updateAll() {
  const repos = fs
    .readdirSync(path.join(ROOT, "refers"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && repoHasGitDir(path.join("refers", entry.name)))
    .map((entry) => path.join("refers", entry.name));

  if (repos.length === 0) {
    console.log(`No git repositories found in ${path.join(ROOT, "refers")}`);
    return;
  }

  console.log(`Found ${repos.length} git repo(s) to update:`);
  for (const repo of repos) {
    console.log(`  • ${repo}`);
  }
  console.log("");

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const repo of repos) {
    console.log("──────────────────────────────────────────────");
    console.log(`→ ${repo}`);
    console.log("──────────────────────────────────────────────");

    try {
      const repoPath = path.join(ROOT, repo);
      const dirty = execSync("git diff --quiet HEAD", { cwd: repoPath, stdio: "ignore" });
      void dirty;
    } catch {
      console.log("  ⚠  Uncommitted changes — stashing");
      run(`git stash push --include-untracked --message "auto-stash before update-all"`, { cwd: path.join(ROOT, repo) });
    }

    const defaultBranch = getDefaultBranch(repo);
    if (!defaultBranch) {
      console.log("  ✗ Could not determine default branch — skipping");
      skipped += 1;
      continue;
    }

    console.log(`  Branch: ${defaultBranch}`);
    run(`git checkout ${defaultBranch}`, { cwd: path.join(ROOT, repo) });

    console.log("  Fetching origin...");
    run("git fetch origin", { cwd: path.join(ROOT, repo) });

    let behindCount = 0;
    try {
      behindCount = Number(capture(`git rev-list --count HEAD..origin/${defaultBranch}`, { cwd: path.join(ROOT, repo) })) || 0;
    } catch {
      behindCount = 0;
    }

    if (behindCount > 0) {
      console.log(`  Behind by ${behindCount} commit(s) — pulling...`);
      run(`git pull --ff-only origin ${defaultBranch}`, { cwd: path.join(ROOT, repo) });
      console.log(`  ✅ Updated to ${capture("git rev-parse --short HEAD", { cwd: path.join(ROOT, repo) })}`);
      updated += 1;
    } else {
      console.log("  ✓ Already up to date");
      skipped += 1;
    }
  }

  console.log("");
  console.log("══════════════════════════════════════════════");
  console.log(`Done: ${updated} updated, ${skipped} up-to-date, ${errors} errors`);
  console.log("══════════════════════════════════════════════");
}

function usage() {
  console.log("Usage: node scripts/submodules.js <status|sync|update|update-all|foreach|list> [args...]");
  process.exit(1);
}

const command = process.argv[2];
if (!command) usage();

switch (command) {
  case "status":
    run("git submodule status --recursive");
    break;
  case "sync":
    run("git submodule sync --recursive");
    break;
  case "update":
    run("git submodule update --init --recursive");
    break;
  case "update-all":
    updateAll();
    break;
  case "foreach":
    run("git submodule foreach --recursive \"git status --short --branch\"");
    break;
  case "list":
    console.log(listSubmodulePaths().join("\n"));
    break;
  default:
    usage();
}
