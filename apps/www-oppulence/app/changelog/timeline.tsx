import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { getTimePassed } from "@/utils/dateUtils";

type TimelineItemProps = {
  date: string;
  title: string;
  description: React.ReactNode;
  version: string;
  isFirst?: boolean;
  isLast?: boolean;
  screenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  description,
  version,
  screenshot,
  isFirst,
  isLast,
}) => {
  return (
    <article className="relative mb-8 mt-28">
      <div className="flex gap-x-3">
        {/* <!-- Left Content --> */}
        <div className="hidden w-40 flex-shrink-0 text-end lg:block">
          <time dateTime={date} className="block text-lg">
            {date}
          </time>
          <time
            dateTime={date}
            className="block text-base font-semibold text-slate-500"
          >
            {getTimePassed(date)}
          </time>
          {/* <time className="block text-base font-semibold text-slate-500">
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </time> */}
        </div>
        {/* <!-- Icon --> */}
        <div className="relative z-10 mt-2 hidden h-6 w-7 items-center justify-center lg:flex">
          <div
            className={cn(
              "relative h-3 w-3 rounded-full",
              isFirst ? "bg-primary" : "bg-border",
              "before:absolute before:inset-[-4px] before:rounded-full before:border before:border-border",
              isFirst && "before:border-primary/50",
            )}
          >
            {/* Connecting lines */}
            {!isFirst && (
              <div className="absolute -top-[3.25rem] left-1/2 h-12 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-border" />
            )}
            {!isLast && (
              <div className="absolute left-1/2 top-4 h-24 w-[2px] -translate-x-1/2 bg-gradient-to-b from-border via-border to-transparent" />
            )}
          </div>
        </div>
        {/* <!-- Right Content --> */}
        <div className="grow">
          <div className={cn("justify-between gap-10 md:flex")}>
            <div>
              <h3 className="flex items-baseline gap-x-1.5 bg-background text-lg font-bold text-foreground text-gray-900 md:text-3xl lg:mb-5">
                {version} &nbsp;&nbsp;{title}
              </h3>
              <div className="my-3 flex items-center gap-x-2 lg:hidden">
                <time
                  dateTime={date}
                  className="text-xs font-semibold text-gray-600"
                >
                  {date}
                </time>
                <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-neutral-500"></div>
                <time dateTime={date} className="block text-base">
                  <div className="text-xs font-semibold text-gray-600">
                    {getTimePassed(date)}
                  </div>
                </time>
              </div>
              <div className="mb-4 text-gray-800">{description}</div>
            </div>
            {screenshot && (
              <div className="pr-4 md:ml-auto md:w-full md:max-w-xs">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
