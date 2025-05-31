"use client";

import { useEffect, useState } from "react";

import TableOfContents from "./TableOfContents";
import { cn } from "@/lib/utils";
import { processContentHeadings } from "@/lib/utils";

interface BlogPostContentProps {
  content: string;
  className?: string;
}

export default function BlogPostContent({
  content,
  className,
}: BlogPostContentProps) {
  const [processedContent, setProcessedContent] = useState(content);

  useEffect(() => {
    // Process content to ensure headings have IDs
    const processed = processContentHeadings(content);
    setProcessedContent(processed);
  }, [content]);

  return (
    <div className="relative flex flex-col lg:flex-row lg:gap-12">
      {/* Main content - 2/3 width on large screens */}
      <div className="flex-1 lg:w-2/3 lg:flex-none">
        <div
          className={cn(
            "prose prose-base dark:prose-invert sm:prose-lg md:prose-xl",
            "prose-headings:scroll-mt-24 prose-headings:font-medium",
            "dark:prose-h1:text-white prose-h1:text-3xl prose-h1:font-bold prose-h1:text-black",
            "dark:prose-h2:text-white prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-black",
            "dark:prose-h3:text-white prose-h3:text-xl prose-h3:font-semibold prose-h3:text-black",
            "dark:prose-h4:text-white prose-h4:text-lg prose-h4:font-medium prose-h4:text-black",
            "prose-p:text-gray-700 dark:prose-p:text-gray-300",
            "dark:prose-a:text-white prose-a:font-medium prose-a:text-black prose-a:underline-offset-4 hover:prose-a:text-gray-700 dark:hover:prose-a:text-gray-300",
            "dark:prose-blockquote:border-l-white prose-blockquote:border-l-black prose-blockquote:bg-gray-50 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:not-italic dark:prose-blockquote:bg-gray-800/50",
            "prose-th:border prose-th:border-gray-200 prose-th:bg-gray-100/70 prose-th:px-2 prose-th:py-1 prose-td:border prose-td:border-gray-200 prose-td:px-2 prose-td:py-1 dark:prose-th:border-gray-700 dark:prose-th:bg-gray-800 dark:prose-td:border-gray-700 sm:prose-th:px-3 sm:prose-th:py-2 sm:prose-td:px-3 sm:prose-td:py-2",
            "prose-hr:border-gray-200 dark:prose-hr:border-gray-700",
            "prose-img:rounded-xl prose-img:border-2 prose-img:border-gray-200 prose-img:shadow-md dark:prose-img:border-gray-800",
            "dark:prose-code:text-white prose-code:rounded-md prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-black dark:prose-code:bg-gray-800",
            "prose-pre:rounded-xl prose-pre:border-2 prose-pre:border-gray-200 prose-pre:bg-gray-100 dark:prose-pre:border-gray-700 dark:prose-pre:bg-gray-800",
            "dark:prose-strong:text-white prose-strong:font-semibold prose-strong:text-black",
            "dark:prose-ul:marker:text-white prose-ul:marker:text-black",
            "dark:prose-ol:marker:text-white prose-ol:marker:text-black",
            className,
          )}
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>

      {/* Table of contents (desktop) - 1/3 width on large screens */}
      <div className="hidden lg:block lg:w-1/3">
        <TableOfContents content={processedContent} />
      </div>
    </div>
  );
}
