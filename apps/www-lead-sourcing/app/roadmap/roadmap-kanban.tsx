"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
  subDays,
} from "date-fns";

import { Badge } from "@/components/ui/badge";
import { RoadmapItem } from "./types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

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

interface RoadmapKanbanProps {
  items: RoadmapItem[];
}

function RoadmapDetailSheet({ item }: { item: RoadmapItem }) {
  return (
    <SheetContent className="m-[1%] w-[90vw] overflow-y-auto rounded-2xl p-6 pt-8 md:min-w-[30%]">
      <SheetHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={item.status}>
            {statusEmoji[item.status as keyof typeof statusEmoji]}
          </span>
          <SheetTitle className="text-xl">{item.title}</SheetTitle>
        </div>
        <SheetDescription className="text-base">
          {item.description}
        </SheetDescription>
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
              item.status === "planned" && "border-yellow-500 text-yellow-500",
              item.status === "in-progress" && "border-blue-500 text-blue-500",
              item.status === "completed" && "border-green-500 text-green-500",
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
            {item.status === "in-progress"
              ? "In Progress"
              : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
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
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  return (
    <Sheet>
      <SheetTrigger className="w-full text-left">
        <Card
          className={cn(
            "w-full cursor-pointer transition-all hover:shadow-md",
            item.status === "cancelled" && "opacity-60",
          )}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="line-clamp-2 text-base">
                  {item.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                  {item.description}
                </CardDescription>
              </div>
              <span
                className="text-xl"
                role="img"
                aria-label={item.product}
                title={item.product}
              >
                {productEmoji[item.product as keyof typeof productEmoji] ||
                  "📦"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
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
                  item.status === "cancelled" && "border-red-500 text-red-500",
                )}
              >
                {item.status === "in-progress"
                  ? "In Progress"
                  : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {format(new Date(item.date), "MMM d, yyyy")}
              </span>
            </div>
            {item.features && item.features.length > 0 && (
              <div className="mt-3 space-y-2">
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
          </CardContent>
        </Card>
      </SheetTrigger>
      <RoadmapDetailSheet item={item} />
    </Sheet>
  );
}

export function RoadmapKanban({ items }: RoadmapKanbanProps) {
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

  const columns = [
    { title: "Planned", status: "planned" },
    { title: "In Progress", status: "in-progress" },
    { title: "Completed", status: "completed" },
  ];

  // Only show cancelled column if there are cancelled items and no status filter is applied
  const showCancelledColumn =
    !statusFilter && filteredItems.some((item) => item.status === "cancelled");

  if (showCancelledColumn) {
    columns.push({ title: "Cancelled", status: "cancelled" });
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {columns.map((column) => {
        const columnItems = filteredItems.filter(
          (item) => item.status === column.status,
        );

        return (
          <div key={column.status} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{column.title}</h2>
              <Badge variant="secondary" className="text-sm">
                {columnItems.length}
              </Badge>
            </div>
            <div className="space-y-4">
              {columnItems.length > 0 ? (
                columnItems.map((item, index) => (
                  <RoadmapCard key={`${item.title}-${index}`} item={item} />
                ))
              ) : (
                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed p-4">
                  <p className="text-sm text-muted-foreground">No items</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
