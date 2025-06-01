/**
 * @fileoverview
 * Core type definitions for the Vector CRM Platform configuration.
 * This module provides comprehensive type definitions for all platform-wide settings,
 * ensuring type safety and consistent configuration across the application.
 */

import type { FeatureFlags } from "../features/types";
import type { Metadata } from "next";

/**
 * Represents a navigation item used in the main navigation menu.
 * Used to define the structure and behavior of navigation elements.
 *
 * @example
 * ```typescript
 * const navItem: NavItem = {
 *   title: "Dashboard",
 *   href: "/dashboard",
 *   showOnAuth: true
 * };
 * ```
 */
type NavItem = {
  /** The display title of the navigation item */
  title: string;
  /** The URL or path that the navigation item links to */
  href: string;
  /** Optional flag to control visibility based on authentication state */
  showOnAuth?: boolean;
};

/**
 * Represents external links used in the site.
 * Defines the social media and documentation links for the platform.
 *
 * @example
 * ```typescript
 * const links: Links = {
 *   twitter: "https://twitter.com/vectorcrm",
 *   github: "https://github.com/vector/crm",
 *   docs: "https://docs.vectorcrm.com",
 *   youtube: "https://youtube.com/vectorcrm"
 * };
 * ```
 */
type Links = {
  /** URL to the platform's Twitter profile */
  twitter: string;
  /** URL to the platform's GitHub repository */
  github: string;
  /** URL to the platform's documentation */
  docs: string;
  /** URL to the platform's YouTube channel */
  youtube: string;
};

/**
 * Represents payment-related configurations for subscription management.
 *
 * @example
 * ```typescript
 * const payments: Payments = {
 *   subscriptionLink: "https://billing.vectorcrm.com/subscribe"
 * };
 * ```
 */
type Payments = {
  /** URL for managing or creating subscriptions */
  subscriptionLink: string;
};

/**
 * Represents billing-related configurations for customer portal access.
 *
 * @example
 * ```typescript
 * const billings: Billings = {
 *   customerBillingPortalLink: "https://billing.vectorcrm.com/portal"
 * };
 * ```
 */
type Billings = {
  /** URL for accessing the customer billing portal */
  customerBillingPortalLink: string;
};

/**
 * Represents metadata for Twitter card integration.
 * Defines how content appears when shared on Twitter.
 *
 * @example
 * ```typescript
 * const twitterMeta: TwitterMetadata = {
 *   title: "Vector CRM Platform",
 *   description: "Enterprise Lead Management Solution",
 *   images: [
 *     { url: "/images/banner.jpg", width: 1200, height: 630 }
 *   ]
 * };
 * ```
 */
type TwitterMetadata = {
  /** Title displayed in Twitter cards */
  title: string;
  /** Description displayed in Twitter cards */
  description: string;
  /** Array of images to be used in Twitter cards */
  images: Array<{
    /** URL of the image */
    url: string;
    /** Width of the image in pixels */
    width: number;
    /** Height of the image in pixels */
    height: number;
  }>;
};

/**
 * Represents Open Graph metadata for social sharing.
 * Extends Twitter metadata with additional Open Graph specific properties.
 *
 * @example
 * ```typescript
 * const ogMeta: OpenGraphMetadata = {
 *   title: "Vector CRM Platform",
 *   description: "Enterprise Lead Management Solution",
 *   images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
 *   url: "https://vectorcrm.com",
 *   siteName: "Vector CRM",
 *   locale: "en_US",
 *   type: "website"
 * };
 * ```
 */
type OpenGraphMetadata = TwitterMetadata & {
  /** The canonical URL of the content */
  url: string;
  /** Name of the overall site */
  siteName: string;
  /** Locale of the content (e.g., "en_US") */
  locale: string;
  /** Type of content (e.g., "website", "article") */
  type: string;
};

/**
 * Represents the site metadata configuration.
 * Combines core metadata with social sharing metadata.
 *
 * @example
 * ```typescript
 * const siteMeta: SiteMetadata = {
 *   metadataBase: new URL("https://vectorcrm.com"),
 *   title: "Vector CRM Platform",
 *   description: "Enterprise Lead Management Solution",
 *   twitter: twitterMeta,
 *   openGraph: ogMeta
 * };
 * ```
 */
