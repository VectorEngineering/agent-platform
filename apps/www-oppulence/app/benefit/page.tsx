// Components
import AboutComponent from "@/components/about";
import BenefitsSection from "@/components/hero/BenefitsSection";
import FeatureShowcase from "@/components/hero/FeatureShowcase";
import Features from "@/components/features";
import HowItWorks from "@/components/hero/HowItWorks";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Benefits | Oppulence",
  description:
    "Learn about the benefits of Oppulence and how it can help you grow your business.",
  canonical: "/benefit",
  ogImage: "/images/about-og.jpg",
});

export default function BenefitPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <section className="max-w-8xl mx-auto">
        <Suspense fallback={<BenefitSkeleton />}>
          <BenefitsSection />
        </Suspense>
      </section>
    </main>
  );
}

function BenefitSkeleton() {
  return (
    <div className="bg-white relative space-y-24 py-32 dark:bg-black">
      {/* Background effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-[50%] -top-[50%] h-[200%] w-[200%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_45%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,rgba(0,0,0,0)_45%)]"></div>
        <div className="absolute bottom-0 right-0 h-[50%] w-[70%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.02)_0,rgba(0,0,0,0)_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.02)_0,rgba(0,0,0,0)_50%)]"></div>
      </div>

      {/* Header skeleton */}
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mb-16 flex flex-col items-center space-y-6">
          <div className="dark:bg-white/10 h-8 w-40 animate-pulse rounded-full bg-black/10"></div>
          <Skeleton className="h-14 w-3/4 rounded-lg md:w-1/2" />
          <Skeleton className="h-6 w-full max-w-2xl rounded-lg" />
          <Skeleton className="h-6 w-2/3 max-w-2xl rounded-lg" />
        </div>

        {/* Books grid skeleton */}
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="perspective-1000 relative h-[450px]">
              {/* Book spine skeleton */}
              <div className="book-spine animate-pulse"></div>

              {/* Book page edge - randomly show on some books */}
              {idx % 3 === 0 && <div className="book-page-edge"></div>}

              {/* Book cover skeleton */}
              <div className="book-cover flex flex-col justify-between p-6">
                {/* Icon skeleton */}
                <div>
                  <div className="dark:bg-white/5 mb-6 h-14 w-14 animate-pulse rounded-xl bg-black/5 p-4"></div>

                  {/* Title skeleton */}
                  <Skeleton className="mb-3 h-7 w-4/5 rounded-lg" />

                  {/* Description skeleton */}
                  <Skeleton className="mb-1 h-4 w-full rounded-lg" />
                  <Skeleton className="mb-1 h-4 w-full rounded-lg" />
                  <Skeleton className="mb-5 h-4 w-4/5 rounded-lg" />
                </div>

                {/* Stats badge skeleton */}
                <div>
                  <div className="dark:bg-white/5 inline-flex animate-pulse items-center gap-2 rounded-lg bg-black/5 px-3 py-1.5">
                    <div className="h-6 w-16 rounded-lg"></div>
                    <div className="h-4 w-24 rounded-lg"></div>
                  </div>

                  {/* Open instruction skeleton */}
                  <div className="mt-3 flex animate-pulse items-center justify-center gap-1">
                    <div className="dark:bg-white/50 h-4 w-4 rounded-full bg-black/50"></div>
                    <div className="dark:bg-white/50 h-3 w-20 rounded-md bg-black/50"></div>
                  </div>
                </div>
              </div>

              {/* Book shadow effect */}
              <div className="book-shadow"></div>
            </div>
          ))}
        </div>

        {/* Quote section skeleton */}
        <div className="bg-white dark:border-white/10 relative mt-24 overflow-hidden rounded-2xl border border-black/10 p-10 dark:bg-black md:p-16">
          <div className="dark:bg-white/5 absolute right-0 top-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-black/5 opacity-50 blur-3xl"></div>
          <div className="dark:bg-white/5 absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-black/5 opacity-50 blur-3xl"></div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="dark:bg-white/20 mx-auto mb-6 h-12 w-12 animate-pulse rounded-full bg-black/20"></div>
            <Skeleton className="mb-2 h-6 w-full rounded-lg" />
            <Skeleton className="mb-2 h-6 w-full rounded-lg" />
            <Skeleton className="mx-auto mb-6 h-6 w-4/5 rounded-lg" />
            <Skeleton className="mx-auto h-4 w-32 rounded-lg" />
          </div>
        </div>

        {/* CTA skeleton */}
        <div className="mt-24 text-center">
          <div className="dark:from-white/20 dark:via-white/40 dark:to-white/20 inline-block rounded-full bg-gradient-to-r from-black/20 via-black/40 to-black/20 p-0.5">
            <div className="bg-white h-14 w-72 animate-pulse rounded-full px-8 py-4 dark:bg-black"></div>
          </div>
          <Skeleton className="mx-auto mt-4 h-4 w-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
