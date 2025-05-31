"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FAQItem } from "@/types/faqItems";
import { Search, X, ChevronRight, Filter } from "lucide-react";
import { faqData } from "./faq-data";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FAQContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get query parameters
  const searchQuery = searchParams?.get("q") ?? "";
  const activeCategory = searchParams?.get("category") ?? "all";

  // Local state for UI
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | undefined>(
    undefined,
  );

  // Function to update URL search params
  const updateSearchParams = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (value === null || value === "") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // Extract unique categories from FAQ data
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(faqData.map((item) => item.category || "uncategorized")),
    );
    return ["all", ...uniqueCategories];
  }, []);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqData.length };

    faqData.forEach((item) => {
      const category = item.category || "uncategorized";
      counts[category] = (counts[category] || 0) + 1;
    });

    return counts;
  }, []);

  // Helper function to extract searchable text from ReactNode
  const getSearchableText = (content: ReactNode): string => {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content.map(getSearchableText).join(" ");
    }
    if (content && typeof content === "object" && "props" in content) {
      const { children } = content.props as { children?: ReactNode };
      return getSearchableText(children);
    }
    return "";
  };

  // Filter FAQs based on search query and active category
  const filteredFAQs = useMemo(() => {
    return faqData.filter((item: FAQItem) => {
      // Category filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      // Search filter
      if (!searchQuery) return true;

      const questionMatch = item.question
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const answerMatch = getSearchableText(item.answer)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return questionMatch || answerMatch;
    });
  }, [searchQuery, activeCategory]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setIsSearching(!!value);
    updateSearchParams("q", value || null);
  };

  // Handle category changes
  const handleCategoryChange = (category: string) => {
    updateSearchParams("category", category === "all" ? null : category);
    setExpandedItem(undefined); // Reset expanded item when changing category
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-black md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Find answers to common questions about Oppulence and how it can
          transform your lead management process.
        </p>
      </motion.div>

      <div className="mx-auto max-w-4xl space-y-8">
        {/* Search and filter section */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-blue-500" />
            </div>
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full border-blue-200 pl-10 pr-10 focus-visible:ring-blue-500"
              aria-label="Search frequently asked questions"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={() => handleSearchChange("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Mobile category filter dropdown */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    {activeCategory === "all"
                      ? "All Categories"
                      : activeCategory}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      "flex justify-between",
                      activeCategory === category && "bg-muted",
                      category === "leads" && "text-blue-500",
                    )}
                  >
                    <span className="capitalize">{category}</span>
                    <Badge variant="secondary" className="ml-2">
                      {categoryCounts[category] || 0}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop category tabs */}
        <div className="hidden md:block">
          <Tabs
            value={activeCategory || "all"}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={cn(
                    "data-[state=active]:text-white capitalize",
                    category === "leads" &&
                      !activeCategory &&
                      "border-blue-500 text-blue-500",
                    category === "leads" &&
                      activeCategory === "leads" &&
                      "text-white border-blue-500",
                  )}
                >
                  {category}
                  <Badge variant="secondary" className="ml-2">
                    {categoryCounts[category] || 0}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* FAQ content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2 rounded-lg border p-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </motion.div>
          ) : filteredFAQs.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-blue-200 bg-blue-50/20 p-8 text-center"
            >
              <p className="text-lg font-medium text-muted-foreground">
                No FAQs found matching your search.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  handleSearchChange("");
                  handleCategoryChange("all");
                }}
                className="mt-2 text-blue-500 hover:text-blue-700"
              >
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ staggerChildren: 0.05 }}
            >
              <Accordion
                type="single"
                collapsible
                value={expandedItem}
                onValueChange={setExpandedItem}
                className="w-full space-y-4"
              >
                {filteredFAQs.map((item: FAQItem, index: number) => (
                  <motion.div
                    key={`item-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="rounded-lg border border-blue-100 shadow-sm"
                    >
                      <AccordionTrigger className="px-4 py-3 text-left hover:bg-blue-50">
                        <div className="flex flex-col items-start gap-1">
                          <div className="flex items-center gap-2">
                            {item.category && (
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs capitalize",
                                  item.category === "leads" &&
                                    "border-blue-500 bg-blue-50 text-blue-500",
                                )}
                              >
                                {item.category}
                              </Badge>
                            )}
                          </div>
                          <span className="font-medium">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