type SiteMetadata = Omit<Metadata, "twitter" | "openGraph"> & {
  /** Base URL for metadata */
  metadataBase: URL;
  /** Twitter card metadata */
  twitter: TwitterMetadata;
  /** Open Graph metadata */
  openGraph: OpenGraphMetadata;
};

/**
 * Represents viewport configuration for responsive design.
 *
 * @example
 * ```typescript
 * const viewport: Viewport = {
 *   width: "device-width",
 *   initialScale: 1,
 *   maximumScale: 1,
 *   userScalable: false,
 *   themeColor: [
 *     { media: "(prefers-color-scheme: light)" },
 *     { media: "(prefers-color-scheme: dark)" }
 *   ]
 * };
 * ```
 */
type Viewport = {
  /** Width configuration (e.g., "device-width") */
  width: string;
  /** Initial scale of the viewport */
  initialScale: number;
  /** Maximum allowed scale */
  maximumScale: number;
  /** Whether users can manually scale the viewport */
  userScalable: boolean;
  /** Theme color configuration based on color scheme */
  themeColor: Array<{
    /** Media query for theme color */
    media: string;
  }>;
};

/**
 * Represents a pricing plan configuration.
 *
 * @example
 * ```typescript
 * const plan: PricingPlan = {
 *   id: "enterprise",
 *   name: "Enterprise",
 *   description: "For large organizations",
 *   features: ["Unlimited users", "24/7 support"],
 *   monthlyPrice: 999,
 *   yearlyPrice: 9990,
 *   isMostPopular: false
 * };
 * ```
 */
interface PricingPlan {
  /** Unique identifier for the plan */
  id: string;
  /** Display name of the plan */
  name: string;
  /** Detailed description of the plan */
  description: string;
  /** Array of features included in the plan */
  features: string[];
  /** Monthly price in cents */
  monthlyPrice: number;
  /** Yearly price in cents */
  yearlyPrice: number;
  /** Whether this plan is highlighted as most popular */
  isMostPopular: boolean;
}

/**
 * Represents the configuration for the financial engine.
 *
 * @example
 * ```typescript
 * const engineConfig: FinancialEngineConfig = {
 *   baseUrlProd: "https://engine.vectorcrm.com",
 *   baseUrlDev: "https://engine-staging.vectorcrm.com",
 *   bearerToken: "YOUR_TOKEN"
 * };
 * ```
 */
interface FinancialEngineConfig {
  /** Production base URL */
  baseUrlProd: string;
  /** Development base URL */
  baseUrlDev: string;
  /** Authentication token */
  bearerToken: string;
  /** Client name */
  clientName: string;
  /** Enabled products */
  enabledProducts: string[];
}

/**
 * Represents security configuration settings.
 *
 * @example
 * ```typescript
 * const security: SecurityConfig = {
 *   corsOrigins: ["https://app.vectorcrm.com"],
 *   rateLimiting: { windowMs: 900000, maxRequests: 100 },
 *   contentSecurityPolicy: {
 *     defaultSrc: ["'self'"],
 *     scriptSrc: ["'self'"],
 *     styleSrc: ["'self'"],
 *     imgSrc: ["'self'"],
 *     connectSrc: ["'self'"]
 *   },
 *   cookieSettings: {
 *     secure: true,
 *     sameSite: "lax",
 *     httpOnly: true
 *   }
 * };
 * ```
 */
type SecurityConfig = {
  /** Allowed CORS origins */
  corsOrigins: string[];
  /** Rate limiting configuration */
  rateLimiting: {
    /** Time window in milliseconds */
    windowMs: number;
    /** Maximum requests per window */
    maxRequests: number;
  };
  /** Content Security Policy configuration */
  contentSecurityPolicy: {
    /** Default source directives */
    defaultSrc: string[];
    /** Script source directives */
    scriptSrc: string[];
    /** Style source directives */
    styleSrc: string[];
    /** Image source directives */
    imgSrc: string[];
    /** Connect source directives */
    connectSrc: string[];
  };
  /** Cookie security settings */
  cookieSettings: {
    /** Whether cookies require HTTPS */
    secure: boolean;
    /** SameSite cookie policy */
    sameSite: "lax" | "strict" | "none";
    /** Whether cookies are HTTP-only */
    httpOnly: boolean;
  };
};

