import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "astro.config.mjs",
  "package.json",
  "vitest.config.mjs",
  "scripts/run-astro.mjs",
  "src/pages/index.astro",
  "src/pages/work/[slug].astro",
  "src/layouts/BaseLayout.astro",
  "src/lib/site-metadata.ts",
  "src/data/profile.ts",
  "src/content/config.ts",
  "src/styles/global.css",
  "public/favicon.svg",
];

const errors = [];

for (const file of requiredFiles) {
  try {
    await access(file);
  } catch {
    errors.push(`missing required file: ${file}`);
  }
}

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
for (const scriptName of ["build", "lint", "typecheck", "test", "coverage", "smoke", "e2e"]) {
  if (!packageJson.scripts?.[scriptName]) {
    errors.push(`missing package script: ${scriptName}`);
  }
}

if (!packageJson.scripts.build.includes("run-astro.mjs")) {
  errors.push("build script must use the Astro wrapper");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("lint passed");
