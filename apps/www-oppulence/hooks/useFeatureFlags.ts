"use client";

import { FeatureFlag } from "@/utils/feature-flags";

/**
 * Client-side hook to access feature flags
 *
 * Note: This hook can only access NEXT_PUBLIC_ environment variables
 *
 * @returns An object containing all feature flags as booleans
 */
export default function useFeatureFlags() {
  /**
   * Client-side version of isFeatureEnabled that checks for feature flags
   */
  const isEnabled = (feature: FeatureFlag): boolean => {
    return process.env[`NEXT_PUBLIC_ENABLE_${feature}`] === "true";
  };

  return {
    authButton: isEnabled(FeatureFlag.AUTH_BUTTON),
    githubLink: isEnabled(FeatureFlag.GITHUB_LINK),
    downloadLink: isEnabled(FeatureFlag.DOWNLOAD_LINK),
    statusLink: isEnabled(FeatureFlag.STATUS_LINK),
    docsLink: isEnabled(FeatureFlag.DOCS_LINK),
    // Add new feature flag getters here
  };
}

/**
 * Type for the object returned by useFeatureFlags()
 */
export type FeatureFlagsConfig = ReturnType<typeof useFeatureFlags>;
