import { z } from 'zod'

// Utility schema types
const DateTimeString = z.string() // ISO DateTime string
const DateString = z.string() // ISO Date string

// Deal Velocity Metrics Schema
export const DealVelocityMetricsSchema = z.object({
    // Core Identifiers
    workspace_id: z.string(),
    deal_id: z.string(),
    time: DateTimeString,
    opportunity_id: z.string(),
    lead_id: z.string(),

    // Stage Velocity Metrics
    stage_duration_days: z.array(z.number().int().nonnegative()),
    stage_names: z.array(z.string()),
    stage_conversion_rates: z.array(z.number().min(0).max(1)),
    stage_velocity_scores: z.array(z.number().int().min(-100).max(100)),
    stage_bottleneck_indicators: z.array(z.number().int().min(-100).max(100)),
    stage_acceleration_needed: z.array(z.boolean()),
    acceleration_factors: z.array(z.string()),
    deceleration_factors: z.array(z.string()),
    stage_engagement_levels: z.array(z.number().int().min(0).max(100)),

    // Deal Momentum Analysis
    momentum_score: z.number().int().min(-100).max(100),
    momentum_trend: z.number().int().min(-100).max(100),
    activity_frequency_trend: z.number().int().min(-100).max(100),
    engagement_quality_trend: z.number().int().min(-100).max(100),
    decision_velocity_score: z.number().int().min(0).max(100),
    stakeholder_response_times: z.array(z.number().int().nonnegative()),
    meeting_frequency_trend: z.number().int().min(-100).max(100),
    communication_gap_days: z.array(z.number().int().nonnegative()),

    // Stage Performance Analysis
    current_stage_deviation_days: z.number().int(),
    predicted_stage_duration_days: z.number().int().positive(),
    stage_risk_factors: z.array(z.string()),
    stage_health_score: z.number().int().min(0).max(100),
    stage_progress_rate: z.number().min(0).max(1),
    expected_stage_completion: DateString,
    stage_success_probability: z.array(z.number().int().min(0).max(100)),

    // Velocity Benchmarking
    industry_benchmark_days: z.array(z.number().int().nonnegative()),
    team_benchmark_days: z.array(z.number().int().nonnegative()),
    velocity_percentile: z.number().int().min(0).max(100),
    benchmark_comparison_score: z.number().int().min(-100).max(100),
    peer_deals_comparison: z.array(z.number()),
    historical_performance_delta: z.number().int().min(-100).max(100),

    // Activity & Engagement Metrics
    activities_per_stage: z.array(z.number().int().nonnegative()),
    engagement_scores_per_stage: z.array(z.number().int().min(0).max(100)),
    stakeholder_engagement_trend: z.array(z.number().int().min(-100).max(100)),
    decision_maker_involvement_score: z.number().int().min(0).max(100),
    champion_strength_score: z.number().int().min(0).max(100),

    // Risk & Health Indicators
    overall_risk_score: z.number().int().min(0).max(100),
    stall_probability: z.number().int().min(0).max(100),
    deal_complexity_factors: z.array(z.string()),
    health_indicators: z.array(z.string()),
    warning_signals: z.array(z.string()),
    recovery_actions: z.array(z.string()),

    // Forecast & Prediction
    predicted_close_date: DateString,
    confidence_score: z.number().int().min(0).max(100),
    forecast_accuracy_history: z.array(z.number().int().min(-100).max(100)),
    prediction_factors: z.array(z.string()),

    // Process Optimization
    optimization_opportunities: z.array(z.string()),
    bottleneck_patterns: z.array(z.string()),
    efficiency_metrics: z.record(z.string(), z.number()),
    process_adherence_score: z.number().int().min(0).max(100),
    deviation_reasons: z.array(z.string()),

    // Time-based Analysis
    time_since_last_activity: z.number().int().nonnegative(),
    time_in_current_stage: z.number().int().nonnegative(),
    expected_remaining_days: z.number().int().positive(),
    critical_path_status: z.string(),
    timeline_health_score: z.number().int().min(0).max(100),

    // Metadata
    created_at: DateTimeString,
    updated_at: DateTimeString,
    calculation_version: z.string(),
    data_quality_score: z.number().int().min(0).max(100),
    confidence_level: z.number().int().min(0).max(100),

    // Extended Analytics
    custom_metrics: z.record(z.string(), z.number()),
    analysis_notes: z.array(z.string()),
    metadata: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown())),
    debug_info: z
        .string()
        .transform((str) => JSON.parse(str))
        .pipe(z.record(z.unknown()))
})

// Type inference
export type DealVelocityMetrics = z.infer<typeof DealVelocityMetricsSchema>
