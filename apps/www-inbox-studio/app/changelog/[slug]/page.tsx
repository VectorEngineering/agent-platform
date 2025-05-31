// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import React from "react";
import { format, parse } from "date-fns";
import { notFound } from "next/navigation";
import {
  ChevronLeftIcon,
  CalendarIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { Suspense } from "react";
import updates, { ChangelogEntry } from "../changelog";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import ShareButtons from "./share-buttons";
import ChangelogContent from "@/components/changelog/changelog-content";

// Helper functions
function generateSlug(update: { date: string; title: string }): string {
  return `${update.date.replace(/\s/g, "-").toLowerCase()}-${update.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")}`;
}

function findUpdateBySlug(slug: string): ChangelogEntry | undefined {
  return updates.find((update) => generateSlug(update) === slug);
}

function getRelatedUpdates(currentUpdate: ChangelogEntry): ChangelogEntry[] {
  // Get 2 most recent updates excluding the current one
  return updates
    .filter((update) => update.title !== currentUpdate.title)
    .slice(0, 2);
}

// Parse date strings like "1 December 2024" to a Date object
function parseChangelogDate(dateString: string): Date {
  try {
    return parse(dateString, "d MMMM yyyy", new Date());
  } catch (error) {
    console.error(`Error parsing date: ${dateString}`, error);
    return new Date(); // Fallback to current date
  }
}

// Format a date for display
function formatChangelogDate(dateString: string): string {
  try {
    const date = parseChangelogDate(dateString);
    return format(date, "MMMM d, yyyy");
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return dateString; // Fallback to original string
  }
}

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Ensure params is properly awaited
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const update = findUpdateBySlug(slug);

  if (!update) {
    return {
      title: "Not Found | Oppulence Lead Management",
      description: "The requested changelog entry could not be found.",
    };
  }

  const description =
    typeof update.description === "string"
      ? update.description.substring(0, 150) + "..."
      : "Read about the latest updates and improvements to Oppulence Lead Management.";

  return {
    title: `${update.title} | Oppulence Lead Management Changelog`,
    description,
    openGraph: {
      title: `${update.title} | Oppulence Lead Management Changelog`,
      description,
      type: "article",
      publishedTime: update.date,
      images: update.screenshot
        ? [
            {
              url: update.screenshot.src,
              width: update.screenshot.width,
              height: update.screenshot.height,
              alt: update.screenshot.alt,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: update.title,
      description,
      images: update.screenshot ? [update.screenshot.src] : [],
    },
  };
}

export default async function ChangelogEntry({ params }: PageProps) {
  // Ensure params is properly awaited
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const update = findUpdateBySlug(slug);

  if (!update) {
    notFound();
  }

  const relatedUpdates = getRelatedUpdates(update);
  const formattedDate = formatChangelogDate(update.date);
  const shareUrl = `https://Oppulence-lead.com/changelog/${slug}`;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <Link
          href="/changelog"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "inline-flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-700",
          )}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to Changelog
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs">
            {update.version}
          </Badge>
          <time
            dateTime={update.date}
            className="flex items-center gap-1 text-sm text-gray-500"
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            {formattedDate}
          </time>
        </div>
      </div>

      <article className="space-y-10">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {update.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="border-white relative h-10 w-10 overflow-hidden rounded-full border-2 shadow-sm">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                }}
                className="flex h-full w-full items-center justify-center object-cover"
              >
                Y
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Yoan Yomba</p>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>
          </div>
        </header>

        <Suspense fallback={<ImageSkeleton />}>
          {update.screenshot ? (
            <div className="overflow-hidden rounded-2xl border bg-gray-50 shadow-lg transition-all hover:shadow-xl">
              <div className="bg-white relative flex h-[400px] w-full items-center justify-center gap-x-2 overflow-hidden rounded-lg border shadow-lg">
                <div className="text-3xl font-bold text-black">
                  {update.title}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border shadow-lg">
              <div className="bg-white relative flex h-[400px] w-full items-center justify-center gap-x-2 overflow-hidden rounded-lg border shadow-lg">
                <div className="text-3xl font-bold text-black">
                  {update.title}
                </div>
              </div>
            </div>
          )}
        </Suspense>

        <div className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-lead:text-gray-700">
          <ChangelogContent entry={update} />
        </div>

        {update.documentationUrl && (
          <div className="to-white overflow-hidden rounded-lg border bg-gradient-to-br from-gray-50 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h2 className="mb-2 text-lg font-semibold">Learn More</h2>
                <p className="text-gray-600">
                  Check out our documentation to learn more about this feature.
                </p>
              </div>
              <Link
                href={update.documentationUrl}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "inline-flex items-center gap-2",
                )}
              >
                View Documentation
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        <hr className="my-8 border-t border-gray-200" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Share this update:
            </span>
            <ShareButtons url={shareUrl} title={update.title} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Released in:
            </span>
            <Badge variant="outline" className="font-mono">
              {update.version}
            </Badge>
          </div>
        </div>
      </article>

      {relatedUpdates.length > 0 && (
        <div className="mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Related Updates</h2>
            <Link
              href="/changelog"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              View all updates
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedUpdates.map((relatedUpdate) => (
              <RelatedUpdateCard
                key={relatedUpdate.title}
                update={relatedUpdate}
              />
            ))}
          </div>
        </div>
      )}

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: update.title,
            datePublished: update.date,
            dateModified: update.date,
            image: update.screenshot ? [update.screenshot.src] : [],
            author: {
              "@type": "Person",
              name: "Yoan Yomba",
              url: "https://Oppulence-lead.com/team/yoan-yomba",
            },
          }),
        }}
      />
    </div>
  );
}

// Client components
function ImageSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-gray-50 shadow-lg">
      <div className="relative aspect-video w-full">
        <Skeleton className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-12 w-12 animate-spin text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

interface RelatedUpdateCardProps {
  update: ChangelogEntry;
}

function RelatedUpdateCard({ update }: RelatedUpdateCardProps) {
  const slug = generateSlug(update);
  const formattedDate = formatChangelogDate(update.date);

  return (
    <Link
      href={`/changelog/${slug}`}
      className="bg-white group flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {update.screenshot ? (
        <div className="flex aspect-video w-full items-center justify-center overflow-hidden bg-gray-100">
          <div className="text-md font-bold text-black">{update.title}</div>
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-400">No image</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs">
            {update.version}
          </Badge>
          <time
            dateTime={update.date}
            className="flex items-center gap-1 text-xs text-gray-500"
          >
            <CalendarIcon className="h-3 w-3" />
            {formattedDate}
          </time>
        </div>
        <h3 className="mt-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {update.title}
        </h3>
        <div className="mt-2 flex items-center text-sm text-blue-600">
          <span className="group-hover:underline">Read more</span>
          <ChevronLeftIcon className="ml-1 h-3 w-3 rotate-180" />
        </div>
      </div>
    </Link>
  );
}

export async function generateStaticParams() {
  // Pre-generate all changelog pages
  return updates.map((update) => ({
    slug: generateSlug(update),
  }));
}
