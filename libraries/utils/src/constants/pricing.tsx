import { BusinessConfig as platform } from '@dub/platform-config'
import { INFINITY_NUMBER } from './misc'

export type PlanFeature = {
    id?: string
    text: string
    footnote?: {
        title: string
        cta: string
        href: string
    }
}

const BUSINESS_PLAN_MODIFIER = ({
    name = 'Business',
    monthly = 299,
    yearly = 249,
    analyticsRetention = 36,
    users = 25,
    dashboards = 20,
    customMetrics = 50,
    realtimeAlerts = 100,
    workflowRules = 50,
    aiCredits = 1000,
    storageGB = 100,
    reconciliationRules = 50,
    apis = 3000,
    virtualCards = 50,
    physicalCards = 25,
    spendControls = 100,
    merchantCategories = 50,
    reimbursements = 250,
    customCategories = 100,
    exportFormats = 10,
    customReports = 25,
    tags = 100,
    ai = 1000,
    clicks = 1000,
    links = 1000,
    domains = 1000,
    ids = []
}: {
    name: string
    monthly: number
    yearly: number
    analyticsRetention: number
    users: number
    dashboards: number
    customMetrics: number
    realtimeAlerts: number
    workflowRules: number
    aiCredits: number
    storageGB: number
    reconciliationRules: number
    apis: number
    virtualCards: number
    physicalCards: number
    spendControls: number
    merchantCategories: number
    reimbursements: number
    customCategories: number
    exportFormats: number
    customReports: number
    tags: number
    clicks: number
    links: number
    domains: number
    ai: number
    ids: string[]
}) => ({
    name,
    tagline: 'For growing companies needing advanced spend management and financial analytics',
    link: `${platform.webUrl}/help/article/business-plan`,
    price: {
        monthly,
        yearly,
        ids
    },
    limits: {
        analyticsRetention,
        users,
        dashboards,
        customMetrics,
        realtimeAlerts,
        workflowRules,
        aiCredits,
        storageGB,
        reconciliationRules,
        apis,
        virtualCards,
        physicalCards,
        spendControls,
        merchantCategories,
        reimbursements,
        customCategories,
        exportFormats,
        customReports,
        tags,
        ai,
        clicks,
        links,
        domains
    },
    colors: {
        bg: 'bg-sky-900',
        text: 'text-sky-900'
    },
    cta: {
        text: `Get started with ${name}`,
        shortText: `Get ${name}`,
        href: `${platform.platformUrl}/register`,
        color: 'bg-sky-900 hover:bg-sky-800 hover:ring-sky-100'
    },
    featureTitle: 'Everything in Pro, plus:',
    features: [
        {
            id: 'cards',
            text: `${virtualCards} virtual + ${physicalCards} physical cards`,
            footnote: {
                title: 'Issue virtual and physical cards to employees with custom spend limits',
                cta: 'Learn about card management',
                href: `${platform.webUrl}/help/article/card-management`
            }
        },
        {
            id: 'spend-controls',
            text: `${spendControls} spend control rules`,
            footnote: {
                title: 'Set merchant category restrictions, spending limits, and approval workflows',
                cta: 'Learn about spend controls',
                href: `${platform.webUrl}/help/article/spend-controls`
            }
        },
        {
            id: 'retention',
            text: `${analyticsRetention}-month data retention`
        },
        {
            id: 'users',
            text: `${users} team members`
        },
        {
            id: 'dashboards',
            text: `${dashboards} custom dashboards`
        },
        {
            id: 'workflows',
            text: `${workflowRules} approval workflows`,
            footnote: {
                title: 'Create automated workflows for expenses, reimbursements, and card requests',
                cta: 'Learn more',
                href: `${platform.webUrl}/help/article/workflow-automation`
            }
        },
        {
            id: 'ai-features',
            text: `${aiCredits} AI credits/month`,
            footnote: {
                title: 'Use AI for spend analysis, fraud detection, and smart categorization',
                cta: 'Learn more',
                href: `${platform.webUrl}/help/article/ai-features`
            }
        },
        {
            id: 'reimbursements',
            text: `${reimbursements} reimbursements/month`,
            footnote: {
                title: 'Process employee reimbursements with automated approval workflows',
                cta: 'Learn about reimbursements',
                href: `${platform.webUrl}/help/article/reimbursements`
            }
        },
        {
            id: 'categories',
            text: `${customCategories} custom expense categories`,
            footnote: {
                title: 'Create and manage custom expense categories and rules',
                cta: 'Learn about categorization',
                href: `${platform.webUrl}/help/article/expense-categories`
            }
        },
        {
            id: 'reporting',
            text: `${customReports} custom report templates`,
            footnote: {
                title: 'Create custom expense reports with automated generation',
                cta: 'Learn about reporting',
                href: `${platform.webUrl}/help/article/custom-reports`
            }
        },
        {
            id: 'workspace',
            text: `${storageGB}GB workspace storage`,
            footnote: {
                title: 'Store receipts, invoices, and supporting documents',
                cta: 'Learn more',
                href: `${platform.webUrl}/help/article/workspace-storage`
            }
        },
        {
            id: 'reconciliation',
            text: `${reconciliationRules} reconciliation rules`,
            footnote: {
                title: 'Automate bank reconciliation and transaction matching',
                cta: 'Learn more',
                href: `${platform.webUrl}/help/article/reconciliation`
            }
        },
        {
            id: 'integrations',
            text: 'Advanced accounting integrations',
            footnote: {
                title: 'Connect with QuickBooks, Xero, NetSuite, and other accounting systems',
                cta: 'View integrations',
                href: `${platform.webUrl}/integrations`
            }
        }
    ] as PlanFeature[]
})

