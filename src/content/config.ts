import { defineCollection, z } from "astro:content";

// const blog = defineCollection({
//   type: "content",
//   // Type-check frontmatter using a schema
//   schema: ({ image }) =>
//     z.object({
//       title: z.string(),
//       description: z.string(),
//       // Transform string to Date object
//       pubDate: z.coerce.date(),
//       updatedDate: z.coerce.date().optional(),
//       heroImage: image(),
//     }),
// });

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
    }),
});

export const collections = { category, service };
// export const collections = { blog, service };
