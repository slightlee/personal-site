import { access, readFile } from "node:fs/promises";

await access("dist/index.html");
const html = await readFile("dist/index.html", "utf8");

if (!html.includes("李明")) {
  console.error("dist/index.html does not contain the profile name");
  process.exit(1);
}

console.log("smoke passed");
