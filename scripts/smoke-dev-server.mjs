import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "dist/index.html",
  "dist/work/portfolio-system/index.html",
  "dist/writing/index.html",
  "dist/writing/personal-site-as-content-hub/index.html",
  "dist/favicon.svg",
  "dist/og-image.svg",
  "dist/site.webmanifest",
];

const indexHtml = await readFile("dist/index.html", "utf8");
const failures = [];

for (const filePath of requiredFiles) {
  try {
    await access(filePath);
  } catch {
    failures.push(`missing build artifact: ${filePath}`);
  }
}

const smokeChecks = [
  ["profile name", "李明"],
  ["canonical link", 'rel="canonical"'],
  ["manifest link", 'rel="manifest"'],
  ["open graph image", 'property="og:image"'],
  ["contact link", "mailto:hello@example.com"],
];

for (const [label, expected] of smokeChecks) {
  if (!indexHtml.includes(expected)) {
    failures.push(`missing ${label}`);
  }
}

if (failures.length > 0) {
  console.error(`smoke failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log("smoke passed");
