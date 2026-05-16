import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";

describe("seo and accessibility baseline", () => {
  it("defines complete shared document metadata", async () => {
    const layout = await readFile("src/layouts/BaseLayout.astro", "utf8");

    expect(layout).toContain('lang="zh-CN"');
    expect(layout).toContain('name="description"');
    expect(layout).toContain('rel="canonical"');
    expect(layout).toContain('rel="manifest"');
    expect(layout).toContain('property="og:title"');
    expect(layout).toContain('property="og:url"');
    expect(layout).toContain('property="og:image"');
    expect(layout).toContain('name="twitter:card"');
    expect(layout).toContain('name="theme-color"');
  });

  it("provides install and sharing assets", async () => {
    const manifest = JSON.parse(await readFile("public/site.webmanifest", "utf8"));
    const ogImage = await readFile("public/og-image.svg", "utf8");

    expect(manifest).toMatchObject({
      name: "李明的个人网站",
      short_name: "李明",
      lang: "zh-CN",
      start_url: "/",
      display: "standalone",
    });
    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: "/favicon.svg",
          type: "image/svg+xml",
        }),
      ]),
    );
    expect(ogImage).toContain("李明的个人网站分享封面");
  });

  it("keeps one h1 source per page template", async () => {
    const pagePaths = [
      "src/pages/index.astro",
      "src/pages/work/[slug].astro",
      "src/pages/writing/index.astro",
      "src/pages/writing/[slug].astro",
    ];

    for (const pagePath of pagePaths) {
      const source = await readFile(pagePath, "utf8");
      const h1Count = source.match(/<h1\b/g)?.length ?? 0;

      expect(h1Count, `${pagePath} should define exactly one h1`).toBe(1);
    }
  });
});
