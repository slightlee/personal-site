import { contentSlugFromId } from "./content-slug";

export function writingSlugFromId(id: string): string {
  return contentSlugFromId(id);
}