/**
 * Represents analytics configuration settings.
 *
 * @example
 * ```typescript
 * const analytics: AnalyticsConfig = {
 *   googleAnalytics: {
 *     measurementId: "G-XXXXXXXX",
 *     debug: false
 *   },
 *   mixpanel: {
 *     projectToken: "YOUR_TOKEN",
 *     debug: false
 *   },
 *   segment: {
 *     writeKey: "YOUR_KEY",
 *     debug: false
 *   }
 * };
 * ```
 */
type AnalyticsConfig = {
  /** Google Analytics configuration */
  googleAnalytics: {
    /** GA4 measurement ID */
    measurementId: string;
    /** Debug mode flag */
    debug: boolean;
  };
  /** Mixpanel configuration */
  mixpanel: {
    /** Mixpanel project token */
    projectToken: string;
    /** Debug mode flag */
    debug: boolean;
  };
  /** Segment configuration */
  segment: {
    /** Segment write key */
    writeKey: string;
    /** Debug mode flag */
    debug: boolean;
  };
};

/**
 * Represents API configuration settings.
 *
 * @example
 * ```typescript
 * const api: ApiConfig = {
 *   baseUrl: "https://api.vectorcrm.com/v1",
 *   timeout: 30000,
 *   retryAttempts: 3,
 *   endpoints: {
 *     auth: "/auth",
 *     users: "/users",
 *     analytics: "/analytics",
 *     billing: "/billing"
 *   }
 * };
 * ```
 */
type ApiConfig = {
  /** Base URL for API requests */
  baseUrl: string;
  /** Request timeout in milliseconds */
  timeout: number;
  /** Number of retry attempts */
  retryAttempts: number;
  /** API endpoint paths */
  endpoints: {
    /** Authentication endpoint */
    auth: string;
    /** Users endpoint */
    users: string;
    /** Analytics endpoint */
    analytics: string;
    /** Billing endpoint */
    billing: string;
  };
};

/**
 * Represents email configuration settings.
 *
 * @example
 * ```typescript
 * const email: EmailConfig = {
 *   from: {
 *     default: "Vector <no-reply@vector.app>",
 *     support: "Vector Support <support@vector.app>",
 *     sales: "Vector Sales <sales@vector.app>"
 *   },
 *   replyTo: "support@vector.app",
 *   templates: {
 *     welcome: "welcome-template",
 *     passwordReset: "password-reset-template"
 *   }
 * };
 * ```
 */
type EmailConfig = {
  /** Email sender configurations */
  from: {
    /** Default sender address */
    default: string;
    /** Support team sender address */
    support: string;
    /** Sales team sender address */
    sales: string;
    /** Billing team sender address */
    billing: string;
    /** Notifications sender address */
    notifications: string;
    /** System sender address */
    system: string;
    /** Feedback sender address */
    feedback: string;
  };
  /** Default reply-to address */
  replyTo: string;
  /** Email template identifiers */
  templates: {
    /** Welcome email template */
    welcome: string;
    /** Password reset email template */
    passwordReset: string;
    /** Team invite email template */
    teamInvite: string;
    /** Deal alert email template */
    dealAlert: string;
    /** Revenue report email template */
    revenueReport: string;
  };
};

/**
 * Represents a company's address information.
 *
 * @example
 * ```typescript
 * const address: CompanyAddress = {
 *   street: "123 Tech Street",
 *   city: "San Francisco",
 *   state: "CA",
 *   zipCode: "94105",
 *   country: "United States",
 *   phone: "+1 (555) 123-4567"
 * };
 * ```
 */
type CompanyAddress = {
  /** Street address including unit/suite number */
  street: string;
  /** City name */
  city: string;
  /** State or province */
  state: string;
  /** Postal or ZIP code */
  zipCode: string;
  /** Country name */
  country: string;
  /** Contact phone number */
  phone: string;
};

