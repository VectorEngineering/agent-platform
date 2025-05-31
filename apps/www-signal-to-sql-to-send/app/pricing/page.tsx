import { Metadata } from "next/types";
import PricingPage from "@/components/pricing";
import { constructMetadata } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = constructMetadata({
  title: "Pricing",
  description: "The pricing and download page for Oppulence.",
  canonical: "/pricing",
});

export default async function Pricing() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="p-[10%]">
      <PricingPage user={user} />
    </div>
  );
}
