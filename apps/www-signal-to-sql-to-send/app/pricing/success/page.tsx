import { Metadata } from "next/types";
import PricingSuccess from "@/components/pricing-success";
import { constructMetadata } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = constructMetadata({
  title: "Pricing success",
  description: "The pricing success page for Oppulence.",
  canonical: "/pricing/success",
});

export default async function Pricing() {
  const supabase = createClient();

  return (
    <>
      <PricingSuccess />
    </>
  );
}
