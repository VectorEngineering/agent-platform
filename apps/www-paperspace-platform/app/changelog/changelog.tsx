import type React from "react";
import { getChangelogData } from "@/lib/changelog/utils";

export type ChangelogEntry = {
  date: string;
  title: string;
  description: React.ReactNode;
  version: string;
  screenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  documentationUrl?: string;
};

// Default entries in case MDX loading fails
const defaultEntries: ChangelogEntry[] = [
  {
    date: "15 February 2025",
    title: "AI-Powered Lead Scraping Engine",
    version: "v0.0.3",
    documentationUrl: "",
    description:
      "Our most significant update yet introduces our core lead generation capabilities, using sophisticated AI algorithms to automatically discover and enrich potential customer leads for your business.",
  },
  {
    date: "23 January 2025",
    title: "Team Workspaces",
    version: "v0.0.2",
    documentationUrl: "",
    description:
      "This release introduces comprehensive team workspace functionality, enabling seamless collaboration for small businesses with multiple team members working on lead generation and sales.",
  },
  {
    date: "15 January 2025",
    title: "User Authentication",
    version: "v0.0.1",
    documentationUrl: "",
    description:
      "Our first version introduces a robust, secure authentication system that forms the foundation of our AI-powered lead generation platform.",
  },
];

// Load changelog entries from MDX files with fallback to default entries
let updates: ChangelogEntry[] = [];

try {
  updates = getChangelogData();
  // If no entries were loaded, fall back to defaults
  if (updates.length === 0) {
    updates = defaultEntries;
  }
} catch (error) {
  console.error("Error loading changelog data:", error);
  updates = defaultEntries;
}

export default updates;
