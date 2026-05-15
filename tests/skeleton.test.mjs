import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { contactHref, siteMetadata } from "../src/lib/site-metadata";

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
    expect(siteMetadata.title).toBe("personal-site");
    expect(siteMetadata.description).toContain("Markdown");
    expect(contactHref()).toBe("mailto:hello@example.com");
  });
});
