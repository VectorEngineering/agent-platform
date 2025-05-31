"use client";

import { RoadmapItem, RoadmapStatus } from "./types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  format,
  isAfter,
  isBefore,
  isWithinInterval,
  parseISO,
  startOfMonth,
  startOfQuarter,
  startOfYear,
} from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface RoadmapTimelineProps {
  items: RoadmapItem[];
}

const statusColors = {
  planned: "bg-yellow-500",
  "in-progress": "bg-blue-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
} as const;

const statusLabels = {
  planned: "Planned",
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
} as const;

// Status to emoji mapping
const statusEmoji = {
  planned: "🎯",
  "in-progress": "🚀",
  completed: "✅",
  cancelled: "❌",
};

// Product to emoji mapping
const productEmoji = {
  "Lead Sourcing": "🎯",
  "Contract Management": "📝",
  "Financial Management": "💰",
  CRM: "🤝",
};

function RoadmapTimelineItem({ item }: { item: RoadmapItem }) {
  return (
    <Sheet>
      <SheetTrigger className="w-full text-left">
        <div className="relative pl-12">
          <div
            className={cn(
              "absolute left-2 top-2 h-4 w-4 rounded-full border-2 border-background",
              statusColors[item.status],
            )}
          />
          <Card className="w-full cursor-pointer p-4 transition-all hover:shadow-md">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xl"
                    role="img"
                    aria-label={item.product}
                    title={item.product}
                  >
                    {productEmoji[item.product as keyof typeof productEmoji] ||
                      "📦"}
                  </span>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      item.status === "planned" &&
                        "border-yellow-500 text-yellow-500",
                      item.status === "in-progress" &&
                        "border-blue-500 text-blue-500",
                      item.status === "completed" &&
                        "border-green-500 text-green-500",
                      item.status === "cancelled" &&
                        "border-red-500 text-red-500",
                    )}
                  >
                    {statusLabels[item.status]}
                  </Badge>
                  <time className="text-xs text-muted-foreground">
                    {format(new Date(item.date), "MMM d, yyyy")}
                  </time>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              {item.features && item.features.length > 0 && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">Key Features:</span>
                    <span className="text-xs text-muted-foreground">
                      ({item.features.length})
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {item.features.slice(0, 2).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-1.5 text-xs text-muted-foreground"
                      >
                        <span className="mt-0.5 text-[10px]">•</span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {item.features.length > 2 && (
                      <li className="pl-3 text-xs italic text-muted-foreground">
                        +{item.features.length - 2} more...
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>
      </SheetTrigger>
      <SheetContent className="m-[1%] w-[90vw] overflow-y-auto rounded-2xl p-6 pt-8 md:min-w-[30%]">
        <SheetHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={item.status}>
              {statusEmoji[item.status as keyof typeof statusEmoji]}
            </span>
            <SheetTitle className="text-xl">{item.title}</SheetTitle>
          </div>
          <p className="text-base text-muted-foreground">{item.description}</p>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              {item.product}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1.5",
                item.status === "planned" &&
                  "border-yellow-500 text-yellow-500",
                item.status === "in-progress" &&
                  "border-blue-500 text-blue-500",
                item.status === "completed" &&
                  "border-green-500 text-green-500",
                item.status === "cancelled" && "border-red-500 text-red-500",
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  item.status === "planned" && "bg-yellow-500",
                  item.status === "in-progress" && "bg-blue-500",
                  item.status === "completed" && "bg-green-500",
                  item.status === "cancelled" && "bg-red-500",
                )}
              ></span>
              {statusLabels[item.status]}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              {format(new Date(item.date), "MMM d, yyyy")}
            </Badge>
          </div>

          {item.features && item.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Key Features</h3>
              <ul className="space-y-2">
                {item.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-0.5 text-xs">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function RoadmapTimeline({ items }: RoadmapTimelineProps) {
  const searchParams = useSearchParams();

  // Get filter values from URL or use defaults
  const searchTerm = searchParams?.get("search") ?? "";
  const statusFilter = searchParams?.get("status") ?? "all";
  const dateFilter = searchParams?.get("date") ?? "all";

  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          item.product.toLowerCase().includes(search) ||
          item.features?.some((feature) =>
            feature.toLowerCase().includes(search),
          ),
      );
    }

    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter && dateFilter !== "all") {
      const now = new Date();

      filtered = filtered.filter((item) => {
        const itemDate = parseISO(item.date);

        switch (dateFilter) {
          case "upcoming":
            return isAfter(itemDate, now);
          case "past":
            return isBefore(itemDate, now);
          case "this-month":
            return (
              isWithinInterval(itemDate, {
                start: startOfMonth(now),
                end: now,
              }) || isAfter(itemDate, now)
            );
          case "this-quarter":
            return (
              isWithinInterval(itemDate, {
                start: startOfQuarter(now),
                end: now,
              }) || isAfter(itemDate, now)
            );
          case "this-year":
            return (
              isWithinInterval(itemDate, {
                start: startOfYear(now),
                end: now,
              }) || isAfter(itemDate, now)
            );
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [items, searchTerm, statusFilter, dateFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [filteredItems]);

  if (sortedItems.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed p-8">
        <p className="text-center text-muted-foreground">
          No roadmap items match your filters
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
      <div className="space-y-6">
        {sortedItems.map((item, index) => (
          <RoadmapTimelineItem key={`${item.title}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
