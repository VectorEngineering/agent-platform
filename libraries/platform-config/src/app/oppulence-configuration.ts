import type { EmailConfig, SiteConfig } from "../types/types";

import { ENV } from "./env";
import { activeFeatureFlags } from "../features";

// --------------------------------------
// 1. Centralized Environment Logic
// --------------------------------------

// Example environment-based host names
const DOMAIN = "oppulence.app";
const SUBDOMAIN_APP = ENV.IS_PROD ? `app.${DOMAIN}` : `app-staging.${DOMAIN}`;
const SUBDOMAIN_API = ENV.IS_PROD ? `api.${DOMAIN}` : `api-staging.${DOMAIN}`;
const SUBDOMAIN_ENGINE = ENV.IS_PROD ? `engine.${DOMAIN}` : `engine-staging.${DOMAIN}`;

// Example environment-based Stripe links
const environmentLinks = {
  dev: {
    subscriptionLink: "https://buy.stripe.com/test_00gg1O1zNgtffNSeUV",
    billingPortalLink: "https://billing.stripe.com/p/login/test_3csdSC6UVbWecsUfYY",
  },
  prod: {
    subscriptionLink: "https://buy.stripe.com/9AQdSf6iPdcdggM000",
    billingPortalLink: "https://billing.stripe.com/p/login/8wM9Btf6j8Gf8Q8000",
  },
};

const stripeLinks = ENV.IS_PROD ? environmentLinks.prod : environmentLinks.dev;

// --------------------------------------
// 2. Shared Constants & Helper Functions
// --------------------------------------

const sharedTitle = "Oppulence - CRM Platform for Cyclical Businesses";
const sharedDescription =
  "Oppulence - The intelligent CRM platform designed specifically for businesses with cyclical sales patterns.";

const getMetadata = (baseUrl: string) => {
  const images = [
    { url: "", width: 800, height: 600 },
    { url: "", width: 1800, height: 1600 },
  ];

  return {
    metadataBase: new URL(baseUrl),
    title: sharedTitle,
    description: sharedDescription,
    images,
    twitter: {
      title: sharedTitle,
      description: sharedDescription,
      images,
    },
    openGraph: {
      title: sharedTitle,
      description: sharedDescription,
      url: baseUrl,
      images,
      siteName: "Oppulence",
      locale: "en_US",
      type: "website",
    },
  };
};

// --------------------------------------
// 3. Configuration Objects
// --------------------------------------

