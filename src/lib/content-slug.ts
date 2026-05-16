export function contentSlugFromId(id: string): string {
  return id.endsWith(".md") ? id.slice(0, -3) : id;
}
