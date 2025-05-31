// Components
import MasterPlanPartDeuxComponent from "@/components/masterplan-part-deux";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Master Plan, Part Deux | AI-Powered Lead Sourcing",
  description:
    "Our expanded vision for revolutionizing sales automation and building autonomous engagement for small businesses.",
  canonical: "/masterplan-part-deux",
  ogImage: "/images/masterplan-part-deux-og.jpg",
});

export default function MasterPlanPartDeuxPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <section className="mx-auto max-w-5xl">
        <Suspense fallback={<MasterPlanPartDeuxSkeleton />}>
          <MasterPlanPartDeuxComponent />
        </Suspense>
      </section>
    </main>
  );
}

function MasterPlanPartDeuxSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-12 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-full max-w-3xl rounded-lg" />
        <Skeleton className="h-6 w-full max-w-3xl rounded-lg" />
      </div>

      <div className="space-y-6 pt-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-full rounded-lg" />
          </div>
        ))}

        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4 pt-6">
            <Skeleton className="h-8 w-72 rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
