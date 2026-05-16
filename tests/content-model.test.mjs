import { describe, expect, it } from "vitest";
import { readFile, readdir } from "node:fs/promises";
import YAML from "yaml";
import { profile } from "../src/data/profile";

const requiredWorkFields = [
  "title",
  "summary",
  "date",
  "role",
  "tags",
  "featured",
];

const requiredWritingFields = ["title", "description", "date", "tags", "featured"];

async function readFrontmatter(path) {
  const markdown = await readFile(path, "utf8");
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    throw new Error(`missing frontmatter: ${path}`);
  }

  return YAML.parse(match[1]);
}

describe("content model", () => {
  it("defines complete profile data", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.headline).toBeTruthy();
    expect(profile.intro).toBeTruthy();
    expect(profile.email).toContain("@");
    expect(profile.skills.length).toBeGreaterThanOrEqual(3);
    expect(profile.principles.length).toBeGreaterThanOrEqual(3);
    expect(profile.stats.length).toBeGreaterThanOrEqual(3);
    expect(profile.socialLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("provides at least three work entries with required frontmatter", async () => {
    const files = (await readdir("src/content/works")).filter((fileName) =>
      fileName.endsWith(".md"),
    );

    expect(files.length).toBeGreaterThanOrEqual(3);

    for (const fileName of files) {
      const frontmatter = await readFrontmatter(`src/content/works/${fileName}`);

      for (const field of requiredWorkFields) {
        expect(frontmatter, `${fileName} missing ${field}`).toHaveProperty(field);
      }

      expect(frontmatter.tags.length).toBeGreaterThanOrEqual(1);
      expect(Number.isNaN(Date.parse(frontmatter.date))).toBe(false);
    }
  });

  it("provides Chinese writing entries with required frontmatter", async () => {
    const files = (await readdir("src/content/writing")).filter((fileName) =>
      fileName.endsWith(".md"),
    );

    expect(files.length).toBeGreaterThanOrEqual(3);

    for (const fileName of files) {
      const frontmatter = await readFrontmatter(`src/content/writing/${fileName}`);

      for (const field of requiredWritingFields) {
        expect(frontmatter, `${fileName} missing ${field}`).toHaveProperty(field);
      }

      expect(frontmatter.tags.length).toBeGreaterThanOrEqual(1);
      expect(Number.isNaN(Date.parse(frontmatter.date))).toBe(false);
      expect(/[一-龥]/.test(`${frontmatter.title}${frontmatter.description}`)).toBe(true);
    }
  });
});
