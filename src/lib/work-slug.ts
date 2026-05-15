export function workSlugFromId(id: string): string {
  return id.endsWith(".md") ? id.slice(0, -3) : id;
}
