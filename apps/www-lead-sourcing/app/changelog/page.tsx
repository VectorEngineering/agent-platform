import ChangelogContent from "@/components/changelog/changelog-content";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { format } from "date-fns";
import updates from "./changelog";

export const metadata: Metadata = {
  title: "Changelog | Oppulence Lead Management",
  description:
    "All the latest updates, improvements, and fixes to Oppulence Lead Management",
};

export default function ChangelogPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Changelog</h1>
        <p className="text-lg text-gray-600">
          All the latest updates, improvements, and fixes to Oppulence Lead
          Management
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://x.com/getoppulence"
            target="_blank"
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <span className="text-sm text-gray-500">Subscribe to updates</span>
        </div>
      </div>

      <div className="relative">
        {/* Timeline */}
        <div className="absolute right-0 top-0 h-full w-px bg-gray-200">
          <div className="sticky top-8 flex -translate-x-1/2 flex-col items-center">
            {updates.map((update, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`h-16 w-px ${index === 0 ? "bg-blue-500" : "bg-gray-200"}`}
                />
                <div className="group relative">
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      index === 0
                        ? "bg-white border-blue-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                  <div className="absolute left-full ml-4 hidden whitespace-nowrap group-hover:block">
                    <div className="flex items-center gap-2">
                      <time className="text-sm text-gray-500">
                        {format(new Date(update.date), "MMM d, yyyy")}
                      </time>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        {update.version}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`h-full w-px ${
                    index === updates.length - 1
                      ? "bg-transparent"
                      : "bg-gray-200"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Changelog entries */}
        <div className="divide-y divide-gray-100 pr-24">
          {updates.map((update, index) => (
            <div key={index} className="py-8">
              <Link
                href={`/changelog/${update.date.replace(/\s/g, "-").toLowerCase()}-${update.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block transition-colors hover:bg-gray-50"
              >
                <article className="space-y-4">
                  {update.screenshot ? (
                    <div className="bg-white relative flex h-[400px] w-full items-center justify-center gap-x-2 overflow-hidden rounded-lg border shadow-lg">
                      <div className="max-w-md text-2xl font-bold text-black">
                        {update.title}
                      </div>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        {update.version}
                      </span>
                    </div>
                  ) : (
                    <div className="bg-white relative flex h-[400px] w-full items-center justify-center gap-x-2 overflow-hidden rounded-lg border shadow-lg">
                      <div className="max-w-md text-2xl font-bold text-black">
                        {update.title}
                      </div>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        {update.version}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-4">
                      <time className="text-sm text-gray-500">
                        {format(new Date(update.date), "MMMM d, yyyy")}
                      </time>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        {update.version}
                      </span>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">
                      {update.title}
                    </h2>
                    <div className="mt-2 line-clamp-2 text-gray-600">
                      <ChangelogContent entry={update} />
                    </div>
                  </div>
                </article>
              </Link>
              {update.documentationUrl && (
                <div className="mt-4">
                  <Link
                    href={update.documentationUrl}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Documentation →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
