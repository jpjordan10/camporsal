import { defineCollection, z } from "astro:content";

const category = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    pluralName: z.string(),
  }),
});

const service = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      pluralName: z.string(),
      image: image(),
      imageAlt: z.string(),
      description: z.string(),
    }),
});

export const collections = { category, service };
