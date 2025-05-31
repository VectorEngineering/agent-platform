// Components
import MasterPlanComponent from "@/components/masterplan";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Master Plan | AI-Powered Lead Sourcing",
  description:
    "Our secret master plan for revolutionizing lead sourcing and sales automation for small businesses.",
  canonical: "/masterplan",
  ogImage: "/images/masterplan-og.jpg",
});

export default function MasterPlanPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <section className="mx-auto max-w-5xl">
        <Suspense fallback={<MasterPlanSkeleton />}>
          <MasterPlanComponent />
        </Suspense>
      </section>
    </main>
  );
}

function MasterPlanSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-12 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-full max-w-3xl rounded-lg" />
        <Skeleton className="h-6 w-full max-w-3xl rounded-lg" />
      </div>

      <div className="space-y-6 pt-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-full rounded-lg" />
          </div>
        ))}

        <div className="space-y-4 pt-4">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
