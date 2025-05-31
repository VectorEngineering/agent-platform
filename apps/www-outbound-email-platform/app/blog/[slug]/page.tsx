import { cn, constructMetadata, normalizeDate } from "@/lib/utils";
import { format, parseISO } from "date-fns";

import { ArrowLeft } from "lucide-react";
import { BlogPost } from "@/lib/blog/types";
import BlogPostContent from "@/components/blog/BlogPostContent";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import MobileTableOfContents from "@/components/blog/MobileTableOfContents";
import ReadingProgress from "@/components/reading-progress";
import { notFound } from "next/navigation";
import { posts } from "@/lib/blog/posts";

export const generateStaticParams = async () =>
  (posts as BlogPost[]).map((post) => ({
    slug: post.url.split("/").pop(),
  }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = (posts as BlogPost[]).find((post) => post.url.endsWith(slug));

  if (!post) notFound();

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: post.url,
    ogImage: post.thumbnail,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = (posts as BlogPost[]).find((post) => post.url.endsWith(slug));

  if (!post) notFound();

  return (
    <div className="to-white relative bg-gradient-to-b from-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-document-pattern opacity-[0.015] dark:opacity-[0.03]" />

      {/* Reading progress bar - fixed at the top */}
      <ReadingProgress className="fixed left-0 top-0 z-50 w-full" />

      <div className="relative mx-auto max-w-7xl px-4 py-[12%] sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl">
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="bg-white dark:hover:border-white dark:hover:bg-white/5 group inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-black hover:bg-black/5 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </div>
          {/* Article header */}
          <header className="mb-12 border-b-2 border-gray-200 pb-8 text-center dark:border-gray-800">
            {/* Metadata */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
              <time
                dateTime={post.date}
                className="bg-white rounded-full border-2 border-gray-200 px-4 py-1 text-sm font-medium text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              >
                {format(parseISO(normalizeDate(post.date)), "LLLL d, yyyy")}
              </time>

              {post.readingTime && (
                <span className="bg-white rounded-full border-2 border-gray-200 px-4 py-1 text-sm font-medium text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                  {post.readingTime} read
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="dark:from-white dark:to-white mb-6 bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-4xl font-bold text-transparent dark:via-gray-300 sm:text-5xl md:text-6xl">
              {post.title}
            </h1>

            {/* Author */}
            {post.author && (
              <div className="mb-8 flex items-center justify-center">
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  By{" "}
                  <span className="dark:text-white font-medium text-black">
                    {post.author}
                  </span>
                </span>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white dark:hover:border-white dark:hover:bg-white/5 rounded-full border-2 border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-black hover:bg-black/5 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Featured image */}
            <div className="bg-white relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-xl border-2 border-gray-200 shadow-document dark:border-gray-800 dark:bg-gray-900">
              <Image
                fill
                src={post.thumbnail || ""}
                alt={post.title || "Blog post thumbnail"}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </header>

          {/* Mobile table of contents - only visible on mobile/tablet */}
          <div className="mb-8 lg:hidden">
            <MobileTableOfContents content={post.content} />
          </div>

          {/* Article content with table of contents */}
          <BlogPostContent content={post.content} />

          {/* Article footer */}
          <footer className="mt-16 border-t-2 border-gray-200 pt-8 dark:border-gray-800">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
              <h3 className="dark:text-white mb-4 text-xl font-semibold text-black">
                Share this article
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white dark:hover:border-white dark:hover:bg-white/5 rounded-full border-2 border-gray-200 p-2 shadow-sm transition-colors hover:border-black hover:bg-black/5 dark:border-gray-800 dark:bg-gray-900">
                  <svg
                    className="dark:text-white h-5 w-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="bg-white dark:hover:border-white dark:hover:bg-white/5 rounded-full border-2 border-gray-200 p-2 shadow-sm transition-colors hover:border-black hover:bg-black/5 dark:border-gray-800 dark:bg-gray-900">
                  <svg
                    className="dark:text-white h-5 w-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="bg-white dark:hover:border-white dark:hover:bg-white/5 rounded-full border-2 border-gray-200 p-2 shadow-sm transition-colors hover:border-black hover:bg-black/5 dark:border-gray-800 dark:bg-gray-900">
                  <svg
                    className="dark:text-white h-5 w-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="bg-white dark:hover:border-white dark:hover:bg-white/5 rounded-full border-2 border-gray-200 p-2 shadow-sm transition-colors hover:border-black hover:bg-black/5 dark:border-gray-800 dark:bg-gray-900">
                  <svg
                    className="dark:text-white h-5 w-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Next/Previous navigation */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/blog"
                className="bg-white dark:hover:border-white dark:hover:bg-white/5 flex items-center justify-center rounded-xl border-2 border-gray-200 p-4 shadow-md transition-all hover:border-black hover:bg-black/5 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="font-medium">Back to all articles</span>
                </div>
              </Link>

              <Link
                href="/blog"
                className="bg-white dark:hover:border-white dark:hover:bg-white/5 flex items-center justify-center rounded-xl border-2 border-gray-200 p-4 shadow-md transition-all hover:border-black hover:bg-black/5 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Explore more articles</span>
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </div>
              </Link>
            </div>
          </footer>
        </article>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: post.thumbnail,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: post.author,
            },
          }),
        }}
      />
    </div>
  );
}
