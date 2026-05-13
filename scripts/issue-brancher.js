#!/usr/bin/env node
// Reads open GitHub issues and creates a ready-to-work branch for each one that doesn't have one yet.
// Each branch gets a dev-notes file seeded with the issue title, body, and labels.

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function run(cmd, cwd = ROOT) {
  return execSync(cmd, { cwd, encoding: "utf8", stdio: "pipe" }).trim();
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

async function main() {
  console.log("Fetching open issues...\n");

  const raw = run("gh issue list --state open --json number,title,body,labels --limit 25");
  const issues = JSON.parse(raw);

  if (issues.length === 0) {
    console.log("No open issues found. Create some issues first then re-run.");
    return;
  }

  const remoteBranches = run("git branch -r");
  const originalBranch = run("git branch --show-current");

  let created = 0;
  let skipped = 0;

  for (const issue of issues) {
    const branch = `issue-${issue.number}/${slugify(issue.title)}`;

    if (remoteBranches.includes(branch)) {
      console.log(`  skip  #${issue.number} — branch already exists`);
      skipped++;
      continue;
    }

    console.log(`  open  #${issue.number}: ${issue.title}`);

    run("git checkout main");
    run("git pull origin main --quiet");
    run(`git checkout -b ${branch}`);

    // Seed a work-notes file so the branch has a real commit and useful context
    mkdirSync(resolve(ROOT, "dev-notes"), { recursive: true });
    const notesFile = resolve(ROOT, `dev-notes/issue-${issue.number}.md`);
    const labels = issue.labels.length
      ? issue.labels.map(l => `- ${l.name}`).join("\n")
      : "_none_";

    const content = [
      `# Issue #${issue.number}: ${issue.title}`,
      "",
      "## Description",
      issue.body?.trim() || "_No description provided._",
      "",
      "## Labels",
      labels,
      "",
      "## Implementation notes",
      "_Fill this in as you work._",
      "",
      "## Checklist",
      "- [ ] Understand the requirement",
      "- [ ] Implement the change",
      "- [ ] Test manually",
      "- [ ] Open PR",
    ].join("\n");

    writeFileSync(notesFile, content);

    run(`git add dev-notes/issue-${issue.number}.md`);
    run(`git commit -m ${JSON.stringify(`chore: scaffold branch for #${issue.number} — ${issue.title}`)}`);
    run(`git push origin ${branch}`);

    console.log(`         → pushed ${branch}`);
    created++;
  }

  // Return to where we started
  run(`git checkout ${originalBranch}`);

  console.log(`\nDone — ${created} branch(es) created, ${skipped} skipped.`);
  if (created > 0) {
    console.log("Pick a branch, implement the fix, then run: gh pr create");
  }
}

main().catch(err => {
  console.error("[issue-brancher]", err.message);
  process.exit(1);
});
