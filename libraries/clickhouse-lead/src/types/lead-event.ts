import { z } from 'zod'

// Utility schema types for commonly used patterns
const LowCardinalityString = z.string()
const DateTimeString = z.string() // ISO DateTime string
const UnixTimestamp = z.number().int()

// Lead Events Schema
export const LeadEventSchema = z.object({
    // Event Identification & Metadata
    workspace_id: z.string(),
    event_id: z.string().uuid(),
    time: DateTimeString,
    event_type: LowCardinalityString,

    // Lead Core Information
    lead_id: z.string(),
    endpoint_id: z.string(),
    email: z.string().email(),
    company: z.string(),
    industry: LowCardinalityString,
    sub_industry: LowCardinalityString,
    employee_count: z.number().int().positive(),
    annual_revenue: z.number().positive(),
    year_founded: z.number().int().min(1800).max(new Date().getFullYear()),
    stock_symbol: z.string().optional(),
    company_type: LowCardinalityString,
    account_id: z.string(),
    company_size_range: LowCardinalityString,
    revenue_range: LowCardinalityString,
    industry_vertical: LowCardinalityString,

    // Enhanced Company Information
    company_description: z.string(),
    technologies_used: z.array(LowCardinalityString),
    competitors: z.array(z.string()),
    funding_rounds: z.array(z.string()),
    total_funding: z.number().nullable(),
    last_funding_date: DateTimeString.nullable(),
    growth_rate: z.number(),
    market_segment: LowCardinalityString,
    geographic_presence: z.array(LowCardinalityString),
    regulatory_compliance: z.array(LowCardinalityString),

    // Contact Details
    contact_name: z.string(),
    contact_title: z.string(),
    contact_phone: z.string(),
    contact_country: LowCardinalityString,
    contact_city: z.string(),
    contact_timezone: z.string(),
    contact_linkedin_url: z.string().url().optional(),
    contact_twitter_handle: z.string().optional(),
    contact_department: LowCardinalityString,
    reporting_to: z.string(),
    years_in_role: z.number().int().min(0),
    decision_making_role: LowCardinalityString,
    preferred_contact_method: LowCardinalityString,
    languages: z.array(LowCardinalityString),

    // Additional Stakeholders
    stakeholder_ids: z.array(z.string()),
    stakeholder_names: z.array(z.string()),
    stakeholder_titles: z.array(z.string()),
    stakeholder_roles: z.array(LowCardinalityString),
    stakeholder_influence_levels: z.array(z.number().int().min(0).max(100)),
    stakeholder_emails: z.array(z.string().email()),
    stakeholder_phones: z.array(z.string()),
    stakeholder_departments: z.array(LowCardinalityString),
    stakeholder_engagement_scores: z.array(z.number()),

    // Marketing Attribution
    source: LowCardinalityString,
    medium: LowCardinalityString,
    campaign_id: z.string(),
    campaign_name: z.string(),
    referrer_domain: z.string(),
    landing_page: z.string(),
    utm_parameters: z.string(),
    referral_path: z.array(z.string()),
    first_touch_channel: z.string(),
    last_touch_channel: z.string(),

    // Technical Context
    device_type: LowCardinalityString,
    device_os: LowCardinalityString,
    browser: LowCardinalityString,
    ip_address: z.string().ip(),
    user_agent: z.string(),

    // Enhanced Lead Scoring
    fit_score: z.number().int().min(0).max(100),
    interest_score: z.number().int().min(0).max(100),
    behavior_score: z.number().int().min(0).max(100),
    budget_score: z.number().int().min(0).max(100),
    authority_score: z.number().int().min(0).max(100),
    need_score: z.number().int().min(0).max(100),
    timing_score: z.number().int().min(0).max(100),
    final_score: z.number().int().min(0).max(100),

    // Behavioral Scoring Components
    website_engagement_score: z.number(),
    content_engagement_score: z.number(),
    email_engagement_score: z.number(),
    social_engagement_score: z.number(),
    event_participation_score: z.number(),
    product_interest_score: z.number(),

    // Lead Status and Stage
    previous_status: LowCardinalityString,
    current_status: LowCardinalityString,
    previous_stage: LowCardinalityString,
    current_stage: LowCardinalityString,
    stage_duration_days: z.record(z.string(), z.number().int().min(0)),
    status_change_history: z.array(z.string()),

    // Deal/Opportunity Information
    deal_size: z.number().positive(),
    deal_currency: LowCardinalityString,
    probability: z.number().int().min(0).max(100),
    expected_close_date: DateTimeString,
    actual_close_date: DateTimeString.nullable(),
    win_reason: LowCardinalityString.nullable(),
    loss_reason: LowCardinalityString.nullable(),
    competitor: LowCardinalityString.nullable(),
    deal_complexity_score: z.number().int().min(0).max(100),
    implementation_time_days: z.number().int().positive(),
    contract_term_months: z.number().int().positive(),
    renewal_probability: z.number().min(0).max(100),

    // Product Interest & Requirements
    product_interest: z.array(LowCardinalityString),
    initial_requirement: z.string(),
    detailed_requirements: z.string(),
    technical_requirements: z.array(z.string()),
    budget_range: LowCardinalityString,
    purchase_timeline: LowCardinalityString,
    decision_criteria: z.array(z.string()),
    success_criteria: z.array(z.string()),
    integration_needs: z.array(z.string()),

    // Assignment & Routing
    assigned_team_id: z.string(),
    assigned_user_id: z.string(),
    routing_rule_id: z.string(),
    priority: LowCardinalityString,
    sla_status: LowCardinalityString,
    response_time_seconds: z.number().int().nonnegative(),

    // Engagement Metrics
    email_opens: z.number().int().nonnegative(),
    email_clicks: z.number().int().nonnegative(),
    website_visits: z.number().int().nonnegative(),
    form_submissions: z.number().int().nonnegative(),
    chat_interactions: z.number().int().nonnegative(),
    meeting_requests: z.number().int().nonnegative(),
    document_downloads: z.array(z.string()),
    webinar_attendances: z.array(z.string()),
    support_tickets: z.number().int().nonnegative(),
    feature_requests: z.array(z.string()),

    // Communication History
    communication_preference: LowCardinalityString,
    last_contacted_by: z.string(),
    last_contact_type: LowCardinalityString,
    next_scheduled_contact: DateTimeString.nullable(),
    communication_frequency: z.string(),
    opt_in_status: z.record(z.string(), z.number().int().min(0).max(1)),

    // Temporal Tracking
    first_contact_time: UnixTimestamp,
    last_contact_time: UnixTimestamp,
    qualification_time: UnixTimestamp,
    conversion_time: UnixTimestamp,
    last_activity_time: UnixTimestamp,
    next_action_due_time: UnixTimestamp,

    // Classification Tags
    tags: z.array(LowCardinalityString),
    custom_fields: z.record(z.string(), z.string()),

    // Compliance & Governance
    gdpr_status: LowCardinalityString,
    consent_records: z.array(z.string()),
    data_processing_basis: z.string(),
    data_retention_policy: z.string(),

    // Metadata
    created_at: DateTimeString,
    updated_at: DateTimeString,
    created_by: z.string(),
    updated_by: z.string(),
    version: z.number().int().positive(),
    is_deleted: z.number().int().min(0).max(1),
    deletion_time: DateTimeString.nullable(),

    // Extended Attributes
    metadata: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown())),
    custom_attributes: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown())),
    integration_data: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown())),

    // Technical Infrastructure
    tech_stack: z.array(z.string()),
    tech_categories: z.array(z.string()),
    compatibility_score: z.number().int().min(0).max(100),
    integration_complexity_score: z.number().int().min(0).max(100),

    // Growth & Market Indicators
    funding_events: z.array(z.string()),
    expansion_signals: z.array(z.string()),
    hiring_velocity: z.number().int().min(-100).max(100),
    market_sentiment_score: z.number().int().min(-100).max(100),

    // Strategic Relationships
    partnership_status: LowCardinalityString,
    partner_ecosystem: z.array(z.string()),
    strategic_alliances: z.array(z.string()),
    competitor_relationships: z.array(z.string()),

    // Buying Center Mapping
    decision_makers: z.array(z.string()),
    influencers: z.array(z.string()),
    budget_holders: z.array(z.string()),
    champions: z.array(z.string()),
    detractors: z.array(z.string()),

    // Account Health Metrics
    product_usage_score: z.number().int().min(0).max(100),
    support_ticket_severity_trend: z.number().int().min(-100).max(100),
    nps_score: z.number().int().min(-100).max(100),
    churn_risk_indicators: z.array(z.string())
})

// Export the type
export type LeadEvent = z.infer<typeof LeadEventSchema>
