import { readFile } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const detailHtml = await readFile("dist/work/portfolio-system/index.html", "utf8");
const checks = [
  ["page language", 'lang="zh-CN"'],
  ["document title", "<title>personal-site</title>"],
  ["profile name", "Ming Li"],
  ["works section", "代表作品"],
  ["work detail link", "/work/portfolio-system/"],
  ["contact link", "mailto:hello@example.com"],
];

const detailChecks = [
  ["detail title", "Portfolio System"],
  ["detail body", "Profile data lives in TypeScript"],
  ["back link", "/#works"],
];

const failures = checks
  .filter(([, expected]) => !html.includes(expected))
  .map(([label]) => label)
  .concat(
    detailChecks
      .filter(([, expected]) => !detailHtml.includes(expected))
      .map(([label]) => label),
  );

if (failures.length > 0) {
  console.error(`e2e failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log("e2e passed");
