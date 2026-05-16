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
});
