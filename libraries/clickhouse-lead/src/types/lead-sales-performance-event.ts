import { z } from 'zod'

// Utility schema types
const LowCardinalityString = z.string()
const DateTimeString = z.string() // ISO DateTime string
const DateString = z.string() // ISO Date string

// Sales Performance Schema
export const SalesPerformanceSchema = z.object({
    // Core Identifiers
    workspace_id: z.string(),
    rep_id: z.string(),
    date: DateString,
    team_id: z.string(),
    manager_id: z.string(),
    territory_id: z.string(),

    // Activity Metrics
    meetings_scheduled: z.number().int().nonnegative(),
    meetings_completed: z.number().int().nonnegative(),
    meetings_cancelled: z.number().int().nonnegative(),
    meetings_no_show: z.number().int().nonnegative(),
    meeting_duration_minutes: z.number().int().nonnegative(),

    emails_sent: z.number().int().nonnegative(),
    emails_opened: z.number().int().nonnegative(),
    emails_clicked: z.number().int().nonnegative(),
    emails_replied: z.number().int().nonnegative(),
    email_templates_used: z.array(z.string()),

    calls_made: z.number().int().nonnegative(),
    calls_connected: z.number().int().nonnegative(),
    calls_duration_minutes: z.number().int().nonnegative(),
    voicemails_left: z.number().int().nonnegative(),
    call_types: z.array(LowCardinalityString),

    proposals_sent: z.number().int().nonnegative(),
    proposals_viewed: z.number().int().nonnegative(),
    proposals_accepted: z.number().int().nonnegative(),
    proposal_types: z.array(z.string()),

    // Effectiveness Metrics
    meeting_acceptance_rate: z.number().min(0).max(1),
    meeting_effectiveness_score: z.number().int().min(0).max(100),
    meeting_to_opportunity_rate: z.number().min(0).max(1),

    email_response_rate: z.number().min(0).max(1),
    email_engagement_score: z.number().int().min(0).max(100),
    email_sentiment_score: z.number().int().min(-100).max(100),

    call_connection_rate: z.number().min(0).max(1),
    call_effectiveness_score: z.number().int().min(0).max(100),
    call_sentiment_score: z.number().int().min(-100).max(100),

    proposal_acceptance_rate: z.number().min(0).max(1),
    proposal_quality_score: z.number().int().min(0).max(100),
    average_proposal_value: z.number().nonnegative(),

    // Pipeline Management
    pipeline_value: z.number(),
    pipeline_changes: z.number(),
    pipeline_velocity: z.number(),
    pipeline_health_score: z.number().int().min(0).max(100),

    opportunities_created: z.number().int().nonnegative(),
    opportunities_advanced: z.number().int().nonnegative(),
    opportunities_closed: z.number().int().nonnegative(),
    opportunities_lost: z.number().int().nonnegative(),

    stage_conversion_rates: z.array(z.number().min(0).max(1)),
    stage_velocity_days: z.array(z.number().int().nonnegative()),
    pipeline_coverage_ratio: z.number().nonnegative(),

    // Performance Indicators
    quota_attainment: z.number().min(0).max(1),
    quota_trending_indicator: z.number().int().min(-100).max(100),
    revenue_generated: z.number().nonnegative(),
    revenue_target: z.number().nonnegative(),

    win_rate: z.number().min(0).max(1),
    win_rate_trend: z.number(),
    loss_reasons: z.array(z.string()),
    competitive_wins: z.number().int().nonnegative(),

    average_deal_size: z.number().nonnegative(),
    deal_size_trend: z.number(),
    sales_cycle_length: z.number().nonnegative(),
    discount_rate_avg: z.number().min(0).max(1),

    // Productivity Metrics
    active_selling_time_minutes: z.number().int().nonnegative(),
    administrative_time_minutes: z.number().int().nonnegative(),
    crm_usage_time_minutes: z.number().int().nonnegative(),
    meeting_preparation_time_minutes: z.number().int().nonnegative(),

    task_completion_rate: z.number().min(0).max(1),
    overdue_tasks: z.number().int().nonnegative(),
    follow_up_speed_minutes: z.number().nonnegative(),
    activity_score: z.number().int().min(0).max(100),

    time_allocation: z.record(z.string(), z.number().int().nonnegative()),
    productivity_score: z.number().int().min(0).max(100),
    work_pattern_analysis: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown())),

    // Quality & Compliance
    forecast_accuracy: z.number().min(0).max(1),
    forecast_trend: z.number(),
    data_quality_score: z.number().int().min(0).max(100),
    compliance_score: z.number().int().min(0).max(100),

    customer_satisfaction_score: z.number().min(0).max(10),
    nps_score: z.number().int().min(-100).max(100),
    deal_margin_percentage: z.number().min(-100).max(100),
    deal_quality_score: z.number().int().min(0).max(100),

    // Skills & Development
    product_knowledge_score: z.number().int().min(0).max(100),
    sales_methodology_adherence: z.number().int().min(0).max(100),
    coaching_sessions_attended: z.number().int().nonnegative(),
    training_completion_rate: z.number().min(0).max(1),
    skill_gaps: z.array(z.string()),
    improvement_areas: z.array(z.string()),

    // Engagement & Collaboration
    team_collaboration_score: z.number().int().min(0).max(100),
    cross_functional_deals: z.number().int().nonnegative(),
    partner_involved_deals: z.number().int().nonnegative(),
    internal_meeting_hours: z.number().int().nonnegative(),

    // Benchmarking
    peer_rank: z.number().int().positive(),
    performance_percentile: z.number().int().min(0).max(100),
    year_over_year_growth: z.number(),
    quarter_over_quarter_growth: z.number(),

    // Metadata
    created_at: DateTimeString,
    updated_at: DateTimeString,
    data_completeness_score: z.number().int().min(0).max(100),
    calculation_version: z.string(),

    // Extended Analytics
    custom_metrics: z.record(z.string(), z.number()),
    metadata: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown())),
    analysis_notes: z.array(z.string())
})

// Type inference
export type SalesPerformance = z.infer<typeof SalesPerformanceSchema>
