import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ClientRoadmap from "./client-roadmap";
import { Metadata } from "next";
import { RoadmapKanban } from "./roadmap-kanban";
import { RoadmapTimeline } from "./roadmap-timeline";
import { Suspense } from "react";
import { getAllRoadmapItems } from "./roadmap-utils";

export const metadata: Metadata = {
  title: "Product Roadmap | Oppulence",
  description:
    "Explore our product roadmap and upcoming features across all Oppulence products.",
};

const products = [
  { id: "all", name: "All Products" },
  { id: "lead-sourcing", name: "Lead Sourcing" },
  { id: "crm", name: "CRM" },
];

export default async function RoadmapPage() {
  const roadmapItems = await getAllRoadmapItems();

  return (
    <div className="bg-white min-h-screen">
      <div className="container py-[5%]">
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Product Roadmap
            </h1>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-lg">
              Stay up to date with our development plans and upcoming features
              across all Oppulence products.
            </p>
          </div>

          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <ClientRoadmap products={products} roadmapItems={roadmapItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
