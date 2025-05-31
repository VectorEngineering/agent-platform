import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

type LogoImageProps = {
  width?: number;
  height?: number;
  className?: string;
  darkMode?: boolean;
};

/**
 * A reusable logo component for consistent branding across the application
 */
export default function LogoImage({
  width = 32,
  height = 32,
  className = "",
  darkMode = false,
}: LogoImageProps) {
  return (
    <Image
      src="/logo/android-chrome-192x192.png"
      alt="Oppulence Logo"
      width={width}
      height={height}
      className={cn(className, darkMode ? "dark:invert" : "")}
      priority
    />
  );
}
