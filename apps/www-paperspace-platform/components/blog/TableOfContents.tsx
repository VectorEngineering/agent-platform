"use client";

import { useEffect, useState } from "react";

import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({
  content,
  className,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from content
  useEffect(() => {
    if (!content) return;

    // Create a temporary div to parse the HTML content
    const div = document.createElement("div");
    div.innerHTML = content;

    // Find all heading elements (h1, h2, h3, h4, h5, h6)
    const headingElements = div.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const extractedHeadings: Heading[] = [];

    headingElements.forEach((el) => {
      // Skip headings without IDs
      if (!el.id) return;

      const level = parseInt(el.tagName.substring(1), 10);

      extractedHeadings.push({
        id: el.id,
        text: el.textContent || "",
        level,
      });
    });

    setHeadings(extractedHeadings);
  }, [content]);

  // Set up intersection observer to highlight active section
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0.1,
      },
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  // Scroll to section when clicking on a heading
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Scroll to the element with a smooth animation
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="bg-white sticky top-24 rounded-xl p-6 dark:bg-gray-900">
        <div className="mb-6 flex items-center gap-2">
          <BookOpen className="dark:text-white h-5 w-5 text-black" />
          <h3 className="dark:text-white text-xl font-semibold text-black">
            Table of Contents
          </h3>
        </div>

        <div className="dark:from-white mb-4 h-1 w-20 bg-gradient-to-r from-black to-gray-500 dark:to-gray-500"></div>

        <nav className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          <div className="space-y-2">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToSection(heading.id)}
                className={cn(
                  "dark:hover:text-white block w-full text-left text-sm transition-all duration-200 hover:text-black",
                  heading.level === 1 && "font-semibold",
                  heading.level === 2 && "pl-2",
                  heading.level === 3 && "pl-4",
                  heading.level === 4 && "pl-6",
                  heading.level === 5 && "pl-8",
                  heading.level === 6 && "pl-10",
                  activeId === heading.id
                    ? "dark:text-white dark:border-white border-l-2 border-black pl-[calc(0.5rem+var(--pl,0px))] font-medium text-black"
                    : "border-l-2 border-transparent pl-[calc(0.5rem+var(--pl,0px))] text-gray-500 dark:text-gray-400",
                  heading.level === 1 && "style-none",
                  heading.level === 2 && "--pl: 0.5rem",
                  heading.level === 3 && "--pl: 1rem",
                  heading.level === 4 && "--pl: 1.5rem",
                  heading.level === 5 && "--pl: 2rem",
                  heading.level === 6 && "--pl: 2.5rem",
                  "rounded-r-md py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800",
                )}
              >
                {heading.text}
              </button>
            ))}
          </div>
        </nav>

        {headings.length > 3 && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <p>Click on a heading to navigate to that section</p>
          </div>
        )}
      </div>
    </div>
  );
}