// Asset URLs configuration
const assetUrls = {
  logo: "https://assets.oppulence.app/logo.png",
  qrLogo: "https://assets.oppulence.app/logo.png",
  wordmark: "https://assets.oppulence.app/wordmark.png",
  thumbnail: "https://assets.oppulence.app/thumbnail.ppg",
  appleTouchIcon: "https://assets.oppulence.app/apple-touch-icon.png",
  favicon32: "https://assets.oppulence.app/favicon-32x32.png",
  favicon16: "https://assets.oppulence.app/favicon-16x16.png",
  faviconAndroid192: "https://assets.oppulence.app/android-chrome-192x192.png",
  faviconAndroid512: "https://assets.oppulence.app/android-chrome-512x512.png",
  notFoundLink: "https://assets.oppulence.app/notfound.png",
  thankYouThumbnail: "https://assets.oppulence.app/thank-you-thumbnail.jpg",
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
    default: "Yoan from Oppulence <yoan@oppulence.app>",
    support: "Oppulence Support <support@oppulence.app>",
    sales: "Oppulence Sales <sales@oppulence.app>",
    billing: "Oppulence Billing <billing@oppulence.app>",
    notifications: "Oppulence Notifications <notifications@oppulence.app>",
    system: "Oppulence <system@oppulence.app>",
    feedback: "Oppulence Feedback <feedback@oppulence.app>",
  },
  replyTo: "support@oppulence.app",
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
    description: "Perfect for growing cyclical businesses",
    features: [
      "Seasonal trend analysis",
      "Basic cycle forecasting",
      "5 team members",
      "Core CRM features",
    ],
    monthlyPrice: 1000,
    yearlyPrice: 10000,
    isMostPopular: false,
  },
  {
    id: "price_2",
    name: "Pro",
    description: "For scaling cyclical organizations",
    features: [
      "Advanced cycle analytics",
      "Priority support",
      "Unlimited team members",
      "AI-powered seasonal predictions",
      "Custom integrations",
    ],
    monthlyPrice: 2000,
    yearlyPrice: 20000,
    isMostPopular: true,
  },
  {
    id: "price_5",
    name: "Enterprise",
    description: "Enterprise-grade CRM for large cyclical organizations",
    features: [
      "Custom cycle models",
      "24/7 dedicated support",
      "Unlimited team members",
      "Advanced forecasting",
      "Custom integrations",
      "Enterprise security",
    ],
    monthlyPrice: 5000,
    yearlyPrice: 50000,
    isMostPopular: false,
  },
  {
    id: "price_6",
    name: "Ultimate",
    description: "Ultimate CRM suite for industry-leading cyclical businesses",
    features: [
      "Bespoke cycle solutions",
      "White-glove support",
      "Unlimited everything",
      "Real-time cycle intelligence",
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
    maxRequests: 100, // limit each IP to 100 requests per windowMs
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
 * Configuration object for the Oppulence CRM platform.
 *
 * This configuration defines platform-wide settings, pricing plans, navigation, metadata, and CRM
 * features for Oppulence, a platform designed specifically for businesses with cyclical sales patterns.
 *
 * The platform helps cyclical businesses optimize their customer relationships, predict seasonal trends,
 * and make data-driven decisions through advanced analytics, AI-powered insights, and automation capabilities.
 */
export const OppulenceConfig: SiteConfig = {
  platformHost: SUBDOMAIN_APP,
  company: "Oppulence",
  name: "Oppulence | CRM Platform for Cyclical Businesses",
  shortName: "Oppulence",
  founder: "Yoan From Oppulence",
  founderFirstName: "Yoan",
  address: companyAddress,
  assets: assetUrls,
  email: emailConfig,
  title: sharedTitle,
  description:
    "The specialized CRM platform that helps cyclical businesses manage customer relationships, predict seasonal trends, and optimize their sales cycles with AI-powered insights and automation.",
  domain: DOMAIN,
  platformUrl: `https://${SUBDOMAIN_APP}`,
  webUrl: `https://${DOMAIN}`,
  assetsUrl: "https://assets.oppulence.app",
  securityUrl: "https://security.oppulence.app",
  partnersUrl: "https://partners.oppulence.app",
  referralUrl: "https://referral.oppulence.app",
  statusPageUrl: "https://status.oppulence.app",
  apiUrl: `https://${SUBDOMAIN_API}`,
  desktopUrl: "oppulence://",
  dubProjectSlug: "oppulence",
  mfaIssuer: SUBDOMAIN_APP,
  uptimeUrl: "https://oppulence.betteruptime.com/",
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Register", href: "/register", showOnAuth: false },
    { title: "Login", href: "/login", showOnAuth: false },
  ],
  links: {
    twitter: "https://twitter.com/oppulence",
    github: "https://github.com/oppulence",
    docs: "https://docs.oppulence.app",
    youtube: "https://www.youtube.com/oppulence",
  },
  supportEmail: "support@oppulence.app",
  helpUrl: "https://help.oppulence.app",
  intercomAppId: "pezs7zbq",
  payments: {
    subscriptionLink: stripeLinks.subscriptionLink,
  },
  billings: {
    customerBillingPortalLink: stripeLinks.billingPortalLink,
  },
  metadata: getMetadata(`https://${SUBDOMAIN_APP}`),
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
  pricing: pricingPlans,
  financialEngine: {
    baseUrlProd: "https://engine.solomon-ai-platform.com",
    baseUrlDev: "https://engine-staging.solomon-ai-platform.com",
    bearerToken: "SOLOMONAI",
    clientName: "Simfiny",
    enabledProducts: ["transactions", "investments", "liabilities"],
  },
  termsAndConditionsUrl: `https://${DOMAIN}/terms`,
  privacyPolicyUrl: `https://${DOMAIN}/privacy`,
  documentationUrl: "https://docs.oppulence.app",
  security: securityConfig,
  analytics: analyticsConfig,
  api: apiConfig,
  features: activeFeatureFlags,
};
