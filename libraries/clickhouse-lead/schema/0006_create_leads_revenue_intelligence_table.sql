-- Revenue Intelligence Table (V1)
-- ==============================
-- 
-- Comprehensive tracking of revenue intelligence metrics for sales opportunities.
-- Provides deep insights into revenue patterns, deal economics, and financial forecasting.
-- 
-- Use Cases:
-- ---------
-- 1. Revenue forecasting and pipeline analysis
-- 2. Deal economics and profitability assessment
-- 3. Contract and pricing optimization
-- 4. Customer lifetime value prediction
-- 5. Revenue risk assessment
-- 6. Sales quota and target tracking
-- 
-- Key Metrics:
-- ----------
-- - Revenue composition
-- - Deal economics
-- - Forecast accuracy
-- - Pipeline coverage
-- - Revenue quality

-- +goose up
CREATE TABLE leads.revenue_intelligence_v1 (
    -- Core Identifiers
    -- ==============
    workspace_id String,                    -- Multi-tenant identifier
    opportunity_id String,                  -- Unique opportunity identifier
    time DateTime,                          -- Event timestamp (Unix ms)
    account_id String,                      -- Parent account identifier
    deal_id String,                         -- Associated deal ID
    
    -- Revenue Classification
    -- ===================
    booking_type LowCardinality(String),      -- Type of booking (new, renewal, expansion)
    revenue_type LowCardinality(String),      -- Revenue classification
    revenue_category Array(LowCardinality(String)), -- Revenue categories
    revenue_subcategory Array(LowCardinality(String)), -- Detailed categorization
    
    -- Revenue Components
    -- ===============
    recurring_revenue Decimal64(2),           -- Recurring revenue amount
    one_time_revenue Decimal64(2),           -- One-time revenue amount
    expansion_revenue Decimal64(2),          -- Expansion revenue
    services_revenue Decimal64(2),           -- Professional services
    training_revenue Decimal64(2),           -- Training revenue
    maintenance_revenue Decimal64(2),        -- Maintenance fees
    churn_amount Decimal64(2),              -- Revenue loss
    net_revenue_impact Decimal64(2),         -- Net revenue effect
    
    -- Contract Details
    -- =============
    contract_terms Array(String),            -- Contract terms
    payment_terms String,                    -- Payment conditions
    billing_frequency LowCardinality(String), -- Billing cadence
    contract_duration_months UInt8,          -- Contract length
    auto_renewal_terms String,               -- Renewal terms
    cancellation_terms String,               -- Cancellation terms
    sla_terms Array(String),                -- Service level terms
    price_escalators Array(String),         -- Price increase terms
    contract_start_date Date,               -- Start date
    contract_end_date Date,                 -- End date
    
    -- Pricing Details
    -- ============
    list_price Decimal64(2),                -- Standard price
    final_price Decimal64(2),               -- Negotiated price
    discount_percentage Decimal32(2),        -- Discount level
    discount_justification String,           -- Discount reason
    pricing_model LowCardinality(String),    -- Pricing structure
    pricing_tiers Array(String),            -- Price tiers
    unit_economics Map(String, Float64),    -- Unit metrics
    
    -- Revenue Quality
    -- ============
    revenue_quality_score UInt8,            -- Overall quality (0-100)
    revenue_risk_score UInt8,               -- Risk level (0-100)
    profitability_score UInt8,              -- Profitability (0-100)
    customer_lifetime_value Decimal64(2),    -- Predicted CLV
    acquisition_cost Decimal64(2),          -- Customer acquisition cost
    payback_period_months UInt8,            -- Expected payback
    gross_margin_percentage Decimal32(2),    -- Gross margin
    net_margin_percentage Decimal32(2),      -- Net margin
    
    -- Forecast & Predictions
    -- ===================
    forecast_category LowCardinality(String), -- Forecast classification
    forecast_subcategory LowCardinality(String), -- Detailed forecast type
    forecast_confidence UInt8,               -- Confidence level (0-100)
    upside_forecast Decimal64(2),            -- Best case
    downside_forecast Decimal64(2),          -- Worst case
    weighted_forecast Decimal64(2),          -- Probability-adjusted
    forecast_assumptions Array(String),      -- Key assumptions
    historical_accuracy Float32,             -- Past accuracy
    
    -- Pipeline Analysis
    -- ==============
    pipeline_coverage_ratio Decimal32(2),    -- Coverage ratio
    gap_to_quota Decimal64(2),              -- Quota gap
    required_velocity Decimal32(2),          -- Required speed
    win_rate_trend Float32,                 -- Win rate
    average_deal_size_trend Float32,        -- Deal size trend
    sales_cycle_trend Float32,              -- Cycle trend
    
    -- Revenue Patterns
    -- =============
    seasonality_factors Array(Float32),      -- Seasonal patterns
    revenue_concentration_risk UInt8,        -- Concentration risk
    revenue_diversity_score UInt8,          -- Revenue diversity
    revenue_predictability_score UInt8,      -- Predictability
    revenue_stability_score UInt8,          -- Stability score
    
    -- Growth & Expansion
    -- ===============
    growth_rate_yoy Float32,                -- YoY growth
    expansion_opportunity_score UInt8,       -- Expansion potential
    cross_sell_opportunities Array(String),  -- Cross-sell options
    upsell_opportunities Array(String),      -- Upsell options
    wallet_share_percentage Float32,         -- Wallet share
    market_penetration_rate Float32,        -- Market penetration
    
    -- Risk Analysis
    -- ===========
    revenue_risk_factors Array(String),      -- Risk factors
    mitigation_strategies Array(String),     -- Risk mitigation
    competitive_pressure_score UInt8,        -- Competitive risk
    market_risk_score UInt8,                -- Market risk
    customer_risk_score UInt8,              -- Customer risk
    
    -- Benchmarking
    -- ==========
    industry_benchmark_metrics Map(String, Float64), -- Industry benchmarks
    peer_comparison_metrics Map(String, Float64),   -- Peer comparison
    performance_vs_target Float32,           -- Target performance
    market_share_percentage Float32,         -- Market share
    
    -- Metadata
    -- =======
    created_at DateTime,                     -- Creation time
    updated_at DateTime,                     -- Last update
    data_quality_score UInt8,               -- Data quality
    confidence_level UInt8,                 -- Confidence
    calculation_version String,              -- Algorithm version
    
    -- Extended Analytics
    -- ===============
    custom_metrics Map(String, Float64),     -- Custom metrics
    metadata String,                         -- Additional metadata (JSON string)
    analysis_notes Array(String)             -- Analysis notes

) ENGINE = ReplacingMergeTree(time)
ORDER BY (workspace_id, opportunity_id)
SETTINGS index_granularity = 8192;

-- +goose down
DROP TABLE leads.revenue_intelligence_v1;