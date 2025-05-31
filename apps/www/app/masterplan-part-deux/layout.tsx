/* eslint-disable prettier/prettier */
"use client";

import "aos/dist/aos.css";

import AOS from "aos";
import PageIllustration from "@/components/page-illustration";
import { useEffect } from "react";

export default function MasterPlanPartDeuxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

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
