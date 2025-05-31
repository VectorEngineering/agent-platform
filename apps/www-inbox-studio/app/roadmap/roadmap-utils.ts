import { RoadmapItem } from "./types";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";

const roadmapDirectory = path.join(process.cwd(), "content/roadmap");

export async function getAllRoadmapItems(): Promise<RoadmapItem[]> {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(roadmapDirectory)) {
    fs.mkdirSync(roadmapDirectory, { recursive: true });
  }

  const files = fs.readdirSync(roadmapDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const items: RoadmapItem[] = [];

  for (const file of mdxFiles) {
    const filePath = path.join(roadmapDirectory, file);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { frontmatter } = await compileMDX<RoadmapItem>({
      source: fileContent,
      options: { parseFrontmatter: true },
    });

    if (
      frontmatter &&
      typeof frontmatter.title === "string" &&
      typeof frontmatter.description === "string" &&
      typeof frontmatter.date === "string" &&
      typeof frontmatter.status === "string" &&
      typeof frontmatter.product === "string"
    ) {
      items.push(frontmatter as RoadmapItem);
    }
  }

  return items;
}

// Helper function to create a new roadmap item
export async function createRoadmapItem(item: RoadmapItem, filename: string) {
  const mdxContent = `---
title: ${item.title}
description: ${item.description}
date: ${item.date}
status: ${item.status}
product: ${item.product}
features:
${item.features?.map((feature) => `  - ${feature}`).join("\n") || ""}
---

${item.description}
`;

  const filePath = path.join(roadmapDirectory, `${filename}.mdx`);
  fs.writeFileSync(filePath, mdxContent);
}
