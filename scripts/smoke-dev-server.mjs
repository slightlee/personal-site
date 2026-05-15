import { access, readFile } from "node:fs/promises";

await access("dist/index.html");
const html = await readFile("dist/index.html", "utf8");

if (!html.includes("个人网站项目骨架已就绪")) {
  console.error("dist/index.html does not contain the skeleton heading");
  process.exit(1);
}

console.log("smoke passed");
