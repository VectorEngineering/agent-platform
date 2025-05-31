import { Card, CardContent } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { normalizeDate } from "@/lib/utils";

interface PostCardProps {
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  url: string;
  slug: string;
  className?: string;
  tags?: string[];
}

const PostCard = ({
  title,
  date,
  excerpt,
  thumbnail,
  slug,
  className,
  tags = [],
}: PostCardProps) => (
  <Card
    className={cn(
      "bg-white dark:hover:border-white flex h-full flex-col overflow-hidden rounded-xl border-2 border-gray-200 shadow-md transition-all duration-300 hover:border-black hover:shadow-document dark:border-gray-800 dark:bg-gray-900",
      className,
    )}
  >
    <Link href={`/blog/${slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/0 to-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
        <Image
          fill
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-grow flex-col p-6">
        <div className="mb-3 flex items-center justify-between">
          <time
            dateTime={date}
            className="text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            {format(parseISO(normalizeDate(date)), "LLLL d, yyyy")}
          </time>
          {tags.includes("featured") && (
            <span className="dark:bg-white/10 dark:text-white inline-flex items-center rounded-full bg-black/10 px-2.5 py-0.5 text-xs font-medium text-black">
              Featured
            </span>
          )}
        </div>
        <h2 className="dark:group-hover:text-white mb-3 text-xl font-semibold transition-colors group-hover:text-black">
          {title}
        </h2>
        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {excerpt}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {tags
            .filter((tag) => tag !== "featured")
            .slice(0, 3)
            .map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="dark:text-white mt-4 text-sm font-medium text-black group-hover:underline">
          Read article →
        </div>
      </CardContent>
    </Link>
  </Card>
);

export default PostCard;
