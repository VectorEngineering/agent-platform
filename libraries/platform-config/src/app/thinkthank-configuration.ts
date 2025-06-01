import type { EmailConfig, SiteConfig } from "../types/types";

import { ENV } from "./env";
import { activeFeatureFlags } from "../features";

// --------------------------------------
// 1. Centralized Environment Logic
// --------------------------------------

const DOMAIN = "thinkthank.io";

// Subdomains: production vs. staging
const SUBDOMAIN_APP = ENV.IS_PROD ? `app.${DOMAIN}` : `app-staging.${DOMAIN}`;
const SUBDOMAIN_API = ENV.IS_PROD ? `api.${DOMAIN}` : `api-staging.${DOMAIN}`;
const SUBDOMAIN_ENGINE = ENV.IS_PROD ? `engine.${DOMAIN}` : `engine-staging.${DOMAIN}`;

// Stripe subscription and billing portal links
const stripeLinks = {
  subscription: ENV.IS_DEV
    ? "https://buy.stripe.com/test_00gg1O1zNgtffNSeUV"
    : "https://buy.stripe.com/9AQdSf6iPdcdggM000",
  billingPortal: ENV.IS_DEV
    ? "https://billing.stripe.com/p/login/test_3csdSC6UVbWecsUfYY"
    : "https://billing.stripe.com/p/login/8wM9Btf6j8Gf8Q8000",
};

// --------------------------------------
// 2. Shared Constants & Helper Functions
// --------------------------------------

// Shared metadata constants
const sharedTitle = "Think Thank – Revenue Intelligence Platform for Cyclical Businesses";
const sharedDescription =
  "Think Thank is an AI-powered revenue intelligence platform for cyclical businesses, delivering predictive analytics, pipeline optimization, and automated forecasting to help you stay ahead of seasonal sales cycles.";

const sharedImages = [
  { url: "", width: 800, height: 600 },
  { url: "", width: 1800, height: 1600 },
];

/** Helper to build the metadata object for SEO and social sharing. */
function buildSharedMetadata(baseUrl: string) {
  return {
    // The base URL for generating absolute links (e.g., canonical, og:url)
    metadataBase: new URL(baseUrl),
    title: sharedTitle,
    description: sharedDescription,
    images: sharedImages,
    twitter: {
      title: sharedTitle,
      description: sharedDescription,
      images: sharedImages,
    },
    openGraph: {
      title: sharedTitle,
      description: sharedDescription,
      url: baseUrl,
      siteName: "Think Thank",
      locale: "en_US",
      type: "website",
      images: sharedImages,
    },
  };
}

// --------------------------------------
// 3. Configuration Objects
// --------------------------------------

// Asset URLs configuration
const assetUrls = {
  logo: "https://assets.solomon-ai.app/logo.png",
  qrLogo: "https://assets.solomon-ai.app/logo.png",
  wordmark: "https://assets.solomon-ai.app/logo.png",
  thumbnail: "https://assets.solomon-ai.app/thumbnail.ppg",
  appleTouchIcon: "https://assets.solomon-ai.app/apple-touch-icon.png",
  favicon32: "https://assets.solomon-ai.app/favicon-32x32.png",
  favicon16: "https://assets.solomon-ai.app/favicon-16x16.png",
  faviconAndroid192: "https://assets.solomon-ai.app/android-chrome-192x192.png",
  faviconAndroid512: "https://assets.solomon-ai.app/android-chrome-512x512.png",
  notFoundLink: "https://assets.solomon-ai.app/notfound.png",
  thankYouThumbnail: "https://assets.solomon-ai.app/thank-you-thumbnail.jpg",
};

// Company address configuration
const companyAddress = {
  street: "101 Avenue of the Americas",
  city: "New York",
  state: "NY",
  zipCode: "10013",
  country: "United States",
  phone: "+1 (424) 234-5678",
};

// Email configuration
const emailConfig: EmailConfig = {
  from: {
    default: "Yoan from Think Thank <yoan@thinkthank.io>",
    support: "Think Thank Support <support@thinkthank.io>",
    sales: "Think Thank Sales <sales@thinkthank.io>",
    billing: "Think Thank Billing <billing@thinkthank.io>",
    notifications: "Think Thank Notifications <notifications@thinkthank.io>",
    system: "Think Thank <system@thinkthank.io>",
    feedback: "Think Thank Feedback <feedback@thinkthank.io>",
  },
  replyTo: "support@thinkthank.io",
  templates: {
    welcome: "welcome-template",
    passwordReset: "password-reset-template",
    teamInvite: "team-invite-template",
    dealAlert: "deal-alert-template",
    revenueReport: "revenue-report-template",
  },
};

// Pricing plans
const pricingPlans = [
  {
    id: "price_1",
    name: "Growth",
    description: "Ideal for emerging cyclical businesses and small revenue teams",
    features: [
      "Revenue analytics",
      "Seasonal deal modeling",
      "5 team members",
      "Core revenue insights",
    ],
    monthlyPrice: 1000,
    yearlyPrice: 10000,
    isMostPopular: false,
  },
  {
    id: "price_2",
    name: "Pro",
    description: "For scaling revenue organizations seeking advanced intelligence",
    features: [
      "Advanced deal intelligence",
      "Priority support",
      "Unlimited team members",
      "AI-powered forecasting",
      "Custom integrations",
    ],
    monthlyPrice: 2000,
    yearlyPrice: 20000,
    isMostPopular: true,
  },
  {
    id: "price_5",
    name: "Enterprise",
    description: "Enterprise-grade revenue intelligence for large teams",
    features: [
      "Custom AI models",
      "24/7 dedicated support",
      "Unlimited team members",
      "Advanced forecasting",
      "Custom integrations",
      "Enterprise security & compliance",
    ],
    monthlyPrice: 5000,
    yearlyPrice: 50000,
    isMostPopular: false,
  },
  {
    id: "price_6",
    name: "Ultimate",
    description: "Full-suite intelligence for industry leaders",
    features: [
      "Bespoke AI solutions",
      "White-glove support",
      "Unlimited everything",
      "Real-time intelligence",
      "Custom integrations",
      "Highest security tier",
    ],
    monthlyPrice: 8000,
    yearlyPrice: 80000,
    isMostPopular: false,
  },
];

