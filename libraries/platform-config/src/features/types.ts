/**
 * Type definitions for the Vector CRM Platform feature flags system.
 * This module provides type safety and documentation for all feature flag related configurations.
 */

/**
 * Represents the environment configuration for feature flags.
 * Used to determine the current execution environment and its characteristics.
 *
 * @example
 * ```typescript
 * const env: FeatureEnvironment = {
 *   NODE_ENV: 'development',
 *   IS_PROD: false,
 *   IS_DEV: true
 * };
 * ```
 */
export type FeatureEnvironment = {
  /** The current Node environment (development, production, test) */
  NODE_ENV: string;
  /** Whether the current environment is production */
  IS_PROD: boolean;
  /** Whether the current environment is development */
  IS_DEV: boolean;
};

/**
 * Represents a single feature flag configuration.
 * Each feature flag can be enabled/disabled globally and have environment-specific overrides.
 *
 * @example
 * ```typescript
 * const featureFlag: FeatureFlag = {
 *   name: 'enableNewFeature',
 *   description: 'Enables the new awesome feature',
 *   enabled: true,
 *   enabledInProd: true,
 *   enabledInDev: false
 * };
 * ```
 */
export type FeatureFlag = {
  /** Unique identifier for the feature flag (should start with 'enable') */
  name: string;
  /** Detailed description of what the feature flag controls */
  description: string;
  /** Default enabled state of the feature */
  enabled: boolean;
  /** Optional override for development environment */
  enabledInDev?: boolean;
  /** Optional override for production environment */
  enabledInProd?: boolean;
};

/**
 * Represents the complete set of processed feature flags.
 * This is a dynamic type that maps feature names to their boolean states.
 *
 * @example
 * ```typescript
 * const flags: FeatureFlags = {
 *   enableFeatureA: true,
 *   enableFeatureB: false
 * };
 *
 * if (flags.enableFeatureA) {
 *   // Feature A is enabled
 * }
 * ```
 */
export type FeatureFlags = {
  [key: string]: boolean;
};

/**
 * Represents the complete feature flags configuration with metadata.
 * Used for initialization and processing of the feature flags system.
 *
 * @example
 * ```typescript
 * const config: FeatureFlagsConfig = {
 *   flags: [
 *     {
 *       name: 'enableFeature',
 *       description: 'Feature description',
 *       enabled: true
 *     }
 *   ],
 *   environment: {
 *     NODE_ENV: 'development',
 *     IS_PROD: false,
 *     IS_DEV: true
 *   }
 * };
 * ```
 */
export type FeatureFlagsConfig = {
  /** Array of feature flag definitions */
  flags: FeatureFlag[];
  /** Current environment configuration */
  environment: FeatureEnvironment;
};