export const PLANS = [
    {
        name: 'Free',
        tagline: 'For small businesses getting started with spend management',
        price: {
            monthly: 0,
            yearly: 0
        },
        limits: {
            analyticsRetention: 3,
            users: 2,
            dashboards: 2,
            customMetrics: 5,
            realtimeAlerts: 10,
            workflowRules: 3,
            aiCredits: 100,
            storageGB: 5,
            reconciliationRules: 5,
            apis: 60,
            virtualCards: 2,
            physicalCards: 1,
            spendControls: 5,
            merchantCategories: 10,
            reimbursements: 25,
            customCategories: 10,
            exportFormats: 3,
            customReports: 2,
            tags: 100,
            ai: 1000,
            clicks: 1000,
            links: 1000,
            domains: 1000
        },
        colors: {
            bg: 'bg-black',
            text: 'text-black'
        },
        cta: {
            text: 'Start for free',
            href: `${platform.platformUrl}/register`,
            color: 'bg-white hover:bg-gray-50 border border-gray-200 hover:ring-gray-100 text-neutral-800'
        },
        featureTitle: "What's included:",
        features: [
            {
                id: 'cards',
                text: '2 virtual + 1 physical card',
                footnote: {
                    title: 'Basic card management with simple spend limits',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/basic-cards`
                }
            },
            {
                id: 'spend-controls',
                text: 'Basic spend controls',
                footnote: {
                    title: 'Set simple spending limits and category restrictions',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/basic-controls`
                }
            },
            {
                id: 'retention',
                text: '3-month data retention'
            },
            {
                id: 'users',
                text: '2 team members'
            },
            {
                id: 'basic-workflows',
                text: 'Basic approval workflows',
                footnote: {
                    title: 'Simple approval flows for expenses and cards',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/basic-workflows`
                }
            },
            {
                id: 'ai-basic',
                text: 'Basic AI features',
                footnote: {
                    title: 'Basic expense categorization and insights',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/ai-basics`
                }
            },
            {
                id: 'storage',
                text: '5GB receipt storage'
            },
            {
                id: 'reconciliation-basic',
                text: 'Basic reconciliation tools'
            }
        ] as PlanFeature[]
    },
    {
        name: 'Pro',
        tagline: 'For businesses needing advanced spend controls and analytics',
        link: `${platform.webUrl}/help/article/pro-plan`,
        price: {
            monthly: 99,
            yearly: 79,
            ids: [
                'price_1LodNLAlJJEpqkPVQSrt33Lc', // old monthly
                'price_1LodNLAlJJEpqkPVRxUyCQgZ', // old yearly
                'price_1OTcQBAlJJEpqkPViGtGEsbb', // new monthly (test)
                'price_1OYJeBAlJJEpqkPVLjTsjX0E', // new monthly (prod)
                'price_1OTcQBAlJJEpqkPVYlCMqdLL', // new yearly (test)
                'price_1OYJeBAlJJEpqkPVnPGEZeb0' // new yearly (prod)
            ]
        },
        limits: {
            analyticsRetention: 12,
            users: 10,
            dashboards: 10,
            customMetrics: 20,
            realtimeAlerts: 50,
            workflowRules: 20,
            aiCredits: 500,
            storageGB: 25,
            reconciliationRules: 20,
            apis: 600,
            virtualCards: 20,
            physicalCards: 10,
            spendControls: 25,
            merchantCategories: 25,
            reimbursements: 100,
            customCategories: 25,
            exportFormats: 5,
            customReports: 10,
            tags: 100,
            ai: 1000,
            clicks: 1000,
            links: 1000,
            domains: 1000
        },
        colors: {
            bg: 'bg-blue-500',
            text: 'text-blue-500'
        },
        cta: {
            text: 'Get started with Pro',
            shortText: 'Get Pro',
            href: `${platform.platformUrl}/register`,
            color: 'bg-black hover:bg-neutral-800 hover:ring-gray-200'
        },
        featureTitle: 'Everything in Free, plus:',
        features: [
            {
                id: 'cards',
                text: '20 virtual + 10 physical cards',
                footnote: {
                    title: 'Advanced card management with department budgets',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/pro-cards`
                }
            },
            {
                id: 'spend-controls',
                text: '25 spend control rules',
                footnote: {
                    title: 'Advanced spend policies and approval workflows',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/pro-controls`
                }
            },
            {
                id: 'retention',
                text: '12-month data retention'
            },
            {
                id: 'users',
                text: '10 team members'
            },
            {
                id: 'workflows',
                text: '20 approval workflows',
                footnote: {
                    title: 'Advanced approval flows with multi-level rules',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/pro-workflows`
                }
            },
            {
                id: 'ai-pro',
                text: 'Advanced AI features',
                footnote: {
                    title: 'Smart categorization and spend analytics',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/ai-pro`
                }
            },
            {
                id: 'reimbursements',
                text: '100 reimbursements/month',
                footnote: {
                    title: 'Streamlined employee reimbursements',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/reimbursements-pro`
                }
            },
            {
                id: 'reporting',
                text: '10 custom report templates',
                footnote: {
                    title: 'Create and schedule custom expense reports',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/help/article/reporting-pro`
                }
            }
        ] as PlanFeature[]
    },
    BUSINESS_PLAN_MODIFIER({
        name: 'Business',
        monthly: 299,
        yearly: 249,
        analyticsRetention: 36,
        users: 25,
        dashboards: 20,
        customMetrics: 50,
        realtimeAlerts: 100,
        workflowRules: 50,
        aiCredits: 1000,
        storageGB: 100,
        reconciliationRules: 50,
        apis: 3000,
        virtualCards: 50,
        physicalCards: 25,
        spendControls: 100,
        merchantCategories: 50,
        reimbursements: 250,
        customCategories: 100,
        exportFormats: 10,
        customReports: 25,
        tags: 100,
        ai: 1000,
        clicks: 1000,
        links: 1000,
        domains: 1000,
        ids: [
            'price_1LodLoAlJJEpqkPV9rD0rlNL', // old monthly
            'price_1LodLoAlJJEpqkPVJdwv5zrG', // oldest yearly
            'price_1OZgmnAlJJEpqkPVOj4kV64R', // old yearly
            'price_1OzNlmAlJJEpqkPV7s9HXNAC', // new monthly (test)
            'price_1OzNmXAlJJEpqkPVYO89lTdx', // new yearly (test)
            'price_1OzOFIAlJJEpqkPVJxzc9irl', // new monthly (prod)
            'price_1OzOXMAlJJEpqkPV9ERrjjbw' // new yearly (prod)
        ]
    }),
    BUSINESS_PLAN_MODIFIER({
        name: 'Business Plus',
        monthly: 599,
        yearly: 499,
        analyticsRetention: 48,
        users: 50,
        dashboards: 50,
        customMetrics: 100,
        realtimeAlerts: 250,
        workflowRules: 100,
        aiCredits: 2500,
        storageGB: 250,
        reconciliationRules: 100,
        apis: 5000,
        virtualCards: 100,
        physicalCards: 50,
        spendControls: 200,
        merchantCategories: 100,
        reimbursements: 500,
        customCategories: 200,
        exportFormats: 15,
        customReports: 50,
        tags: 200,
        ai: 5000,
        clicks: 1000,
        links: 1000,
        domains: 1000,
        ids: [
            'price_1OnWu0AlJJEpqkPVWk4144ZG', // monthly (test)
            'price_1OnWu0AlJJEpqkPVkDWVriAB', // yearly (test)
            'price_1OnaK3AlJJEpqkPVaCfCPdHi', // monthly (prod)
            'price_1OzObrAlJJEpqkPVh6D9HWGO' // yearly (prod)
        ]
    }),
    BUSINESS_PLAN_MODIFIER({
        name: 'Business Extra',
        monthly: 999,
        yearly: 899,
        analyticsRetention: 60,
        users: 100,
        dashboards: 100,
        customMetrics: 200,
        realtimeAlerts: 500,
        workflowRules: 200,
        aiCredits: 5000,
        storageGB: 500,
        reconciliationRules: 200,
        apis: 8000,
        virtualCards: 250,
        physicalCards: 100,
        spendControls: 500,
        merchantCategories: 200,
        reimbursements: 1000,
        customCategories: 500,
        exportFormats: 25,
        customReports: 100,
        tags: 200,
        ai: 5000,
        clicks: 1000,
        links: 1000,
        domains: 1000,
        ids: [
            'price_1OnWvCAlJJEpqkPVLzLHx5QD', // monthly (test)
            'price_1OnWvCAlJJEpqkPVHhCCvIOq', // yearly (test)
            'price_1OnaKJAlJJEpqkPVeJSvPfJb', // monthly (prod)
            'price_1OzOg1AlJJEpqkPVPlsrxoWm' // yearly (prod)
        ]
    }),
    {
        name: 'Enterprise',
        tagline: 'For large organizations with complex spend management needs',
        link: `${platform.webUrl}/enterprise`,
        price: {
            monthly: null,
            yearly: null
        },
        limits: {
            analyticsRetention: 84,
            users: INFINITY_NUMBER,
            dashboards: INFINITY_NUMBER,
            customMetrics: INFINITY_NUMBER,
            realtimeAlerts: INFINITY_NUMBER,
            workflowRules: INFINITY_NUMBER,
            aiCredits: INFINITY_NUMBER,
            storageGB: INFINITY_NUMBER,
            reconciliationRules: INFINITY_NUMBER,
            apis: 10000,
            virtualCards: INFINITY_NUMBER,
            physicalCards: INFINITY_NUMBER,
            spendControls: INFINITY_NUMBER,
            merchantCategories: INFINITY_NUMBER,
            reimbursements: INFINITY_NUMBER,
            customCategories: INFINITY_NUMBER,
            exportFormats: INFINITY_NUMBER,
            customReports: INFINITY_NUMBER,
            ai: INFINITY_NUMBER,
            tags: INFINITY_NUMBER,
            clicks: INFINITY_NUMBER,
            links: INFINITY_NUMBER,
            domains: INFINITY_NUMBER
        },
        colors: {
            bg: 'bg-violet-600',
            text: 'text-violet-600'
        },
        cta: {
            text: 'Contact us',
            href: '/enterprise',
            color: 'bg-white hover:bg-gray-50 border border-gray-200 hover:ring-gray-100 text-neutral-800'
        },
        featureTitle: 'Everything in Business Extra, plus:',
        features: [
            {
                id: 'unlimited',
                text: 'Unlimited cards and spend controls'
            },
            {
                id: 'custom-cards',
                text: 'Custom card program',
                footnote: {
                    title: 'Create branded cards with custom rewards and benefits',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/enterprise/custom-cards`
                }
            },
            {
                id: 'custom-workflows',
                text: 'Custom approval engine',
                footnote: {
                    title: 'Build complex approval workflows with custom rules and integrations',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/enterprise/custom-workflows`
                }
            },
            {
                id: 'advanced-controls',
                text: 'Advanced spend controls',
                footnote: {
                    title: 'Custom spend policies with AI-powered fraud prevention',
                    cta: 'Learn more',
                    href: `${platform.webUrl}/enterprise/advanced-controls`
                }
            },
            {
                id: 'dedicated',
                text: 'Dedicated success team'
            },
            {
                id: 'compliance',
                text: 'Custom compliance & security'
            }
        ] as PlanFeature[]
    }
]

