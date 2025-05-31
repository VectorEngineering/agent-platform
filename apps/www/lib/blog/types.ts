import { HelpTags, NewsTags, PopularTags } from "@/types/articles";

import { z } from "zod";

// Define the base schema for blog posts
export const blogPostSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  date: z.string().datetime(),
  excerpt: z.string().min(1),
  thumbnail: z.string().url(),
  tags: z
    .array(z.string())
    .min(1)
    .refine(
      (tags) =>
        tags.some((tag) => {
          const lowercaseTag = tag.toLowerCase();
          return (
            Object.values(HelpTags).includes(lowercaseTag as HelpTags) ||
            Object.values(NewsTags).includes(lowercaseTag as NewsTags) ||
            Object.values(PopularTags).includes(lowercaseTag as PopularTags)
          );
        }),
      {
        message: "At least one tag must be a valid Help, News, or Popular tag",
      },
    ),
  url: z.string().url(),
  content: z.string().min(1),
  summary: z.string().min(1),
  readingTime: z.string().min(1).optional(),
  slug: z.string().min(1),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
