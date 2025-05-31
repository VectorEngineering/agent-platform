import type { Metadata } from 'next'

/**
 * Represents a navigation item used in the main navigation menu.
 *
 * @property {string} title - The title of the navigation item.
 * @property {string} href - The URL or path to which the item points.
 * @property {boolean} [showOnAuth] - Optional. Determines if the item should be shown when the user is authenticated.
 */
type NavItem = {
    title: string
    href: string
    showOnAuth?: boolean
}

/**
 * Represents external links used in the site.
 *
 * @property {string} twitter - The URL for the Twitter profile.
 * @property {string} github - The URL for the GitHub repository or profile.
 * @property {string} docs - The URL for the documentation page.
 * @property {string} youtube - The URL for the YouTube channel.
 */
type Links = {
    twitter: string
    github: string
    docs: string
    youtube: string
}

/**
 * Represents payment-related configurations, including subscription links.
 *
 * @property {string} subscriptionLink - The URL for managing or subscribing to a plan.
 */
type Payments = {
    subscriptionLink: string
}

/**
 * Represents billing-related configurations, including customer portal links.
 *
 * @property {string} customerBillingPortalLink - The URL for the customer billing portal.
 */
type Billings = {
    customerBillingPortalLink: string
}

/**
 * Represents metadata for a Twitter card.
 *
 * @property {string} title - The title to display in the Twitter card.
 * @property {string} description - The description for the Twitter card.
 * @property {Array<{ url: string; width: number; height: number }>} images - An array of images, each containing a URL, width, and height for the Twitter card.
 */
type TwitterMetadata = {
    title: string
    description: string
    images: Array<{
        url: string
        width: number
        height: number
    }>
}

/**
 * Represents Open Graph metadata for social sharing.
 *
 * @extends TwitterMetadata
 * @property {string} url - The URL of the content.
 * @property {string} siteName - The name of the website.
 * @property {string} locale - The locale for the Open Graph metadata (e.g., "en_US").
 * @property {string} type - The type of Open Graph object (e.g., "website", "article").
 */
type OpenGraphMetadata = TwitterMetadata & {
    url: string
    siteName: string
    locale: string
    type: string
}

/**
 * Represents the site metadata, combining core metadata and social sharing metadata.
 *
 * @extends Metadata
 * @property {URL} metadataBase - The base URL of the site.
 * @property {TwitterMetadata} twitter - Metadata for Twitter cards.
 * @property {OpenGraphMetadata} openGraph - Open Graph metadata for social sharing.
 */
type SiteMetadata = Omit<Metadata, 'twitter' | 'openGraph'> & {
    metadataBase: URL
    twitter: TwitterMetadata
    openGraph: OpenGraphMetadata
}

/**
 * Represents the viewport configuration for mobile responsiveness.
 *
 * @property {string} width - The width of the viewport (e.g., "device-width").
 * @property {number} initialScale - The initial scale of the page.
 * @property {number} maximumScale - The maximum scale allowed.
 * @property {boolean} userScalable - Determines if the user can manually scale the viewport.
 * @property {Array<{ media: string }>} themeColor - An array of theme colors based on media queries (e.g., light mode, dark mode).
 */
type Viewport = {
    width: string
    initialScale: number
    maximumScale: number
    userScalable: boolean
    themeColor: Array<{
        media: string
    }>
}

/**
 * Represents the details of a pricing plan.
 *
 * @property {string} id - The unique identifier for the pricing plan.
 * @property {string} name - The name of the pricing plan.
 * @property {string} description - A brief description of the plan.
 * @property {string[]} features - An array of features included in the plan.
 * @property {number} monthlyPrice - The price for the plan on a monthly basis.
 * @property {number} yearlyPrice - The price for the plan on a yearly basis.
 * @property {boolean} isMostPopular - Indicates if this plan is marked as the most popular choice.
 */
interface PricingPlan {
    id: string
    name: string
    description: string
    features: string[]
    monthlyPrice: number
    yearlyPrice: number
    isMostPopular: boolean
}

/**
 * Represents the configuration for a financial engine used in the platform.
 *
 * @property {string} baseUrlProd - The production base URL for the financial engine.
 * @property {string} baseUrlDev - The development base URL for the financial engine.
 * @property {string} bearerToken - The bearer token used for authentication with the financial engine.
 */
interface FinancialEngineConfig {
    baseUrlProd: string
    baseUrlDev: string
    bearerToken: string
}

/**
 * Represents the configuration for the site.
 *
 * @property {string} platformHost - The host URL for the platform.
 * @property {string} company - The name of the company.
 * @property {string} name - The name of the platform.
 * @property {string} title - The title of the site.
 * @property {string} description - A brief description of the site.
 * @property {Object} email - The email configuration for the site.
 * @property {string} email.from - The sender's email address.
 * @property {string} platformUrl - The platform's URL.
 * @property {string} webUrl - The website's URL.
 * @property {string} desktopUrl - The desktop application URL.
 * @property {string} dubProjectSlug - The slug for a project in Dub.
 * @property {string} mfaIssuer - The issuer for multi-factor authentication (MFA).
 * @property {string} uptimeUrl - The URL for uptime monitoring.
 * @property {NavItem[]} mainNav - An array of main navigation items.
 * @property {Links} links - Social and external links for the platform.
 * @property {string} supportEmail - The support email address.
 * @property {string} helpUrl - The URL for help and support resources.
 * @property {string} intercomAppId - The Intercom app ID for customer support.
 * @property {Payments} payments - The payment-related configuration.
 * @property {Billings} billings - The billing-related configuration.
 * @property {Metadata} metadata - Metadata for the platform (e.g., SEO).
 * @property {Viewport} viewport - Viewport settings for mobile responsiveness.
 * @property {PricingPlan[]} pricing - An array of available pricing plans.
 * @property {FinancialEngineConfig} financialEngine - The financial engine configuration.
 * @property {string} termsAndConditionsUrl - The URL to the terms and conditions.
 * @property {string} privacyPolicyUrl - The URL to the privacy policy.
 * @property {string} documentationUrl - The URL to the platform documentation.
 */
type SiteConfig = {
    platformHost: string
    company: string
    name: string
    email: { from: string }
    title: string
    description: string
    platformUrl: string
    webUrl: string
    desktopUrl: string
    dubProjectSlug: string
    mfaIssuer: string
    uptimeUrl: string
    mainNav: NavItem[]
    links: Links
    supportEmail: string
    helpUrl: string
    intercomAppId: string
    payments: Payments
    billings: Billings
    metadata: Metadata
    viewport: Viewport
    pricing: PricingPlan[]
    financialEngine: FinancialEngineConfig
    termsAndConditionsUrl: string
    privacyPolicyUrl: string
    documentationUrl: string
}

export type { Billings, Links, NavItem, OpenGraphMetadata, Payments, PricingPlan, SiteConfig, SiteMetadata, TwitterMetadata, Viewport }
