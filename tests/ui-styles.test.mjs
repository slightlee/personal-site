import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";

describe("ui style contract", () => {
  it("keeps cards within the confirmed radius limit", async () => {
    const css = await readFile("src/styles/global.css", "utf8");
    const radii = [...css.matchAll(/border-radius:\s*(\d+)px/g)].map((match) =>
      Number(match[1]),
    );

    expect(radii.length).toBeGreaterThan(0);
    expect(Math.max(...radii)).toBeLessThanOrEqual(8);
  });

  it("defines responsive, focus, and reduced motion states", async () => {
    const css = await readFile("src/styles/global.css", "utf8");

    expect(css).toContain("@media (max-width: 760px)");
    expect(css).toContain(":focus-visible");
    expect(css).toContain("prefers-reduced-motion");
    expect(css).not.toContain("letter-spacing: -");
  });

  it("keeps the visual refresh anchored by explicit design tokens", async () => {
    const css = await readFile("src/styles/global.css", "utf8");

    expect(css).toContain("--color-primary: #0f766e");
    expect(css).toContain("--color-accent: #d97706");
    expect(css).toContain("--color-surface-cool: #e6eef0");
    expect(css).toContain(".workspace-preview");
    expect(css).toContain(".work-preview");
    expect(css).toContain(".writing-item");
    expect(css).not.toMatch(/font-size:[^;]*vw/);
  });

  it("protects the reference-inspired home and article layouts", async () => {
    const css = await readFile("src/styles/global.css", "utf8");
    const home = await readFile("src/pages/index.astro", "utf8");
    const article = await readFile("src/pages/writing/[slug].astro", "utf8");

    expect(home).toContain("notice-strip");
    expect(home).toContain("home-layout");
    expect(home).toContain("home-aside");
    expect(article).toContain("article-layout");
    expect(article).toContain("article-aside");
    expect(css).toContain("grid-template-columns: minmax(0, 1fr) 296px");
    expect(css).toContain("grid-template-columns: minmax(0, 769px) 304px");
  });

  it("keeps header navigation low-contrast and token-aligned", async () => {
    const css = await readFile("src/styles/global.css", "utf8");

    expect(css).toContain(".site-header nav");
    expect(css).toContain("background: rgb(246 242 234 / 64%)");
    expect(css).toContain("background: rgb(255 253 247 / 88%)");
    expect(css).toContain("color: var(--color-primary-dark)");
    expect(css).not.toContain("background: rgb(15 118 110 / 10%)");
  });
});
