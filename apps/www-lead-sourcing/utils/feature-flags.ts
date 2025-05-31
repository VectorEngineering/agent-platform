/**
 * Feature flag utilities for the application
 */

/**
 * Enum of available feature flags
 */
export enum FeatureFlag {
  AUTH_BUTTON = "AUTH_BUTTON",
  GITHUB_LINK = "GITHUB_LINK",
  DOWNLOAD_LINK = "DOWNLOAD_LINK",
  STATUS_LINK = "STATUS_LINK",
  DOCS_LINK = "DOCS_LINK",
  // Customer Headers Navigations
  HOW_IT_WORKS = "HOW_IT_WORKS",
  FEATURES = "FEATURES",
  BENEFITS = "BENEFITS",
  LEAD_SOURCING_PRODUCT = "LEAD_SOURCING_PRODUCT",
  LEAD_MANAGEMENT_PRODUCT = "LEAD_MANAGEMENT_PRODUCT",
  DEVELOPER_PLATFORM_DOCS = "DEVELOPER_PLATFORM_DOCS",
  // Add new feature flags here
}

/**
 * Type-safe function to check if a feature is enabled
 * @param feature - The feature flag to check
 * @returns boolean indicating if the feature is enabled
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  if (typeof process === "undefined") return false;

  // Check if the environment variable exists and is set to "true"
  return process.env[`NEXT_PUBLIC_ENABLE_${feature}`] === "true";
}

/**
 * Hook to access all feature flags
 * @returns Object with all feature flags as booleans
 */
export function useFeatureFlags() {
  return {
    authButton: isFeatureEnabled(FeatureFlag.AUTH_BUTTON),
    githubLink: isFeatureEnabled(FeatureFlag.GITHUB_LINK),
    downloadLink: isFeatureEnabled(FeatureFlag.DOWNLOAD_LINK),
    statusLink: isFeatureEnabled(FeatureFlag.STATUS_LINK),
    docsLink: isFeatureEnabled(FeatureFlag.DOCS_LINK),
    howItWorks: isFeatureEnabled(FeatureFlag.HOW_IT_WORKS),
    features: isFeatureEnabled(FeatureFlag.FEATURES),
    benefits: isFeatureEnabled(FeatureFlag.BENEFITS),
    leadSourcingProduct: isFeatureEnabled(FeatureFlag.LEAD_SOURCING_PRODUCT),
    leadManagementProduct: isFeatureEnabled(
      FeatureFlag.LEAD_MANAGEMENT_PRODUCT,
    ),
    developerPlatformDocs: isFeatureEnabled(
      FeatureFlag.DEVELOPER_PLATFORM_DOCS,
    ),
    // Add new feature flag getters here
  };
}
