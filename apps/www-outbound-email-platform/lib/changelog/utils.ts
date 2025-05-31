import { readFileSync, readdirSync } from "fs";

import { ChangelogEntry } from "@/app/changelog/changelog";
import { join } from "path";
import matter from "gray-matter";
import { z } from "zod";

// Schema for validating changelog entries from frontmatter
const changelogEntrySchema = z.object({
  date: z.string(),
  title: z.string(),
  version: z.string(),
  // Description is stored in the MDX content, not frontmatter
  documentationUrl: z.string().optional(),
  screenshot: z
    .object({
      src: z.string(),
      alt: z.string(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
});

// Get all changelog files
export function getChangelogFiles() {
  try {
    const changelogDirectory = join(process.cwd(), "content/changelog");
    const fileNames = readdirSync(changelogDirectory);

    return fileNames.filter((fileName) => fileName.endsWith(".mdx"));
  } catch (error) {
    console.error("Error reading changelog directory:", error);
    return [];
  }
}

// Load changelog data from markdown files
export function getChangelogData() {
  try {
    const files = getChangelogFiles();
    const changelogDirectory = join(process.cwd(), "content/changelog");

    const entries = files
      .map((fileName) => {
        try {
          // Read file content
          const fullPath = join(changelogDirectory, fileName);
          const fileContents = readFileSync(fullPath, "utf8");

          // Parse frontmatter with gray-matter
          const { data, content } = matter(fileContents);

          // Validate frontmatter using zod schema
          const validatedData = changelogEntrySchema.parse(data);

          // Create the changelog entry
          const entry: ChangelogEntry = {
            ...validatedData,
            // Use the MDX content as the description
            description: content.trim(),
          };

          return entry;
        } catch (error) {
          console.error(`Error processing changelog entry ${fileName}:`, error);
          return null;
        }
      })
      .filter((entry) => entry !== null) as ChangelogEntry[];

    // Sort entries by date (most recent first)
    return entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error loading changelog data:", error);
    return [];
  }
}
