/* eslint-disable prettier/prettier */
"use client";

import "aos/dist/aos.css";

import PageIllustration from "@/components/page-illustration";

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="grow">
        <PageIllustration />
        <div className="flex items-center justify-center p-[10%]">
          {children}
        </div>
      </main>
    </>
  );
}
