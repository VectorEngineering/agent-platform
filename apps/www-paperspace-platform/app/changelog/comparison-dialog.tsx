"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { ChangelogEntry } from "./changelog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ComparisonDialogProps {
  updates: ChangelogEntry[];
  trigger?: React.ReactNode;
}

export function ComparisonDialog({ updates, trigger }: ComparisonDialogProps) {
  const [fromVersion, setFromVersion] = React.useState<string>("");
  const [toVersion, setToVersion] = React.useState<string>("");

  const fromUpdate = updates.find((u) => u.version === fromVersion);
  const toUpdate = updates.find((u) => u.version === toVersion);

  const sortedVersions = React.useMemo(() => {
    return updates
      .map((u) => ({
        version: u.version,
        date: new Date(u.date).getTime(),
      }))
      .sort((a, b) => b.date - a.date);
  }, [updates]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Compare Versions
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-h-[80vh] p-8 sm:max-w-[1000px]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl">Compare Versions</DialogTitle>
          <DialogDescription className="text-base">
            Select two versions to compare their changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-8">
          <div className="flex items-center gap-6">
            <div className="grid flex-1 gap-2">
              <Select
                value={fromVersion}
                onValueChange={(v) => setFromVersion(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="From version" />
                </SelectTrigger>
                <SelectContent>
                  {sortedVersions.map(({ version }) => (
                    <SelectItem key={version} value={version}>
                      {version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <div className="grid flex-1 gap-2">
              <Select value={toVersion} onValueChange={(v) => setToVersion(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="To version" />
                </SelectTrigger>
                <SelectContent>
                  {sortedVersions.map(({ version }) => (
                    <SelectItem key={version} value={version}>
                      {version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {fromUpdate && toUpdate && (
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b pb-2">
                  <h3 className="text-xl font-semibold">
                    {fromUpdate.version}
                  </h3>
                  <time className="text-sm text-muted-foreground">
                    {fromUpdate.date}
                  </time>
                </div>
                <ScrollArea className="h-[600px] rounded-md border p-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {fromUpdate.description}
                  </div>
                </ScrollArea>
              </div>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b pb-2">
                  <h3 className="text-xl font-semibold">{toUpdate.version}</h3>
                  <time className="text-sm text-muted-foreground">
                    {toUpdate.date}
                  </time>
                </div>
                <ScrollArea className="h-[600px] rounded-md border p-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {toUpdate.description}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
