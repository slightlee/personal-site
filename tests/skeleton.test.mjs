import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { contactHref, siteMetadata } from "../src/lib/site-metadata";
import { contentSlugFromId } from "../src/lib/content-slug";
import { workSlugFromId } from "../src/lib/work-slug";
import { writingSlugFromId } from "../src/lib/writing-slug";

describe("project skeleton", () => {
  it("defines the expected package commands", async () => {
    const packageJson = JSON.parse(await readFile("package.json", "utf8"));

    expect(packageJson.scripts).toMatchObject({
      build: "node scripts/run-astro.mjs build",
      lint: "node scripts/lint.mjs",
      test: "vitest run",
      coverage: "vitest run --coverage",
      smoke: "pnpm run build && node scripts/smoke-dev-server.mjs",
      e2e: "pnpm run build && node scripts/e2e-personal-site.mjs",
    });
  });

  it("defines stable site metadata for the skeleton page", () => {
    expect(siteMetadata.title).toBe("李明的个人网站");
    expect(siteMetadata.description).toContain("自动化交付");
    expect(contactHref()).toBe("mailto:hello@example.com");
  });

  it("normalizes content ids into route slugs", () => {
    expect(contentSlugFromId("example.md")).toBe("example");
    expect(workSlugFromId("portfolio-system.md")).toBe("portfolio-system");
    expect(writingSlugFromId("personal-site-as-content-hub.md")).toBe(
      "personal-site-as-content-hub",
    );
  });
});