// Enhanced security configuration
const securityConfig = {
  corsOrigins: [`https://${SUBDOMAIN_APP}`, `https://${DOMAIN}`],
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // limit each IP to 100 requests per window
  },
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://js.intercomcdn.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", `https://${SUBDOMAIN_API}`, `https://${SUBDOMAIN_ENGINE}`],
  },
  cookieSettings: {
    secure: ENV.IS_PROD,
    sameSite: "lax" as const,
    httpOnly: true,
  },
};

// Analytics configuration
const analyticsConfig = {
  googleAnalytics: {
    measurementId: "G-XXXXXXXXXX",
    debug: ENV.IS_DEV,
  },
  mixpanel: {
    projectToken: "YOUR_MIXPANEL_TOKEN",
    debug: ENV.IS_DEV,
  },
  segment: {
    writeKey: "YOUR_SEGMENT_WRITE_KEY",
    debug: ENV.IS_DEV,
  },
};

// API configuration
const apiConfig = {
  baseUrl: `https://${SUBDOMAIN_API}/v1`,
  timeout: 30000,
  retryAttempts: 3,
  endpoints: {
    auth: "/auth",
    users: "/users",
    analytics: "/analytics",
    billing: "/billing",
  },
};

// --------------------------------------
// 4. Final Exported Configuration
// --------------------------------------

/**
 * Configuration object for the Think Thank revenue intelligence platform.
 *
 * This configuration defines platform-wide settings, pricing plans, navigation, metadata,
 * and intelligence features for Think Thank, a solution designed for cyclical businesses
 * to optimize pipeline, forecast sales, and make data-driven revenue decisions.
 */
export const BusinessConfig: SiteConfig = {
  // General platform information
  platformHost: SUBDOMAIN_APP,
  company: "Think Thank",
  name: "Think Thank | Revenue Intelligence Platform",
  shortName: "Think Thank",
  founder: "Yoan From Think Thank",
  founderFirstName: "Yoan",
  address: companyAddress,

  // Asset and Email configs
  assets: assetUrls,
  email: emailConfig,

  // Basic SEO
  title: sharedTitle,
  description: sharedDescription,

  // Domains & URLs
  domain: DOMAIN,
  platformUrl: `https://${SUBDOMAIN_APP}`,
  webUrl: `https://${DOMAIN}`,
  assetsUrl: "https://assets.thinkthank.io",
  securityUrl: "https://security.thinkthank.io",
  partnersUrl: "https://partners.thinkthank.io",
  referralUrl: "https://referral.thinkthank.io",
  statusPageUrl: "https://status.thinkthank.io",
  apiUrl: `https://${SUBDOMAIN_API}`,
  desktopUrl: "thinkthank://",
  dubProjectSlug: "thinkthank",
  mfaIssuer: SUBDOMAIN_APP,
  uptimeUrl: "https://thinkthank.betteruptime.com/",

  // Main navigation links
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Register", href: "/register", showOnAuth: false },
    { title: "Login", href: "/login", showOnAuth: false },
  ],

  // External or social links
  links: {
    twitter: "https://twitter.com/thinkthank",
    github: "https://github.com/thinkthank",
    docs: "https://docs.thinkthank.io",
    youtube: "https://www.youtube.com/thinkthank",
  },

  // Support & help
  supportEmail: "support@thinkthank.io",
  helpUrl: "https://help.thinkthank.io",
  intercomAppId: "pezs7zbq",

  // Payments & billings
  payments: {
    subscriptionLink: stripeLinks.subscription,
  },
  billings: {
    customerBillingPortalLink: stripeLinks.billingPortal,
  },

  // Metadata for SEO and social sharing
  metadata: buildSharedMetadata(`https://${SUBDOMAIN_APP}`),

  // Responsive design & viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
      { media: "(prefers-color-scheme: light)" },
      { media: "(prefers-color-scheme: dark)" },
    ],
  },

  // Pricing plans
  pricing: pricingPlans,

  // Financial engine for AI analytics
  financialEngine: {
    baseUrlProd: "https://engine.solomon-ai-platform.com",
    baseUrlDev: "https://engine-staging.solomon-ai-platform.com",
    bearerToken: "SOLOMONAI",
    clientName: "Simfiny",
    enabledProducts: ["transactions", "investments", "liabilities"],
  },

  // Legal links
  termsAndConditionsUrl: `https://${DOMAIN}/terms`,
  privacyPolicyUrl: `https://${DOMAIN}/privacy`,
  documentationUrl: "https://docs.thinkthank.io",

  // Security, analytics, and API configurations
  security: securityConfig,
  analytics: analyticsConfig,
  api: apiConfig,

  // Feature flags
  features: activeFeatureFlags,
};