/**
 * Represents asset URLs for the platform.
 * Defines URLs for various brand assets like logos and images.
 *
 * @example
 * ```typescript
 * const assets: Assets = {
 *   logo: "https://assets.vector.app/logo.png",
 *   qrLogo: "https://assets.vector.app/qr-logo.png",
 *   wordmark: "https://assets.vector.app/wordmark.png",
 *   thumbnail: "https://assets.vector.app/thumbnail.jpg"
 * };
 * ```
 */
type Assets = {
  /** Main logo URL */
  logo: string;
  /** Logo optimized for QR codes */
  qrLogo: string;
  /** Wordmark/text logo URL */
  wordmark: string;
  /** Default thumbnail image URL */
  thumbnail: string;
  /** Apple Touch Icon URL */
  appleTouchIcon: string;
  /** Favicon 32x32 URL */
  favicon32: string;
  /** Favicon 16x16 URL */
  favicon16: string;
  /** Favicon Android 192x192 URL */
  faviconAndroid192: string;
  /** Favicon Android 512x512 URL */
  faviconAndroid512: string;
  /** Not found link image URL */
  notFoundLink: string;
  /** Thank you thumbnail image URL */
  thankYouThumbnail: string;
};

/**
 * Represents the complete site configuration.
 * This is the main configuration type that combines all other configuration types.
 *
 * @example
 * ```typescript
 * const config: SiteConfig = {
 *   platformHost: "app.vectorcrm.com",
 *   company: "Vector CRM",
 *   // ... other configuration
 * };
 * ```
 */
type SiteConfig = {
  /** Platform host domain */
  platformHost: string;
  /** Company name */
  company: string;
  /** Platform name */
  name: string;
  /** Short name */
  shortName: string;
  /** Founder name */
  founder: string;
  /** Founder first name */
  founderFirstName: string;
  /** Company address information */
  address: CompanyAddress;
  /** Asset URLs */
  assets: Assets;
  /** Email configuration */
  email: EmailConfig;
  /** Domain */
  domain: string;
  /** Platform title */
  title: string;
  /** Platform description */
  description: string;
  /** Platform URL */
  platformUrl: string;
  /** Partners URL */
  partnersUrl: string;
  /** Referral URL */
  referralUrl: string;
  /** Assets URL */
  assetsUrl: string;
  /** Website URL */
  webUrl: string;
  /** Desktop app URL scheme */
  desktopUrl: string;
  /** Security URL */
  securityUrl: string;
  /** Status page URL */
  statusPageUrl: string;
  /** API URL */
  apiUrl: string;
  /** Project slug */
  dubProjectSlug: string;
  /** MFA issuer name */
  mfaIssuer: string;
  /** Uptime monitoring URL */
  uptimeUrl: string;
  /** Navigation items */
  mainNav: NavItem[];
  /** External links */
  links: Links;
  /** Support email address */
  supportEmail: string;
  /** Help center URL */
  helpUrl: string;
  /** Intercom app ID */
  intercomAppId: string;
  /** Payment configuration */
  payments: Payments;
  /** Billing configuration */
  billings: Billings;
  /** Metadata configuration */
  metadata: Metadata;
  /** Viewport configuration */
  viewport: Viewport;
  /** Pricing plans */
  pricing: PricingPlan[];
  /** Financial engine configuration */
  financialEngine: FinancialEngineConfig;
  /** Terms and conditions URL */
  termsAndConditionsUrl: string;
  /** Privacy policy URL */
  privacyPolicyUrl: string;
  /** Documentation URL */
  documentationUrl: string;
  /** Security configuration */
  security: SecurityConfig;
  /** Analytics configuration */
  analytics: AnalyticsConfig;
  /** API configuration */
  api: ApiConfig;
  /** Feature flags */
  features: FeatureFlags;
};

export type {
  AnalyticsConfig,
  ApiConfig,
  Assets,
  Billings,
  CompanyAddress,
  EmailConfig,
  FeatureFlags,
  Links,
  NavItem,
  OpenGraphMetadata,
  Payments,
  PricingPlan,
  SecurityConfig,
  SiteConfig,
  SiteMetadata,
  TwitterMetadata,
  Viewport,
};
