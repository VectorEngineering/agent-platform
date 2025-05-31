"use client";

import { LayoutGrid, List } from "lucide-react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

type ViewMode = "kanban" | "timeline";

interface RoadmapViewToggleContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const RoadmapViewToggleContext =
  createContext<RoadmapViewToggleContextType | null>(null);

function useRoadmapViewToggle() {
  const context = useContext(RoadmapViewToggleContext);
  if (!context) {
    throw new Error(
      "useRoadmapViewToggle must be used within a RoadmapViewToggleProvider",
    );
  }
  return context;
}

interface RoadmapViewToggleProps {
  defaultView?: ViewMode;
}

function RoadmapViewToggle({ defaultView = "kanban" }: RoadmapViewToggleProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get the view from URL or use default
  const viewParam = searchParams?.get("view") as ViewMode | null;
  const currentView = viewParam === "timeline" ? "timeline" : "kanban";

  const setViewMode = (mode: ViewMode) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("view", mode);

    // Ensure we preserve all other parameters
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2 rounded-md bg-muted/50 p-1">
      <Button
        variant={currentView === "kanban" ? "default" : "ghost"}
        size="sm"
        onClick={() => setViewMode("kanban")}
        className="h-8 px-2 text-xs"
      >
        <LayoutGrid className="mr-1 h-4 w-4" />
        Kanban
      </Button>
      <Button
        variant={currentView === "timeline" ? "default" : "ghost"}
        size="sm"
        onClick={() => setViewMode("timeline")}
        className="h-8 px-2 text-xs"
      >
        <List className="mr-1 h-4 w-4" />
        Timeline
      </Button>
    </div>
  );
}

interface RoadmapViewToggleContentProps {
  kanbanView: ReactNode;
  timelineView: ReactNode;
}

function RoadmapViewToggleContent({
  kanbanView,
  timelineView,
}: RoadmapViewToggleContentProps) {
  const searchParams = useSearchParams();
  const viewParam = searchParams?.get("view") as ViewMode | null;
  const currentView = viewParam === "timeline" ? "timeline" : "kanban";

  return <div>{currentView === "kanban" ? kanbanView : timelineView}</div>;
}

RoadmapViewToggle.Content = RoadmapViewToggleContent;

export { RoadmapViewToggle };
