"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoadmapStatus } from "./types";
import { useState } from "react";

const statusOptions: { value: RoadmapStatus; label: string }[] = [
  { value: "planned", label: "Planned" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export function RoadmapFilters() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get filter values from URL
  const searchTerm = searchParams?.get("search") ?? "";
  const statusFilter = searchParams?.get("status") ?? "all";
  const dateFilter = searchParams?.get("date") ?? "all";

  // Update URL with new filter values
  const setSearchTerm = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const setStatusFilter = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value && value !== "all") {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const setDateFilter = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value && value !== "all") {
      params.set("date", value);
    } else {
      params.delete("date");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters =
    searchTerm ||
    (statusFilter && statusFilter !== "all") ||
    (dateFilter && dateFilter !== "all");

  function clearFilters() {
    const params = new URLSearchParams();
    // Preserve the view parameter if it exists
    const viewParam = searchParams?.get("view");
    if (viewParam) {
      params.set("view", viewParam);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-auto sm:flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search roadmap items..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 gap-1.5">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <Badge
                    variant="secondary"
                    className="ml-1 rounded-full px-1 py-0"
                  >
                    {[
                      statusFilter !== "all" ? statusFilter : "",
                      dateFilter !== "all" ? dateFilter : "",
                    ].filter(Boolean).length + (searchTerm ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Narrow down roadmap items by specific criteria
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger id="status" className="col-span-3">
                        <SelectValue placeholder="Any status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any status</SelectItem>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger id="date" className="col-span-3">
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any time</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="past">Past</SelectItem>
                        <SelectItem value="this-month">This month</SelectItem>
                        <SelectItem value="this-quarter">
                          This quarter
                        </SelectItem>
                        <SelectItem value="this-year">This year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                  >
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setIsFiltersOpen(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-10 px-2"
            >
              <X className="mr-1 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {statusFilter && statusFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Status:{" "}
              {statusOptions.find((s) => s.value === statusFilter)?.label}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => setStatusFilter("all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {dateFilter && dateFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Date:{" "}
              {dateFilter
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => setDateFilter("all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
