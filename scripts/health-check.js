#!/usr/bin/env node
// Scans src/ for real problems and opens a GitHub issue for each one found.
// Finds: empty files, TODO/FIXME comments, JSX components missing a default export.
// Skips issues that are already open to avoid duplicates.

import { execSync } from "child_process";
import { readdirSync, readFileSync, statSync } from "fs";
import { resolve, dirname, extname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC  = resolve(ROOT, "src");

function run(cmd, cwd = ROOT) {
  return execSync(cmd, { cwd, encoding: "utf8", stdio: "pipe" }).trim();
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function ensureLabel(name, color, description) {
  try {
    run(`gh label create ${JSON.stringify(name)} --color ${color} --description ${JSON.stringify(description)} 2>/dev/null`);
  } catch {
    // label already exists — that's fine
  }
}

async function main() {
  console.log("Running codebase health check...\n");

  // Make sure the labels we use actually exist in the repo
  ensureLabel("technical-debt", "e4e669", "Code that needs cleanup or improvement");
  ensureLabel("empty-file",     "d4c5f9", "File exists but has no implementation");

  const files    = walk(SRC);
  const findings = [];

  for (const file of files) {
    const rel     = relative(ROOT, file);
    const ext     = extname(file);
    const content = readFileSync(file, "utf8");
    const lines   = content.split("\n");

    // Empty or whitespace-only file
    if (content.trim().length === 0) {
      findings.push({
        title: `Empty file needs implementation: \`${rel}\``,
        body: [
          `The file \`${rel}\` exists but contains no code.`,
          "",
          "It should either be implemented or removed if it is no longer needed.",
          "",
          `**File:** \`${rel}\``,
        ].join("\n"),
        label: "empty-file",
      });
      continue;
    }

    // TODO / FIXME / HACK comments
    lines.forEach((line, i) => {
      const m = line.match(/\/\/\s*(TODO|FIXME|HACK|XXX):?\s*(.+)/i);
      if (!m) return;
      const tag  = m[1].toUpperCase();
      const note = m[2].trim().slice(0, 80);
      findings.push({
        title: `${tag} in \`${rel}\` (line ${i + 1}): ${note}`,
        body: [
          `Found a \`${tag}\` comment in \`${rel}\` at line **${i + 1}**:`,
          "",
          "```",
          line.trim(),
          "```",
          "",
          "This should be tracked and resolved rather than left as an inline comment.",
        ].join("\n"),
        label: "technical-debt",
      });
    });

    // JSX/TSX component missing a default export
    if ([".jsx", ".tsx"].includes(ext) && !content.includes("export default")) {
      findings.push({
        title: `Missing \`export default\` in \`${rel}\``,
        body: [
          `The component file \`${rel}\` has no \`export default\`.`,
          "",
          "This will cause a runtime error when the component is imported anywhere.",
          "",
          `**File:** \`${rel}\``,
        ].join("\n"),
        label: "bug",
      });
    }
  }

  if (findings.length === 0) {
    console.log("No issues found — codebase looks healthy!");
    return;
  }

  console.log(`Found ${findings.length} item(s). Checking for duplicates...\n`);

  // Fetch existing open issue titles to avoid opening duplicates
  const existing = new Set(
    JSON.parse(run("gh issue list --state open --json title --limit 100"))
      .map(i => i.title)
  );

  let created = 0;
  let skipped = 0;

  for (const f of findings) {
    if (existing.has(f.title)) {
      console.log(`  skip  already open: ${f.title.slice(0, 70)}`);
      skipped++;
      continue;
    }

    const url = run(
      `gh issue create --title ${JSON.stringify(f.title)} --body ${JSON.stringify(f.body)} --label ${JSON.stringify(f.label)}`
    );
    console.log(`  open  ${f.title.slice(0, 70)}`);
    console.log(`        ${url}`);
    created++;
  }

  console.log(`\nDone — ${created} issue(s) opened, ${skipped} already existed.`);
}

main().catch(err => {
  console.error("[health-check]", err.message);
  process.exit(1);
});
