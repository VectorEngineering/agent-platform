"use client";

import { BlogPost } from "@/lib/blog/types";
import PostCard from "@/components/blog/PostCard";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { compareDesc } from "date-fns";
import { useState } from "react";

// Helper to get unique tags from posts
const getUniqueTags = (posts: BlogPost[]) => {
  const tags = posts.flatMap((post) => post.tags);
  return Array.from(new Set(tags));
};

interface BlogContentProps {
  initialPosts: BlogPost[];
}

export default function BlogContent({ initialPosts }: BlogContentProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const sortedPosts = initialPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  // Filter posts based on search and tags
  const filterPosts = (posts: BlogPost[]) => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  };

  // Get featured and regular posts after filtering
  const filteredPosts = filterPosts(sortedPosts);
  const featuredPosts = filteredPosts.filter((post) =>
    post.tags.includes("featured"),
  );
  const regularPosts = filteredPosts.filter(
    (post) => !post.tags.includes("featured"),
  );

  // Get all unique tags
  const allTags = getUniqueTags(sortedPosts);

  return (
    <div className="max-w-9xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Search and Filter Section */}
      <div className="mb-16 space-y-8">
        {/* Search Bar */}
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white dark:focus:border-white dark:focus:ring-white/20 w-full rounded-xl border-2 border-gray-200 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 shadow-md transition-all duration-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTags((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag],
                  );
                }}
                className={cn(
                  "rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  selectedTags.includes(tag)
                    ? "text-white dark:border-white dark:bg-white border-black bg-black dark:text-black"
                    : "bg-white dark:hover:border-white dark:hover:bg-white/10 border-gray-200 text-gray-700 hover:border-black hover:bg-black/5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedTags.length > 0 || searchQuery) && (
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="dark:border-white dark:bg-white/5 dark:text-white inline-flex items-center gap-1 rounded-full border-2 border-black bg-black/5 px-3 py-1 text-sm font-medium text-black"
                >
                  {tag}
                  <button
                    onClick={() =>
                      setSelectedTags((prev) => prev.filter((t) => t !== tag))
                    }
                    className="dark:text-white ml-1 text-black hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </span>
              ))}
              {(selectedTags.length > 0 || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedTags([]);
                    setSearchQuery("");
                  }}
                  className="dark:text-white text-sm font-medium text-black underline-offset-4 hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="mb-24">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="dark:text-white text-3xl font-bold text-black">
              Featured Articles
            </h2>
            <div className="dark:from-white/20 ml-8 h-px flex-1 bg-gradient-to-r from-black/20 to-transparent" />
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredPosts.slice(0, 2).map((post) => (
              <PostCard
                key={post.url}
                {...post}
                thumbnail={post.thumbnail || ""}
                tags={post.tags}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              />
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="dark:text-white text-3xl font-bold text-black">
            Latest Articles
          </h2>
          <div className="dark:from-white/20 ml-8 h-px flex-1 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
        {regularPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <PostCard
                key={post.url}
                {...post}
                thumbnail={post.thumbnail || ""}
                tags={post.tags}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center shadow-md dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-400">
              No articles found matching your criteria.
            </p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="relative mt-32">
        <div className="dark:from-white/5 dark:to-white/5 absolute inset-0 rounded-3xl bg-gradient-to-r from-black/5 to-black/5" />
        <div className="bg-white/40 relative rounded-3xl border-2 border-gray-200 p-12 shadow-document backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/40">
          <div className="mx-auto max-w-2xl text-center">
            <span className="dark:border-white dark:bg-white/5 dark:text-white mb-3 inline-block rounded-full border-2 border-black bg-black/5 px-3 py-1 text-sm font-medium text-black">
              Newsletter
            </span>
            <h2 className="dark:text-white mb-4 text-3xl font-bold text-black">
              Stay in the Loop
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Get the latest Oppullence updates, tutorials, and insights
              delivered directly to your inbox. No spam, unsubscribe at any
              time.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white dark:focus:border-white dark:focus:ring-white/20 flex-1 rounded-xl border-2 border-gray-200 px-6 py-3 shadow-md transition-all duration-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-gray-700 dark:bg-gray-800"
              />
              <button
                type="submit"
                className="text-white dark:border-white dark:bg-white dark:hover:bg-white/90 group relative overflow-hidden rounded-xl border-2 border-black bg-black px-8 py-3 font-semibold shadow-md transition-all duration-200 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20 dark:text-black"
              >
                <span className="relative z-10">Subscribe</span>
                <div className="dark:from-white/80 dark:to-white absolute inset-0 -translate-x-full bg-gradient-to-r from-black/80 to-black transition-transform group-hover:translate-x-0" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
