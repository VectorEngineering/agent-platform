"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Filter, Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/lib/blog/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostCard from "@/components/blog/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { compareDesc } from "date-fns";

// Helper to get unique tags from posts
const getUniqueTags = (posts: BlogPost[]) => {
  const tags = posts.flatMap((post) => post.tags);
  return Array.from(new Set(tags)).filter((tag) => tag !== "featured");
};

interface EnhancedBlogContentProps {
  initialPosts: BlogPost[];
}

export default function EnhancedBlogContent({
  initialPosts,
}: EnhancedBlogContentProps) {
  // Local state for UI
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Sort posts by date
  const sortedPosts = useMemo(() => {
    return initialPosts.sort((a, b) =>
      compareDesc(new Date(a.date), new Date(b.date)),
    );
  }, [initialPosts]);

  // Extract unique tags
  const allTags = useMemo(() => {
    return ["all", ...getUniqueTags(sortedPosts)];
  }, [sortedPosts]);

  // Count posts per tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { all: sortedPosts.length };

    sortedPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tag !== "featured") {
          counts[tag] = (counts[tag] || 0) + 1;
        }
      });
    });

    return counts;
  }, [sortedPosts]);

  // Filter posts based on search query and active tag
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      // Tag filter
      if (activeTag !== "all" && !post.tags.includes(activeTag)) {
        return false;
      }

      // Selected tags filter (for multi-select)
      if (
        selectedTags.length > 0 &&
        !selectedTags.some((tag) => post.tags.includes(tag))
      ) {
        return false;
      }

      // Search filter
      if (!searchQuery) return true;

      const matchesTitle = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesExcerpt = post.excerpt
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesTitle || matchesExcerpt;
    });
  }, [sortedPosts, activeTag, selectedTags, searchQuery]);

  // Get featured and regular posts after filtering
  const featuredPosts = useMemo(() => {
    return filteredPosts.filter((post) => post.tags.includes("featured"));
  }, [filteredPosts]);

  const regularPosts = useMemo(() => {
    return filteredPosts.filter((post) => !post.tags.includes("featured"));
  }, [filteredPosts]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Handle tag changes
  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
  };

  // Handle tag selection for multi-select
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setActiveTag("all");
    setSelectedTags([]);
  };

  return (
    <div className="max-w-9xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 space-y-8"
      >
        {/* Search Bar */}
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-xl border-2 py-6 pl-12 pr-10 shadow-md transition-all duration-200 focus-visible:ring-primary"
              aria-label="Search articles"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2"
                onClick={() => handleSearchChange("")}
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Tag Filter Dropdown */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between rounded-xl border-2 py-6"
              >
                <span className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  {activeTag === "all" ? "All Categories" : activeTag}
                </span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[250px]">
              {allTags.map((tag) => (
                <DropdownMenuItem
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={cn(
                    "flex justify-between py-2",
                    activeTag === tag && "bg-muted",
                  )}
                >
                  <span className="capitalize">{tag}</span>
                  <Badge variant="secondary" className="ml-2">
                    {tagCounts[tag] || 0}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Tag Tabs */}
        <div className="hidden md:block">
          <Tabs
            value={activeTag}
            onValueChange={handleTagChange}
            className="w-full"
          >
            <TabsList className="flex h-auto w-full flex-wrap justify-center gap-2 bg-transparent p-0">
              {allTags.map((tag) => (
                <TabsTrigger
                  key={tag}
                  value={tag}
                  className="rounded-full border-2 px-4 py-2 capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tag}
                  <Badge variant="secondary" className="ml-2">
                    {tagCounts[tag] || 0}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Active Filters */}
        {(selectedTags.length > 0 || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="flex items-center gap-1 rounded-full border-2 px-3 py-1.5 capitalize"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-1 h-4 w-4 rounded-full p-0"
                    onClick={() => toggleTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {(selectedTags.length > 0 || searchQuery) && (
                <Button
                  variant="link"
                  onClick={clearFilters}
                  className="text-sm font-medium"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Blog Content */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Loading Skeletons */}
            <div className="mb-16">
              <div className="mb-8 flex items-center justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="ml-8 h-px flex-1" />
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-xl border-2">
                    <Skeleton className="aspect-video w-full" />
                    <div className="space-y-4 p-6">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-20 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-8 flex items-center justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="ml-8 h-px flex-1" />
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-xl border-2">
                    <Skeleton className="aspect-video w-full" />
                    <div className="space-y-4 p-6">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-16 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-12 rounded-full" />
                        <Skeleton className="h-5 w-12 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border-2 bg-muted/20 p-12 text-center shadow-md"
          >
            <h3 className="mb-2 text-xl font-semibold">No Articles Found</h3>
            <p className="mb-6 text-muted-foreground">
              We couldn&ldquo;t find any articles matching your search criteria.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ staggerChildren: 0.05 }}
          >
            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-24"
              >
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Featured Articles</h2>
                  <div className="ml-8 h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                  {featuredPosts.slice(0, 2).map((post, index) => (
                    <motion.div
                      key={post.url}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PostCard
                        {...post}
                        thumbnail={post.thumbnail || ""}
                        tags={post.tags}
                        className="transform transition-all duration-300 hover:scale-[1.02]"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Regular Posts Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold">Latest Articles</h2>
                <div className="ml-8 h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PostCard
                      {...post}
                      thumbnail={post.thumbnail || ""}
                      tags={post.tags}
                      className="transform transition-all duration-300 hover:scale-[1.02]"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative mt-32"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 to-primary/5" />
        <div className="relative rounded-3xl border-2 border-muted bg-background/40 p-12 shadow-lg backdrop-blur-sm">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-3 px-3 py-1 text-sm font-medium"
            >
              Newsletter
            </Badge>
            <h2 className="mb-4 text-3xl font-bold">Stay in the Loop</h2>
            <p className="mb-8 text-muted-foreground">
              Get the latest Oppulence updates, tutorials, and insights
              delivered directly to your inbox. No spam, unsubscribe at any
              time.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border-2 py-6 shadow-md transition-all duration-200"
              />
              <Button
                type="submit"
                size="lg"
                className="group relative overflow-hidden rounded-xl border-2 px-8 py-6 font-semibold shadow-md"
              >
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary/80 to-primary transition-transform group-hover:translate-x-0" />
              </Button>
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
