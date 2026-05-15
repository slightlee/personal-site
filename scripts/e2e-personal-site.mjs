import { readFile } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const checks = [
  ["page language", 'lang="zh-CN"'],
  ["document title", "<title>personal-site</title>"],
  ["contact link", "mailto:hello@example.com"],
];

const failures = checks
  .filter(([, expected]) => !html.includes(expected))
  .map(([label]) => label);

if (failures.length > 0) {
  console.error(`e2e failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log("e2e passed");
