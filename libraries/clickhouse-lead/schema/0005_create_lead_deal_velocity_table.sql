-- +goose up
/**
 * Deal Velocity Metrics Table (V1)
 * ==============================
 * 
 * Tracks and analyzes the speed and momentum of deals through the sales pipeline.
 * Provides insights into deal progression, bottlenecks, and optimization opportunities.
 * 
 * Table Notes:
 * ===========
 * - Uses ReplacingMergeTree for point-in-time analysis
 * - Ordered by workspace_id and deal_id for efficient lookups
 * - Includes comprehensive velocity and momentum metrics
 * - Supports detailed stage-by-stage analysis
 * - Enables predictive analytics and forecasting
 * 
 * Common Queries:
 * -------------
 * 1. Stage duration analysis
 * 2. Bottleneck identification
 * 3. Deal health assessment
 * 4. Velocity trending
 * 5. Risk prediction
 * 6. Benchmark comparison
 */
CREATE TABLE leads.deal_velocity_metrics_v1 (
    /**
     * Core Identifiers
     * ==============
     */
    workspace_id String,    -- Multi-tenant identifier
    deal_id String,                           -- Unique deal identifier
    time DateTime,                          -- Event timestamp (Unix ms)
    opportunity_id String,                    -- Associated opportunity
    lead_id String,                          -- Original lead ID
    
    /**
     * Stage Velocity Metrics
     * ===================
     */
    stage_duration_days Array(UInt16),        -- Days per stage
    stage_names Array(String),                -- Stage names
    stage_conversion_rates Array(Decimal32(4)), -- Conversion rates
    stage_velocity_scores Array(Int8),        -- Velocity vs benchmark
    stage_bottleneck_indicators Array(Int8),  -- Bottleneck indicators
    stage_acceleration_needed Array(Boolean), -- Needs acceleration
    acceleration_factors Array(String),       -- Positive factors
    deceleration_factors Array(String),       -- Negative factors
    stage_engagement_levels Array(UInt8),     -- Engagement per stage
    
    /**
     * Deal Momentum Analysis
     * ===================
     */
    momentum_score Int8,                      -- Overall momentum (-100 to 100)
    momentum_trend Int8,                      -- Trend direction
    activity_frequency_trend Int8,            -- Activity trend
    engagement_quality_trend Int8,            -- Engagement trend
    decision_velocity_score UInt8,            -- Decision speed (0-100)
    stakeholder_response_times Array(UInt32), -- Response times
    meeting_frequency_trend Int8,             -- Meeting cadence
    communication_gap_days Array(UInt8),      -- Communication gaps
    
    /**
     * Stage Performance Analysis
     * =======================
     */
    current_stage_deviation_days Int16,       -- +/- from average
    predicted_stage_duration_days UInt16,     -- Predicted duration
    stage_risk_factors Array(String),         -- Risk factors
    stage_health_score UInt8,                 -- Health (0-100)
    stage_progress_rate Float32,              -- Progress rate
    expected_stage_completion Date,           -- Expected completion
    stage_success_probability Array(UInt8),   -- Success probability
    
    /**
     * Velocity Benchmarking
     * ==================
     */
    industry_benchmark_days Array(UInt16),    -- Industry benchmarks
    team_benchmark_days Array(UInt16),        -- Team benchmarks
    velocity_percentile UInt8,                -- Percentile rank
    benchmark_comparison_score Int8,          -- vs benchmark (-100 to 100)
    peer_deals_comparison Array(Float32),     -- Peer comparison
    historical_performance_delta Int8,        -- vs historical
    
    /**
     * Activity & Engagement Metrics
     * =========================
     */
    activities_per_stage Array(UInt16),       -- Activities count
    engagement_scores_per_stage Array(UInt8), -- Engagement levels
    stakeholder_engagement_trend Array(Int8), -- Engagement trends
    decision_maker_involvement_score UInt8,   -- Decision maker engagement
    champion_strength_score UInt8,            -- Champion effectiveness
    
    /**
     * Risk & Health Indicators
     * =====================
     */
    overall_risk_score UInt8,                -- Composite risk (0-100)
    stall_probability UInt8,                  -- Stall likelihood
    deal_complexity_factors Array(String),    -- Complexity factors
    health_indicators Array(String),          -- Health indicators
    warning_signals Array(String),            -- Warning signs
    recovery_actions Array(String),           -- Recommended actions
    
    /**
     * Forecast & Prediction
     * ==================
     */
    predicted_close_date Date,               -- Predicted closure
    confidence_score UInt8,                  -- Prediction confidence
    forecast_accuracy_history Array(Int8),   -- Historical accuracy
    prediction_factors Array(String),        -- Contributing factors
    
    /**
     * Process Optimization
     * =================
     */
    optimization_opportunities Array(String), -- Improvement areas
    bottleneck_patterns Array(String),       -- Pattern recognition
    efficiency_metrics Map(String, Float32), -- Efficiency scores
    process_adherence_score UInt8,          -- Process compliance
    deviation_reasons Array(String),         -- Deviation causes
    
    /**
     * Time-based Analysis
     * ================
     */
    time_since_last_activity UInt32,        -- Time since activity
    time_in_current_stage UInt32,           -- Current stage time
    expected_remaining_days UInt16,         -- Days to close
    critical_path_status String,            -- Path status
    timeline_health_score UInt8,            -- Timeline health
    
    /**
     * Metadata
     * =======
     */
    created_at DateTime,                    -- Creation timestamp
    updated_at DateTime,                    -- Last update
    calculation_version String,             -- Algorithm version
    data_quality_score UInt8,              -- Data quality
    confidence_level UInt8,                -- Metric confidence
    
    /**
     * Extended Analytics
     * ===============
     */
    custom_metrics Map(String, Float64),    -- Custom metrics
    analysis_notes Array(String),           -- Analysis notes
    metadata String,                          -- Additional metadata
    debug_info String                         -- Debug information
) ENGINE = ReplacingMergeTree(time)
ORDER BY (workspace_id, deal_id)
SETTINGS index_granularity = 8192;

-- +goose down
DROP TABLE leads.deal_velocity_metrics_v1;