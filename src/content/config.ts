import { defineCollection, z } from "astro:content";

const works = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    date: z.coerce.date(),
    role: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
    externalUrl: z.string().url().optional().or(z.literal("")),
    repoUrl: z.string().url().optional().or(z.literal("")),
    featured: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    tags: z.array(z.string().min(1)).min(1),
    featured: z.boolean().default(false),
  }),
});

export const collections = { works, writing };
