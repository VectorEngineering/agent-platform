import {
  helpArticleSchema,
  newsArticleSchema,
  popularHelpArticleSchema,
  responseSchema,
  type HelpArticle,
  type NewsArticle,
  type PopularHelpArticle,
  type ResponseSchema,
  HelpTags,
  NewsTags,
  PopularTags,
  NEWS_RECENCY_DAYS,
} from "@/types/articles";
import { posts } from "@/lib/blog/posts";
// Helper function to determine if a post is a help article based on tags
const isHelpArticle = (tags: string[]) => {
  return tags.some((tag) =>
    Object.values(HelpTags).includes(tag.toLowerCase() as HelpTags),
  );
};

// Helper function to determine if a post is a news article based on date and tags
const isNewsArticle = (tags: string[], date: string) => {
  const isRecent =
    new Date(date) >
    new Date(Date.now() - NEWS_RECENCY_DAYS * 24 * 60 * 60 * 1000);
  return (
    isRecent ||
    tags.some((tag) =>
      Object.values(NewsTags).includes(tag.toLowerCase() as NewsTags),
    )
  );
};

// Helper function to determine if a post is popular (for now based on specific tags)
const isPopularHelpArticle = (tags: string[]) => {
  return (
    tags.some((tag) =>
      Object.values(PopularTags).includes(tag.toLowerCase() as PopularTags),
    ) && isHelpArticle(tags)
  );
};

// Transform a blog post to a help article format
const transformToHelpArticle = (post: (typeof posts)[0]): HelpArticle => ({
  title: post.title,
  content: post.content,
  searchableSummary: post.excerpt,
  summary: post.summary,
  slug: post.url.split("/").pop() || "",
  date: post.date,
  excerpt: post.excerpt,
  thumbnail: post.thumbnail,
  author: post.author,
  readingTime: post.readingTime || "3 min",
  tags: post.tags,
  url: post.url,
});

// Transform a blog post to a news article format
const transformToNewsArticle = (post: (typeof posts)[0]): NewsArticle => ({
  title: post.title,
  content: post.content,
  href: post.url,
  image: post.thumbnail,
  publishedAt: post.date,
  date: post.date,
  summary: post.summary,
  excerpt: post.excerpt,
  thumbnail: post.thumbnail,
  author: post.author,
  readingTime: post.readingTime || "3 min",
  tags: post.tags,
  url: post.url,
});

// Transform a blog post to a popular help article format
const transformToPopularHelpArticle = (
  post: (typeof posts)[0],
): PopularHelpArticle => ({
  title: post.title,
  content: post.content,
  searchableSummary: post.excerpt,
  summary: post.summary,
  slug: post.url.split("/").pop() || "",
  date: post.date,
  excerpt: post.excerpt,
  thumbnail: post.thumbnail,
  author: post.author,
  readingTime: post.readingTime || "3 min",
  tags: post.tags,
  url: post.url,
});

// Get all content categorized and transformed
export const getAllContent = (): ResponseSchema => {
  const allHelpArticles: HelpArticle[] = [];
  const latestNewsArticles: NewsArticle[] = [];
  const popularHelpArticles: PopularHelpArticle[] = [];

  posts.forEach((post) => {
    if (isHelpArticle(post.tags)) {
      const helpArticle = transformToHelpArticle(post);
      allHelpArticles.push(helpArticleSchema.parse(helpArticle));
    }

    if (isNewsArticle(post.tags, post.date)) {
      const newsArticle = transformToNewsArticle(post);
      latestNewsArticles.push(newsArticleSchema.parse(newsArticle));
    }

    if (isPopularHelpArticle(post.tags)) {
      const popularArticle = transformToPopularHelpArticle(post);
      popularHelpArticles.push(popularHelpArticleSchema.parse(popularArticle));
    }
  });

  const response = {
    allHelpArticles,
    latestNewsArticles,
    popularHelpArticles,
  };

  // Validate entire response
  return responseSchema.parse(response);
};

// Get only help articles
export const getHelpArticles = (): HelpArticle[] => {
  return getAllContent().allHelpArticles;
};

// Get only news articles
export const getNewsArticles = (): NewsArticle[] => {
  return getAllContent().latestNewsArticles;
};

// Get only popular help articles
export const getPopularHelpArticles = (): PopularHelpArticle[] => {
  return getAllContent().popularHelpArticles;
};
