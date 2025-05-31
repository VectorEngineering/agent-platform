// app/providers.tsx
"use client";

import { PostHogProvider } from "posthog-js/react";
import { ReactNode } from "react";
import posthog from "posthog-js";

// Initialize PostHog
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true,
  });
}

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
