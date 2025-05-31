import { z } from "zod";

// Content categorization enums
export enum HelpTags {
  Guide = "guide",
  Help = "help",
  Tutorial = "tutorial",
  HowTo = "how-to",
}

export enum NewsTags {
  News = "news",
  Announcement = "announcement",
  Release = "release",
}

export enum PopularTags {
  Featured = "featured",
  Popular = "popular",
}

export const NEWS_RECENCY_DAYS = 30;

// Create Zod enums from our TypeScript enums
const helpTagsEnum = z.enum(Object.values(HelpTags) as [string, ...string[]]);
const newsTagsEnum = z.enum(Object.values(NewsTags) as [string, ...string[]]);
const popularTagsEnum = z.enum(
  Object.values(PopularTags) as [string, ...string[]],
);

// Helper to validate that array contains at least one matching enum value
const containsEnumValue = (enumType: z.ZodEnum<[string, ...string[]]>) =>
  z.array(z.string()).refine(
    (tags) => tags.some((tag) => enumType.safeParse(tag.toLowerCase()).success),
    (tags) => ({
      message: `Tags must include at least one of: ${enumType.options.join(", ")}`,
    }),
  );

const helpArticleSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1),
  content: z.string().min(1),
  searchableSummary: z.string().min(1),
  summary: z.string().min(1),
  slug: z.string().min(1),
  date: z.string().datetime(),
  excerpt: z.string().min(1),
  thumbnail: z.string().url(),
  author: z.string().min(1),
  readingTime: z.string().min(1),
  tags: containsEnumValue(helpTagsEnum),
});

const newsArticleSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1),
  content: z.string().min(1),
  href: z.string().url(),
  image: z.string().min(1),
  publishedAt: z.string().datetime(),
  date: z.string().datetime(),
  summary: z.string().min(1),
  excerpt: z.string().min(1),
  thumbnail: z.string().url(),
  author: z.string().min(1),
  readingTime: z.string().min(1),
  tags: containsEnumValue(newsTagsEnum),
});

const popularHelpArticleSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  searchableSummary: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().datetime(),
  excerpt: z.string().min(1),
  thumbnail: z.string().url(),
  author: z.string().min(1),
  readingTime: z.string().min(1),
  tags: z.array(z.string()).refine(
    (tags) =>
      // Must have at least one popular tag AND one help tag
      tags.some(
        (tag) => popularTagsEnum.safeParse(tag.toLowerCase()).success,
      ) &&
      tags.some((tag) => helpTagsEnum.safeParse(tag.toLowerCase()).success),
    {
      message: `Tags must include at least one popular tag (${Object.values(PopularTags).join(", ")}) AND one help tag (${Object.values(HelpTags).join(", ")})`,
    },
  ),
});

const responseSchema = z.object({
  allHelpArticles: z.array(helpArticleSchema),
  latestNewsArticles: z.array(newsArticleSchema),
  popularHelpArticles: z.array(popularHelpArticleSchema),
});

// Type inference
type HelpArticle = z.infer<typeof helpArticleSchema>;
type NewsArticle = z.infer<typeof newsArticleSchema>;
type PopularHelpArticle = z.infer<typeof popularHelpArticleSchema>;
type ResponseSchema = z.infer<typeof responseSchema>;

// Validation function using Zod
const validateSchema = (data: unknown): ResponseSchema => {
  return responseSchema.parse(data);
};

export {
  helpArticleSchema,
  newsArticleSchema,
  popularHelpArticleSchema,
  responseSchema,
  validateSchema,
  type HelpArticle,
  type NewsArticle,
  type PopularHelpArticle,
  type ResponseSchema,
};