export const FREE_PLAN = PLANS.find((plan) => plan.name === 'Free') ?? PLANS[0]
export const PRO_PLAN = PLANS.find((plan) => plan.name === 'Pro') ?? PLANS[1]
export const BUSINESS_PLAN = PLANS.find((plan) => plan.name === 'Business') ?? PLANS[2]
export const ENTERPRISE_PLAN = PLANS.find((plan) => plan.name === 'Enterprise') ?? PLANS[5]

export const PUBLIC_PLANS = [FREE_PLAN, PRO_PLAN, BUSINESS_PLAN, ENTERPRISE_PLAN]

export const SELF_SERVE_PAID_PLANS = PLANS.filter((p) => p.name !== 'Free' && p.name !== 'Enterprise')

export const FREE_WORKSPACES_LIMIT = 2

export const getPlanFromPriceId = (priceId: string) => {
    return PLANS.find((plan) => plan.price.ids?.includes(priceId)) || null
}

export const getPlanDetails = (plan: string) => {
    const foundPlan = SELF_SERVE_PAID_PLANS.find((p) => p.name.toLowerCase() === plan.toLowerCase())
    if (!foundPlan) {
        throw new Error(`Plan ${plan} not found`)
    }
    return foundPlan
}

export const getCurrentPlan = (plan: string) => {
    return PLANS.find((p) => p.name.toLowerCase() === plan.toLowerCase()) || FREE_PLAN
}

export const getNextPlan = (plan?: string | null) => {
    if (!plan) return PRO_PLAN
    return PLANS[PLANS.findIndex((p) => p.name.toLowerCase() === plan.toLowerCase()) + 1]
}
