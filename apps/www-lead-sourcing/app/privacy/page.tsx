import { Metadata } from "next/types";
// src/app/privacy-policy/page.tsx
import PrivacyPolicyComponent from "@/components/privacy-policy";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description: "The privacy policy for Oppulence.",
  canonical: "/privacy",
});

export default function PrivacyPolicy() {
  return (
    <div className="py-[5%]">
      <PrivacyPolicyComponent />
    </div>
  );
}
