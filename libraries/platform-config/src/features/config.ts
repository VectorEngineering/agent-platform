import type { FeatureFlag } from "./types";

/**
 * Feature flags configuration with metadata
 * Organized by core CRM categories:
 * - Lead Management & Lifecycle
 * - Contact Management & Relationships
 * - Deal Management & Pipeline
 * - Integrations & Connectivity
 */
export const featureFlags: FeatureFlag[] = [
  // Lead Management & Lifecycle Features
  {
    name: "enableLeadCapture",
    description: "Enable multi-channel lead capture from web forms, email, and social media",
    enabled: true,
  },
  {
    name: "enableLeadQualification",
    description: "AI-powered lead qualification based on BANT criteria",
    enabled: true,
    enabledInProd: true,
    enabledInDev: true,
  },
  {
    name: "enableLeadScoring",
    description: "Dynamic lead scoring based on engagement and fit criteria",
    enabled: true,
  },
  {
    name: "enableLeadRouting",
    description: "Intelligent lead routing based on territory, industry, and team capacity",
    enabled: true,
  },
  {
    name: "enableLeadNurturing",
    description: "Automated lead nurturing workflows and drip campaigns",
    enabled: true,
  },
  {
    name: "enableLeadStageTracking",
    description: "Track and manage lead progression through lifecycle stages",
    enabled: true,
  },
  {
    name: "enableLeadSourceTracking",
    description: "Track and attribute lead sources and marketing channels",
    enabled: true,
  },
  {
    name: "enableLeadDuplication",
    description: "Smart duplicate lead detection and merging",
    enabled: true,
  },
  {
    name: "enableLeadPrioritization",
    description: "Automated lead prioritization based on engagement signals",
    enabled: true,
  },
  {
    name: "enableLeadRecycling",
    description: "Lead recycling workflows for unconverted leads",
    enabled: false,
    enabledInProd: true,
    enabledInDev: false,
  },

  // Contact Management & Relationships Features
  {
    name: "enableContactEnrichment",
    description: "Automatic contact data enrichment from third-party sources",
    enabled: true,
  },
  {
    name: "enableContactTimeline",
    description: "Unified timeline of all contact interactions and touchpoints",
    enabled: true,
  },
  {
    name: "enableContactRelationships",
    description: "Track relationships between contacts and organizations",
    enabled: true,
  },
  {
    name: "enableContactScoring",
    description: "Contact scoring based on engagement and relationship strength",
    enabled: true,
  },
  {
    name: "enableContactSegmentation",
    description: "Dynamic contact segmentation based on attributes and behavior",
    enabled: true,
  },
  {
    name: "enableContactPreferences",
    description: "Manage contact communication preferences and opt-outs",
    enabled: true,
  },
  {
    name: "enableContactMerging",
    description: "Smart contact record merging with conflict resolution",
    enabled: true,
  },
  {
    name: "enableContactHierarchy",
    description: "Track organizational hierarchies and reporting relationships",
    enabled: false,
    enabledInProd: true,
    enabledInDev: false,
  },
  {
    name: "enableContactInfluence",
    description: "Track contact influence on deals and opportunities",
    enabled: true,
  },
  {
    name: "enableContactActivity",
    description: "Comprehensive contact activity and engagement tracking",
    enabled: true,
  },

  // Deal Management & Pipeline Features
  {
    name: "enableDealStages",
    description: "Customizable deal stages and pipeline management",
    enabled: true,
  },
  {
    name: "enableDealScoring",
    description: "AI-powered deal scoring and win probability prediction",
    enabled: true,
    enabledInProd: true,
    enabledInDev: true,
  },
  {
    name: "enableDealForecasting",
    description: "Advanced deal forecasting and revenue prediction",
    enabled: false,
    enabledInProd: true,
    enabledInDev: false,
  },
  {
    name: "enableDealCollaboration",
    description: "Team collaboration and notes on deal records",
    enabled: true,
  },
  {
    name: "enableDealTasks",
    description: "Deal-specific task management and reminders",
    enabled: true,
  },
  {
    name: "enableDealApproval",
    description: "Multi-step deal approval workflows",
    enabled: true,
  },
  {
    name: "enableDealProducts",
    description: "Product line items and pricing in deals",
    enabled: true,
  },
  {
    name: "enableDealTimeline",
    description: "Comprehensive deal timeline and activity history",
    enabled: true,
  },
  {
    name: "enableDealTemplates",
    description: "Reusable deal templates and quick-start configurations",
    enabled: false,
    enabledInProd: true,
    enabledInDev: true,
  },
  {
    name: "enableDealInsights",
    description: "AI-powered insights and recommendations for deals",
    enabled: false,
    enabledInProd: true,
    enabledInDev: false,
  },

  // Integration & Connectivity Features
  {
    name: "enableEmailIntegration",
    description: "Integration with email providers (Gmail, Outlook) for email sync and tracking",
    enabled: true,
    enabledInProd: true,
    enabledInDev: true,
  },
  {
    name: "enableCalendarIntegration",
    description: "Calendar sync and meeting scheduling with popular providers",
    enabled: true,
    enabledInProd: true,
    enabledInDev: true,
  },
  {
    name: "enableLinkedInIntegration",
    description: "LinkedIn integration for lead enrichment and social selling",
    enabled: false,
    enabledInProd: true,
    enabledInDev: false,
  },
  {
    name: "enableZoomIntegration",
    description: "Zoom integration for video calls and meeting management",
    enabled: true,
    enabledInProd: true,
    enabledInDev: true,
  },
  {
    name: "enableSlackIntegration",
    description: "Slack integration for team notifications and deal updates",
    enabled: true,
    enabledInProd: true,
    enabledInDev: true,
  },
  {
    name: "enableQuickbooksIntegration",
    description: "QuickBooks integration for financial tracking and invoicing",
    enabled: false,
    enabledInProd: true,
    enabledInDev: false,
  },
  {
    name: "enableHubspotIntegration",
    description: "HubSpot integration for marketing automation sync",
    enabled: false,
    enabledInProd: true,
    enabledInDev: true,
  },
  {
    name: "enableSalesforceIntegration",
    description: "Salesforce integration for data sync and migration",
    enabled: false,
    enabledInProd: true,
    enabledInDev: false,
  },
  {
    name: "enableZapierIntegration",
    description: "Zapier integration for custom automation workflows",
    enabled: true,
    enabledInProd: true,
    enabledInDev: true,
  },
  {
    name: "enableWebhookIntegration",
    description: "Custom webhook support for third-party integrations",
    enabled: true,
    enabledInProd: true,
    enabledInDev: true,
  },
];
