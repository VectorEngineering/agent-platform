import { z } from 'zod'

// Utility schema types
const LowCardinalityString = z.string()
const DateTimeString = z.string() // ISO DateTime string
const DateString = z.string() // ISO Date string

// Revenue Intelligence Schema
export const RevenueIntelligenceSchema = z.object({
    // Core Identifiers
    workspace_id: z.string(),
    opportunity_id: z.string(),
    time: DateTimeString,
    account_id: z.string(),
    deal_id: z.string(),

    // Revenue Classification
    booking_type: LowCardinalityString,
    revenue_type: LowCardinalityString,
    revenue_category: z.array(LowCardinalityString),
    revenue_subcategory: z.array(LowCardinalityString),

    // Revenue Components
    recurring_revenue: z.number().nonnegative(),
    one_time_revenue: z.number().nonnegative(),
    expansion_revenue: z.number(),
    services_revenue: z.number().nonnegative(),
    training_revenue: z.number().nonnegative(),
    maintenance_revenue: z.number().nonnegative(),
    churn_amount: z.number().nonnegative(),
    net_revenue_impact: z.number(),

    // Contract Details
    contract_terms: z.array(z.string()),
    payment_terms: z.string(),
    billing_frequency: LowCardinalityString,
    contract_duration_months: z.number().int().positive(),
    auto_renewal_terms: z.string(),
    cancellation_terms: z.string(),
    sla_terms: z.array(z.string()),
    price_escalators: z.array(z.string()),
    contract_start_date: DateString,
    contract_end_date: DateString,

    // Pricing Details
    list_price: z.number().nonnegative(),
    final_price: z.number().nonnegative(),
    discount_percentage: z.number().min(0).max(100),
    discount_justification: z.string(),
    pricing_model: LowCardinalityString,
    pricing_tiers: z.array(z.string()),
    unit_economics: z.record(z.string(), z.number()),

    // Revenue Quality
    revenue_quality_score: z.number().int().min(0).max(100),
    revenue_risk_score: z.number().int().min(0).max(100),
    profitability_score: z.number().int().min(0).max(100),
    customer_lifetime_value: z.number().nonnegative(),
    acquisition_cost: z.number().nonnegative(),
    payback_period_months: z.number().int().positive(),
    gross_margin_percentage: z.number().min(-100).max(100),
    net_margin_percentage: z.number().min(-100).max(100),

    // Forecast & Predictions
    forecast_category: LowCardinalityString,
    forecast_subcategory: LowCardinalityString,
    forecast_confidence: z.number().int().min(0).max(100),
    upside_forecast: z.number(),
    downside_forecast: z.number(),
    weighted_forecast: z.number(),
    forecast_assumptions: z.array(z.string()),
    historical_accuracy: z.number().min(0).max(1),

    // Pipeline Analysis
    pipeline_coverage_ratio: z.number().nonnegative(),
    gap_to_quota: z.number(),
    required_velocity: z.number().nonnegative(),
    win_rate_trend: z.number(),
    average_deal_size_trend: z.number(),
    sales_cycle_trend: z.number(),

    // Revenue Patterns
    seasonality_factors: z.array(z.number()),
    revenue_concentration_risk: z.number().int().min(0).max(100),
    revenue_diversity_score: z.number().int().min(0).max(100),
    revenue_predictability_score: z.number().int().min(0).max(100),
    revenue_stability_score: z.number().int().min(0).max(100),

    // Growth & Expansion
    growth_rate_yoy: z.number(),
    expansion_opportunity_score: z.number().int().min(0).max(100),
    cross_sell_opportunities: z.array(z.string()),
    upsell_opportunities: z.array(z.string()),
    wallet_share_percentage: z.number().min(0).max(100),
    market_penetration_rate: z.number().min(0).max(100),

    // Risk Analysis
    revenue_risk_factors: z.array(z.string()),
    mitigation_strategies: z.array(z.string()),
    competitive_pressure_score: z.number().int().min(0).max(100),
    market_risk_score: z.number().int().min(0).max(100),
    customer_risk_score: z.number().int().min(0).max(100),

    // Benchmarking
    industry_benchmark_metrics: z.record(z.string(), z.number()),
    peer_comparison_metrics: z.record(z.string(), z.number()),
    performance_vs_target: z.number(),
    market_share_percentage: z.number().min(0).max(100),

    // Metadata
    created_at: DateTimeString,
    updated_at: DateTimeString,
    data_quality_score: z.number().int().min(0).max(100),
    confidence_level: z.number().int().min(0).max(100),
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
export type RevenueIntelligence = z.infer<typeof RevenueIntelligenceSchema>
