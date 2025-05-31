"use client";

import { ChangelogEntry } from "@/app/changelog/changelog";
import { FC } from "react";

interface ChangelogContentProps {
  entry: ChangelogEntry;
}

const ChangelogContent: FC<ChangelogContentProps> = ({ entry }) => {
  // If the description is a string, render it as markdown-formatted text
  if (typeof entry.description === "string") {
    return (
      <div className="prose prose-gray max-w-none dark:prose-invert">
        {/* For simplicity, just render the string directly for now */}
        <div
          dangerouslySetInnerHTML={{
            __html: formatMarkdown(entry.description),
          }}
        />
      </div>
    );
  }

  // If it's already a React node (from hardcoded entries), render it directly
  return <>{entry.description}</>;
};

// Simple function to format markdown
function formatMarkdown(text: string): string {
  // First, escape HTML
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Format headers
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");

  // Format bold text
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Format paragraphs
  html = html
    .split("\n\n")
    .map((p) => `<p>${p}</p>`)
    .join("");

  // Format lists
  html = html.replace(/^- (.*$)/gm, "<li>$1</li>");
  html = html.replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>");

  // Combine consecutive ul elements
  html = html.replace(/<\/ul>\s*<ul>/g, "");

  return html;
}

export default ChangelogContent;
