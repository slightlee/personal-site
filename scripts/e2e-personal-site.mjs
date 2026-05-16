import { readFile } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const detailHtml = await readFile("dist/work/portfolio-system/index.html", "utf8");
const writingHtml = await readFile("dist/writing/index.html", "utf8");
const writingDetailHtml = await readFile(
  "dist/writing/personal-site-as-content-hub/index.html",
  "utf8",
);
const checks = [
  ["page language", 'lang="zh-CN"'],
  ["document title", "<title>李明的个人网站</title>"],
  ["canonical link", 'rel="canonical"'],
  ["manifest link", 'rel="manifest"'],
  ["open graph type", 'property="og:type" content="website"'],
  ["twitter card", 'name="twitter:card"'],
  ["profile name", "李明"],
  ["skip link", "跳到主要内容"],
  ["principles section", "工作方式"],
  ["writing section", "最新文章与观点"],
  ["works section", "代表作品"],
  ["work detail link", "/work/portfolio-system/"],
  ["writing detail link", "/writing/personal-site-as-content-hub/"],
  ["contact link", "mailto:hello@example.com"],
];

const detailChecks = [
  ["detail title", "个人作品集内容系统"],
  ["detail canonical", "https://slightlee.github.io/personal-site/work/portfolio-system/"],
  ["detail article og type", 'property="og:type" content="article"'],
  ["detail body", "个人资料放在 TypeScript"],
  ["back link", "/#works"],
];

const writingChecks = [
  ["writing index title", "文章与观点"],
  ["writing canonical", "https://slightlee.github.io/personal-site/writing/"],
  ["writing index post", "个人网站为什么应该和博客结合"],
];

const writingDetailChecks = [
  ["writing detail title", "个人网站为什么应该和博客结合"],
  [
    "writing detail canonical",
    "https://slightlee.github.io/personal-site/writing/personal-site-as-content-hub/",
  ],
  ["writing detail body", "个人网站负责第一印象"],
  ["writing back link", "/writing/"],
];

const failures = checks
  .filter(([, expected]) => !html.includes(expected))
  .map(([label]) => label)
  .concat(
    detailChecks
      .filter(([, expected]) => !detailHtml.includes(expected))
      .map(([label]) => label),
  )
  .concat(
    writingChecks
      .filter(([, expected]) => !writingHtml.includes(expected))
      .map(([label]) => label),
  )
  .concat(
    writingDetailChecks
      .filter(([, expected]) => !writingDetailHtml.includes(expected))
      .map(([label]) => label),
  );

if (failures.length > 0) {
  console.error(`e2e failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log("e2e passed");
