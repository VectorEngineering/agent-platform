"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ReadingProgressProps {
  className?: string;
}

export default function ReadingProgress({ className }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const windowHeight = window.innerHeight;
      const articleHeight = article.clientHeight;
      const scrollTop = window.scrollY;
      const scrollHeight = articleHeight - windowHeight;

      const progress = (scrollTop / scrollHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-1 w-full bg-gray-200",
        className,
      )}
    >
      <div
        className="dark:bg-white h-full bg-black transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
