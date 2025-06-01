/**
 * @fileoverview
 * Main entry point for the Vector CRM Platform feature flags system.
 * This module processes feature flags based on the current environment
 * and provides a type-safe way to access feature flag states.
 *
 * @example Basic Usage
 * ```typescript
 * import { activeFeatureFlags } from '@platform-config/features';
 *
 * if (activeFeatureFlags.enableLeadScoring) {
 *   // Lead scoring feature is enabled
 *   calculateLeadScore(lead);
 * }
 * ```
 *
 * @example Combining Features
 * ```typescript
 * import { activeFeatureFlags } from '@platform-config/features';
 *
 * if (activeFeatureFlags.enableLeadScoring && activeFeatureFlags.enableAIFeatures) {
 *   // Both lead scoring and AI features are enabled
 *   calculateAIPoweredLeadScore(lead);
 * }
 * ```
 */

import type { FeatureEnvironment, FeatureFlags } from "./types";
import { featureFlags } from "./config";

/**
 * Environment configuration for feature flag processing.
 * Determines the current execution environment and its characteristics.
 * Falls back to development mode if process.env is not available.
 */
const ENV: FeatureEnvironment = {
  NODE_ENV: typeof process !== "undefined" ? process.env.NODE_ENV || "development" : "development",
  IS_PROD: typeof process !== "undefined" ? process.env.NODE_ENV === "production" : false,
  IS_DEV: typeof process !== "undefined" ? process.env.NODE_ENV === "development" : true,
};

/**
 * Processes the feature flags configuration and returns the active flags
 * based on the current environment.
 *
 * The processing logic:
 * 1. Takes the default enabled state
 * 2. Applies environment-specific overrides if present
 * 3. Returns a map of feature names to their final states
 *
 * @returns {FeatureFlags} Object mapping feature names to their active states
 *
 * @example
 * ```typescript
 * const flags = processFeatureFlags();
 * console.log(flags.enableFeature); // true or false
 * ```
 */
function processFeatureFlags(): FeatureFlags {
  return featureFlags.reduce((acc, flag) => {
    let isEnabled = flag.enabled;

    // Apply environment-specific overrides
    if (ENV.IS_PROD && typeof flag.enabledInProd !== "undefined") {
      isEnabled = flag.enabledInProd;
    } else if (ENV.IS_DEV && typeof flag.enabledInDev !== "undefined") {
      isEnabled = flag.enabledInDev;
    }

    return {
      ...acc,
      [flag.name]: isEnabled,
    };
  }, {} as FeatureFlags);
}

/**
 * The processed and active feature flags for the current environment.
 * This is the main export that should be used to check feature states.
 *
 * @example
 * ```typescript
 * import { activeFeatureFlags } from '@platform-config/features';
 *
 * // Single feature check
 * if (activeFeatureFlags.enableFeature) {
 *   // Feature is enabled
 * }
 *
 * // Multiple feature check
 * if (activeFeatureFlags.enableFeatureA && activeFeatureFlags.enableFeatureB) {
 *   // Both features are enabled
 * }
 *
 * // Feature with fallback
 * const useNewUI = activeFeatureFlags.enableNewUI || false;
 * ```
 */
export const activeFeatureFlags = processFeatureFlags();

// Export the raw feature flags configuration and types
export { featureFlags } from "./config";
export type * from "./types";
