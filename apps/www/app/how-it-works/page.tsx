// Components
import AboutComponent from "@/components/about";
import HowItWorks from "@/components/hero/HowItWorks";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "How It Works | Oppulence",
  description:
    "Learn how Oppulence works and how it can help you grow your business.",
  canonical: "/how-it-works",
  ogImage: "/images/about-og.jpg",
});

export default function HowItWorksPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <section className="mx-auto max-w-7xl">
        <Suspense fallback={<HowItWorksSkeleton />}>
          <HowItWorks />
        </Suspense>
      </section>
    </main>
  );
}

function HowItWorksSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-12 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-full max-w-3xl rounded-lg" />
        <Skeleton className="h-6 w-full max-w-3xl rounded-lg" />
      </div>

      <div className="space-y-6 pt-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
