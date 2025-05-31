import { SiteConfig } from '../types/index'

const sharedTitle = 'Solomon AI | Your Personal Financial Assistant'
const sharedDescription = 'A better way to act on your finances.'
const sharedImages = [
    { url: '', width: 800, height: 600 },
    { url: '', width: 1800, height: 1600 }
]

const sharedMetadata = {
    title: sharedTitle,
    description: sharedDescription,
    images: sharedImages
}

const pricingPlans = [
    {
        id: 'price_1',
        name: 'Basic',
        description: 'A basic plan for startups and individual users',
        features: ['AI-powered analytics', 'Basic support', '5 projects limit', 'Access to basic AI tools'],
        monthlyPrice: 1000,
        yearlyPrice: 10000,
        isMostPopular: false
    },
    {
        id: 'price_2',
        name: 'Premium',
        description: 'A premium plan for growing businesses',
        features: ['Advanced AI insights', 'Priority support', 'Unlimited projects', 'Access to all AI tools', 'Custom integrations'],
        monthlyPrice: 2000,
        yearlyPrice: 20000,
        isMostPopular: true
    },
    {
        id: 'price_5',
        name: 'Enterprise',
        description: 'An enterprise plan with advanced features for large organizations',
        features: [
            'Custom AI solutions',
            '24/7 dedicated support',
            'Unlimited projects',
            'Access to all AI tools',
            'Custom integrations',
            'Data security and compliance'
        ],
        monthlyPrice: 5000,
        yearlyPrice: 50000,
        isMostPopular: false
    },
    {
        id: 'price_6',
        name: 'Ultimate',
        description: 'The ultimate plan with all features for industry leaders',
        features: [
            'Bespoke AI development',
            'White-glove support',
            'Unlimited projects',
            'Priority access to new AI tools',
            'Custom integrations',
            'Highest data security and compliance'
        ],
        monthlyPrice: 8000,
        yearlyPrice: 80000,
        isMostPopular: false
    }
]

/**
 * Configuration object for the Solomon AI platform tailored for businesses, particularly those in cyclical industries.
 *
 * This configuration defines platform-wide settings, pricing plans, navigation, metadata, and financial engine details for
 * Solomon AI, a platform designed to empower businesses with advanced financial analytics and AI-powered insights.
 *
 * The platform helps cyclical businesses manage fluctuating financial patterns by offering customizable AI tools, forecasting,
 * and the ability to drill down on complex financial data for better decision-making during peak and off-peak cycles.
 */
export const BusinessConfig: SiteConfig = {
    platformHost: 'app-business.solomon-ai.app',
    company: 'Solomon AI',
    name: 'Solomon AI | Personal Finance',
    email: { from: 'Solomon AI <founders@inbox.solomon-ai.app>' },
    title: sharedTitle,
    description: sharedDescription,
    platformUrl: 'https://app-business.solomon-ai.app',
    webUrl: 'https://solomon-ai.app',
    desktopUrl: 'solomonai://',
    dubProjectSlug: 'solomon-ai',
    mfaIssuer: 'app-business.solomon-ai.app',
    uptimeUrl: 'https://solomon-ai.betteruptime.com/',
    /**
     * Navigation items displayed in the main navigation bar.
     *
     * @property {NavItem[]} mainNav - An array of navigation items used in the header.
     */
    mainNav: [
        { title: 'Home', href: '/' },
        { title: 'Register', href: '/register', showOnAuth: false },
        { title: 'Login', href: '/login', showOnAuth: false }
    ],
    /**
     * Social media and external links.
     *
     * @property {Links} links - URLs to external resources such as Twitter, GitHub, and documentation.
     */
    links: {
        twitter: 'https://twitter.com/shadcn',
        github: 'https://github.com/shadcn/ui',
        docs: 'https://ui.shadcn.com',
        youtube: 'https://www.youtube.com/channel/UCF-lb8m7lniPSKJ4C6F4DDA'
    },
    supportEmail: 'yoanyomba@solomon-ai.co',
    helpUrl: 'https:/solomon-ai.io',
    intercomAppId: 'pezs7zbq',
    /**
     * Payment configuration for managing subscriptions.
     *
     * @property {Payments} payments - Contains links for handling subscriptions based on the environment.
     */
    payments: {
        subscriptionLink:
            process.env.NODE_ENV === 'development'
                ? 'https://buy.stripe.com/test_00gg1O1zNgtffNSeUV'
                : 'https://buy.stripe.com/9AQdSf6iPdcdggM000'
    },
    /**
     * Billing configuration for accessing the customer billing portal.
     *
     * @property {Billings} billings - Contains links to the customer billing portal based on the environment.
     */
    billings: {
        customerBillingPortalLink:
            process.env.NODE_ENV === 'development'
                ? 'https://billing.stripe.com/p/login/test_3csdSC6UVbWecsUfYY'
                : 'https://billing.stripe.com/p/login/8wM9Btf6j8Gf8Q8000'
    },
    /**
     * Metadata for SEO and social sharing, including Twitter and Open Graph configurations.
     *
     * @property {SiteMetadata} metadata - SEO and social sharing metadata settings for the platform.
     */
    metadata: {
        metadataBase: new URL('https://app-business.solomon-ai.app'),
        ...sharedMetadata,
        twitter: sharedMetadata,
        openGraph: {
            ...sharedMetadata,
            url: 'https://app-business.solomon-ai.app',
            siteName: 'Solomon AI',
            locale: 'en_US',
            type: 'website'
        }
    },
    /**
     * Viewport configuration for responsive design.
     *
     * @property {Viewport} viewport - Defines viewport settings such as width, scale, and theme colors.
     */
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
        themeColor: [{ media: '(prefers-color-scheme: light)' }, { media: '(prefers-color-scheme: dark)' }]
    },
    /**
     * Pricing plans available for different business needs.
     *
     * @property {PricingPlan[]} pricing - An array of pricing plans, each tailored to specific business types.
     */
    pricing: pricingPlans,
    /**
     * Financial engine configuration for accessing AI-powered analytics.
     *
     * @property {FinancialEngineConfig} financialEngine - The configuration for connecting to the financial engine, including production and development URLs.
     */
    financialEngine: {
        baseUrlProd: 'https://engine.solomon-ai-platform.com',
        baseUrlDev: 'https://engine-staging.solomon-ai-platform.com',
        bearerToken: 'SOLOMONAI'
    },
    termsAndConditionsUrl: 'https://solomon-ai.app/terms',
    privacyPolicyUrl: 'https://solomon-ai.app/privacy',
    documentationUrl: 'https://platform-docs.solomon-ai.app'
}
