import { FAQContent } from "./faq-content";
import type { Metadata } from "next/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "FAQ",
  description: "Frequently Asked Questions",
  canonical: "/faq",
});

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-[10%]">
      <Suspense fallback={<FAQSkeleton />}>
        <FAQContent />
      </Suspense>
    </div>
  );
}

// Skeleton loader for FAQ content
function FAQSkeleton() {
  return (
    <div className="space-y-8">
      <div className="mb-12 text-center">
        <Skeleton className="mx-auto mb-4 h-12 w-3/4 max-w-xl" />
        <Skeleton className="mx-auto h-6 w-2/3 max-w-lg" />
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="hidden md:block">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
