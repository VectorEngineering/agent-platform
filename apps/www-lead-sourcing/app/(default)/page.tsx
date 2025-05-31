import AboutComponent from "@/components/about";
import Features from "@/components/features";
import Hero from "@/components/hero";
import { Metadata } from "next/types";
import { Suspense } from "react";
import Try from "@/components/try";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  canonical: "/",
});

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <section className="mx-auto max-w-5xl">
        <Suspense fallback={<Hero />}>
          <Hero />
        </Suspense>
      </section>
    </main>
    // <>
    //   <Hero />
    //   {/* <Features /> */}
    //   {/* <Try /> */}
    // </>
  );
}
