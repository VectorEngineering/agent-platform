import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Change Log",
  description: "Stay up to date with the latest features and improvements.",
  canonical: "/changelog",
});
