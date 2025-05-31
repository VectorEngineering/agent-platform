import { Metadata } from "next/types";
// src/app/privacy-policy/page.tsx
import TermsOfServiceComponent from "@/components/terms-of-service";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description: "The terms of service for Oppulence.",
  canonical: "/terms-of-service",
});

export default function TermsOfService() {
  return (
    <div className="py-[5%]">
      <TermsOfServiceComponent />
    </div>
  );
}
