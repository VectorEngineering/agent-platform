// Components
import AboutComponent from "@/components/about";
import FeatureShowcase from "@/components/hero/FeatureShowcase";
import Features from "@/components/features";
import HowItWorks from "@/components/hero/HowItWorks";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Features | Oppulence",
  description:
    "Learn about the features of Oppulence and how they can help you grow your business.",
  canonical: "/features",
  ogImage: "/images/about-og.jpg",
});

export default function FeaturesPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <section className="max-w-8xl mx-auto">
        <Suspense fallback={<FeaturesSkeleton />}>
          <FeatureShowcase />
        </Suspense>
      </section>
    </main>
  );
}

function FeaturesSkeleton() {
  return (
    <div className="relative space-y-40 py-32">
      {/* Background effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-[50%] -top-[50%] h-[200%] w-[200%] bg-gradient-to-r from-gray-50/5 to-transparent"></div>
      </div>

      {/* Header skeleton */}
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mb-24 flex flex-col items-center space-y-6">
          <div className="h-8 w-40 animate-pulse rounded-full bg-foreground/5"></div>
          <Skeleton className="h-14 w-3/4 rounded-lg md:w-1/2" />
          <Skeleton className="h-6 w-full max-w-2xl rounded-lg" />
          <Skeleton className="h-6 w-2/3 max-w-2xl rounded-lg" />
        </div>

        {/* Features skeletons */}
        <div className="space-y-40">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
            >
              <div className="w-full space-y-6 p-4 lg:w-1/2">
                {/* Tags skeleton */}
                <div className="mb-6 flex flex-wrap gap-2">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-foreground/5"></div>
                  <div className="h-6 w-24 animate-pulse rounded-full bg-foreground/5"></div>
                  <div className="h-6 w-16 animate-pulse rounded-full bg-foreground/5"></div>
                </div>

                {/* Title and description skeletons */}
                <Skeleton className="h-10 w-4/5 rounded-lg" />
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4 rounded-lg" />

                {/* Quote/extended description skeleton */}
                <div className="mt-8 space-y-3 rounded-lg border border-foreground/10 bg-foreground/5 p-4">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-4/5 rounded-lg" />
                </div>

                {/* Highlight skeleton */}
                <div className="mt-8 flex items-center gap-2 rounded-lg border-l-2 border-foreground/10 bg-foreground/5 p-3">
                  <div className="h-5 w-5 animate-pulse rounded-full bg-foreground/10"></div>
                  <Skeleton className="h-5 w-4/5 rounded-lg" />
                </div>

                {/* Stats skeleton */}
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-foreground/5 bg-foreground/5 p-4 backdrop-blur-sm"
                    >
                      <Skeleton className="mb-2 h-8 w-16 rounded-lg" />
                      <Skeleton className="h-4 w-full rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Media skeleton */}
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 shadow-md lg:w-1/2">
                <div className="h-full w-full animate-pulse bg-gradient-to-br from-foreground/5 to-foreground/10"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Breakdown skeleton */}
        <div className="mt-40">
          <div className="mb-16 space-y-4 text-center">
            <Skeleton className="mx-auto h-10 w-1/3 rounded-lg" />
            <Skeleton className="mx-auto h-5 w-2/3 rounded-lg" />
          </div>

          <div className="space-y-24">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5"
              >
                <div className="border-b border-foreground/10 p-8">
                  <Skeleton className="mb-3 h-8 w-2/5 rounded-lg" />
                  <Skeleton className="h-5 w-4/5 rounded-lg" />
                </div>

                <div className="grid gap-8 p-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-foreground/10"></div>
                        <Skeleton className="h-5 w-3/4 rounded-lg" />
                      </div>
                      <Skeleton className="h-4 w-full rounded-lg" />
                      <Skeleton className="h-4 w-full rounded-lg" />
                      <Skeleton className="h-4 w-4/5 rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats banner skeleton */}
        <div className="mt-32 rounded-2xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm md:p-12">
          <Skeleton className="mx-auto mb-8 h-8 w-1/3 rounded-lg" />
          <div className="grid gap-8 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="mx-auto mb-2 h-10 w-20 rounded-lg" />
                <Skeleton className="mx-auto h-5 w-4/5 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA skeleton */}
        <div className="mt-32 text-center">
          <div className="inline-block rounded-full bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 p-0.5">
            <div className="h-14 w-64 animate-pulse rounded-full bg-background px-8 py-4"></div>
          </div>
          <Skeleton className="mx-auto mt-4 h-4 w-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
