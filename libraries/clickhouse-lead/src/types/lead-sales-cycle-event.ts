import { z } from 'zod'

// Utility schema types
const LowCardinalityString = z.string()
const DateTimeString = z.string() // ISO DateTime string
const DateString = z.string() // ISO Date string
const UnixTimestamp = z.number().int()

// Sales Cycle Events Schema
export const SalesCycleEventSchema = z.object({
    // Core Identifiers & Metadata
    workspace_id: z.string(),
    event_id: z.string().uuid(),
    lead_id: z.string(),
    opportunity_id: z.string(),
    account_id: z.string(),
    parent_event_id: z.string().optional(),
    time: DateTimeString,
    event_source: z.string(),
    event_version: z.string(),

    // Sales Activity Details
    activity_type: LowCardinalityString,
    activity_subtype: LowCardinalityString,
    activity_status: LowCardinalityString,
    activity_outcome: LowCardinalityString,
    activity_priority: LowCardinalityString,
    activity_complexity: z.number().int().min(0).max(100),
    activity_sequence_number: z.number().int().positive(),
    previous_activity_id: z.string().optional(),
    next_activity_id: z.string().optional(),
    parent_activity_id: z.string().optional(),
    activity_source_system: z.string(),
    activity_category: z.array(LowCardinalityString),
    activity_tags: z.array(z.string()),
    is_customer_facing: z.boolean(),
    requires_follow_up: z.boolean(),
    follow_up_deadline: DateTimeString.optional(),

    // Sales Representatives
    primary_rep_id: z.string(),
    supporting_rep_ids: z.array(z.string()),
    sales_team_id: z.string(),
    sales_region: LowCardinalityString,
    sales_territory: z.string(),
    rep_experience_level: z.number().int().min(0).max(100),
    rep_win_rate: z.number().min(0).max(1),
    rep_quota_attainment: z.number().min(0),
    rep_engagement_score: z.number().int().min(0).max(100),
    manager_id: z.string(),

    // Stakeholder Details
    stakeholder_id: z.string(),
    stakeholder_ids: z.array(z.string()),
    stakeholder_roles: z.array(LowCardinalityString),
    stakeholder_departments: z.array(LowCardinalityString),
    stakeholder_levels: z.array(LowCardinalityString),
    stakeholder_influence_levels: z.array(z.number().int().min(0).max(100)),
    buying_committee_roles: z.array(LowCardinalityString),
    decision_making_capacities: z.array(LowCardinalityString),
    stakeholder_engagement_scores: z.array(z.number().int().min(0).max(100)),
    stakeholder_relationships: z.array(LowCardinalityString),
    key_contact_changes: z.array(z.string()),
    relationship_strength_scores: z.array(z.number().int().min(0).max(100)),
    last_contact_dates: z.array(DateTimeString),
    preferred_contact_methods: z.array(LowCardinalityString),

    // Meeting & Communication Intelligence
    meeting_duration_seconds: z.number().int().min(0),
    meeting_type: LowCardinalityString,
    meeting_platform: z.string(),
    meeting_recording_url: z.string().url().optional(),
    meeting_transcript_url: z.string().url().optional(),
    meeting_sentiment_score: z.number().int().min(-100).max(100),
    meeting_energy_level: z.number().int().min(0).max(100),
    key_topics_discussed: z.array(z.string()),
    topic_sentiment_scores: z.record(z.string(), z.number().int().min(-100).max(100)),
    next_steps_clarity_score: z.number().int().min(0).max(100),
    follow_up_commitments: z.array(z.string()),
    action_items: z.array(z.string()),
    decision_makers_present: z.array(z.string()),
    meeting_effectiveness_score: z.number().int().min(0).max(100),
    participant_engagement_scores: z.record(z.string(), z.number().int().min(0).max(100)),
    questions_asked: z.array(z.string()),
    objections_raised: z.array(z.string()),
    objection_handling_scores: z.array(z.number().int().min(0).max(100)),
    meeting_preparation_score: z.number().int().min(0).max(100),
    meeting_objective_achieved: z.boolean(),

    // Sales Process & Methodology
    sales_methodology: LowCardinalityString,
    sales_stage: LowCardinalityString,
    previous_stage: LowCardinalityString,
    stage_change_reason: z.string(),
    stage_duration_days: z.number().int().min(0),
    stage_progress_percentage: z.number().int().min(0).max(100),
    deal_velocity_indicator: z.number().int().min(-100).max(100),
    deal_health_score: z.number().int().min(0).max(100),
    deal_risk_score: z.number().int().min(0).max(100),
    deal_complexity_score: z.number().int().min(0).max(100),
    deal_priority_score: z.number().int().min(0).max(100),
    sales_motion: LowCardinalityString,
    deal_acceleration_attempts: z.array(z.string()),
    deal_stall_reasons: z.array(z.string()),

    // Deal Dynamics & Financials
    current_deal_size: z.number(),
    previous_deal_size: z.number(),
    deal_size_change_reason: z.string(),
    original_deal_size: z.number(),
    deal_size_history: z.array(z.number()),
    pricing_model: LowCardinalityString,
    pricing_tier: LowCardinalityString,
    payment_terms: z.string(),
    billing_frequency: LowCardinalityString,
    contract_duration_months: z.number().int().positive(),
    discount_requested: z.number().min(0).max(100),
    discount_approved: z.number().min(0).max(100),
    discount_justification: z.string(),
    cost_of_sale: z.number(),
    expected_margin: z.number(),
    implementation_cost: z.number(),
    total_contract_value: z.number(),
    annual_recurring_revenue: z.number(),
    monthly_recurring_revenue: z.number(),
    one_time_revenue: z.number(),
    expansion_revenue_potential: z.number(),

    // Competitive Analysis
    competitors_mentioned: z.array(z.string()),
    competitive_displacement: z.boolean(),
    displaced_competitor: z.string().optional(),
    competitive_strengths: z.array(z.string()),
    competitive_weaknesses: z.array(z.string()),
    competitor_strengths: z.array(z.string()),
    competitor_weaknesses: z.array(z.string()),
    win_probability: z.number().int().min(0).max(100),
    win_probability_change: z.number().int().min(-100).max(100),
    loss_risk_factors: z.array(z.string()),
    risk_mitigation_plans: z.array(z.string()),
    differentiation_points: z.array(z.string()),
    competitive_positioning: z.string(),
    competitor_pricing_intel: z.record(z.string(), z.string()),
    competitive_feature_gaps: z.array(z.string()),
    competitive_win_rate: z.number().min(0).max(1),

    // Solution & Value Proposition
    business_drivers: z.array(z.string()),
    pain_points: z.array(z.string()),
    pain_point_priorities: z.record(z.string(), z.number().int().min(0).max(100)),
    solution_components: z.array(z.string()),
    product_lines: z.array(z.string()),
    features_discussed: z.array(z.string()),
    feature_interest_levels: z.record(z.string(), z.number().int().min(0).max(100)),
    technical_requirements: z.array(z.string()),
    integration_requirements: z.array(z.string()),
    customization_needs: z.array(z.string()),
    solution_fit_score: z.number().int().min(0).max(100),
    technical_fit_score: z.number().int().min(0).max(100),
    functional_fit_score: z.number().int().min(0).max(100),
    roi_metrics: z.array(z.string()),
    roi_calculation_details: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown())),
    value_drivers: z.array(z.string()),
    success_metrics: z.array(z.string()),
    implementation_complexity_score: z.number().int().min(0).max(100),
    time_to_value_days: z.number().int().positive(),
    expected_outcomes: z.array(z.string()),

    // Stakeholder Sentiment & Engagement
    technical_sentiment_score: z.number().int().min(-100).max(100),
    business_sentiment_score: z.number().int().min(-100).max(100),
    financial_sentiment_score: z.number().int().min(-100).max(100),
    user_sentiment_score: z.number().int().min(-100).max(100),
    overall_sentiment_trend: z.number().int().min(-100).max(100),
    champion_engagement_score: z.number().int().min(0).max(100),
    detractor_risk_score: z.number().int().min(0).max(100),
    relationship_health_score: z.number().int().min(0).max(100),
    executive_sponsorship_strength: z.number().int().min(0).max(100),
    stakeholder_alignment_score: z.number().int().min(0).max(100),

    // Buying Process & Decision Making
    buying_stage: LowCardinalityString,
    buying_process_type: LowCardinalityString,
    evaluation_criteria: z.array(z.string()),
    decision_criteria: z.array(z.string()),
    decision_making_process: z.string(),
    approval_chain: z.array(z.string()),
    budget_status: LowCardinalityString,
    budget_type: LowCardinalityString,
    budget_timeframe: z.string(),
    budget_approval_status: z.string(),
    procurement_process: z.string(),
    legal_requirements: z.array(z.string()),
    security_requirements: z.array(z.string()),
    compliance_requirements: z.array(z.string()),

    // Time & Planning
    expected_close_date: DateString,
    original_close_date: DateString,
    close_date_changes: z.array(DateString),
    implementation_start_date: DateString,
    go_live_date: DateString,
    critical_milestones: z.array(z.string()),
    milestone_dates: z.record(z.string(), DateString),
    decision_timeframe: z.string(),
    implementation_timeline: z.string(),

    // Financial Context
    currency_code: LowCardinalityString,
    exchange_rate: z.number(),
    timezone: z.string(),
    fiscal_quarter: z.string(),
    fiscal_year: z.number().int(),
    fiscal_period: z.string(),

    // Extended Metadata
    created_at: DateTimeString,
    updated_at: DateTimeString,
    created_by: z.string(),
    updated_by: z.string(),
    version: z.number().int().positive(),
    is_deleted: z.number().int().min(0).max(1),
    deletion_time: DateTimeString.nullable(),

    // Custom & Debug Data
    custom_fields: z.record(z.string(), z.string()),
    integration_metadata: z.record(z.string(), z.string()),
    debug_info: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown())),
    raw_data: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown()))
})

// Type inference
export type SalesCycleEvent = z.infer<typeof SalesCycleEventSchema>
