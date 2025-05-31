import { blogPostSchema } from "../types";

export const post = blogPostSchema.parse({
  title: "Open-Source Bounties at PearAI",
  url: "https://pearai.com/blog/open-source-bounties",
  excerpt:
    "PearAI introduces monetary bounties for significant open-source contributions. Solve big issues, get paid, and help build the best AI code editor in the world.",
  date: "2025-09-28T00:00:00Z",
  author: "PearAI Team",
  readingTime: "2 min",
  slug: "open-source-bounties",
  summary:
    "PearAI introduces monetary bounties for significant open-source contributions. Solve big issues, get paid, and help build the best AI code editor in the world.",
  thumbnail:
    "https://cdn.dribbble.com/userupload/34720834/file/original-2a2836a5823274482f261d8e8d22414a.png?resize=1024x768&vertical=center",
  tags: [
    "announcement",
    "featured",
    "open-source",
    "bounties",
    "contributions",
  ],
  content: `<div>...existing content...</div>`,
});
