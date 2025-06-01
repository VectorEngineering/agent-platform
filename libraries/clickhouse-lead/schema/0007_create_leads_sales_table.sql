-- Sales Performance Table (V1)
-- ==========================
-- 
-- Comprehensive tracking of sales representative performance metrics and activities.
-- Provides deep insights into sales effectiveness, productivity, and outcomes.
-- 
-- Use Cases:
-- ---------
-- 1. Sales performance analysis
-- 2. Productivity optimization
-- 3. Coaching and development
-- 4. Resource allocation
-- 5. Compensation planning
-- 6. Team benchmarking
-- 
-- Key Metrics:
-- ----------
-- - Activity volumes
-- - Conversion rates
-- - Pipeline management
-- - Revenue generation
-- - Time utilization
-- - Quality indicators

-- +goose up
CREATE TABLE leads.sales_performance_v1 (
    -- Core Identifiers
    -- ==============
    workspace_id String,                    -- Multi-tenant identifier
    rep_id String,                           -- Sales rep identifier
    date Date,                              -- Performance date
    team_id String,                         -- Team identifier
    manager_id String,                      -- Manager identifier
    territory_id String,                    -- Territory identifier
    
    -- Activity Metrics
    -- =============
    meetings_scheduled UInt16,              -- Total meetings scheduled
    meetings_completed UInt16,              -- Completed meetings
    meetings_cancelled UInt16,              -- Cancelled meetings
    meetings_no_show UInt16,               -- No-show meetings
    meeting_duration_minutes UInt32,        -- Total meeting time
    
    emails_sent UInt16,                    -- Total emails sent
    emails_opened UInt16,                  -- Emails opened
    emails_clicked UInt16,                 -- Email clicks
    emails_replied UInt16,                 -- Email replies
    email_templates_used Array(String),    -- Templates used
    
    calls_made UInt16,                     -- Total calls
    calls_connected UInt16,                -- Connected calls
    calls_duration_minutes UInt32,         -- Call duration
    voicemails_left UInt16,               -- Voicemails
    call_types Array(LowCardinality(String)), -- Call categories
    
    proposals_sent UInt16,                 -- Proposals sent
    proposals_viewed UInt16,               -- Proposals viewed
    proposals_accepted UInt16,             -- Accepted proposals
    proposal_types Array(String),          -- Proposal types
    
    -- Effectiveness Metrics
    -- ==================
    meeting_acceptance_rate Decimal32(4),   -- Meeting accept rate
    meeting_effectiveness_score UInt8,      -- Meeting quality
    meeting_to_opportunity_rate Decimal32(4), -- Conversion rate
    
    email_response_rate Decimal32(4),      -- Email response rate
    email_engagement_score UInt8,          -- Email engagement
    email_sentiment_score Int8,            -- Email sentiment
    
    call_connection_rate Decimal32(4),     -- Call connect rate
    call_effectiveness_score UInt8,        -- Call quality
    call_sentiment_score Int8,             -- Call sentiment
    
    proposal_acceptance_rate Decimal32(4),  -- Proposal success
    proposal_quality_score UInt8,          -- Proposal quality
    average_proposal_value Decimal64(2),    -- Avg proposal size
    
    -- Pipeline Management
    -- ================
    pipeline_value Decimal64(2),           -- Total pipeline
    pipeline_changes Decimal64(2),         -- Pipeline change
    pipeline_velocity Float32,             -- Deal velocity
    pipeline_health_score UInt8,           -- Pipeline health
    
    opportunities_created UInt16,          -- New opportunities
    opportunities_advanced UInt16,         -- Stage advances
    opportunities_closed UInt16,           -- Closed deals
    opportunities_lost UInt16,             -- Lost deals
    
    stage_conversion_rates Array(Decimal32(4)), -- Stage conversions
    stage_velocity_days Array(UInt8),      -- Stage duration
    pipeline_coverage_ratio Decimal32(2),   -- Pipeline coverage
    
    -- Performance Indicators
    -- ==================
    quota_attainment Decimal32(4),         -- Quota achievement
    quota_trending_indicator Int8,         -- Quota trend
    revenue_generated Decimal64(2),        -- Revenue generated
    revenue_target Decimal64(2),           -- Revenue target
    
    win_rate Decimal32(4),                -- Win rate
    win_rate_trend Float32,               -- Win rate trend
    loss_reasons Array(String),           -- Loss reasons
    competitive_wins UInt16,              -- Competitive wins
    
    average_deal_size Decimal64(2),       -- Avg deal size
    deal_size_trend Float32,              -- Size trend
    sales_cycle_length Decimal32(2),      -- Sales cycle
    discount_rate_avg Decimal32(4),       -- Avg discount
    
    -- Productivity Metrics
    -- ================
    active_selling_time_minutes UInt32,    -- Selling time
    administrative_time_minutes UInt32,    -- Admin time
    crm_usage_time_minutes UInt32,        -- CRM usage
    meeting_preparation_time_minutes UInt32, -- Prep time
    
    task_completion_rate Decimal32(4),     -- Task completion
    overdue_tasks UInt16,                 -- Overdue items
    follow_up_speed_minutes Decimal32(2),  -- Response time
    activity_score UInt8,                 -- Activity level
    
    time_allocation Map(String, UInt32),   -- Time breakdown
    productivity_score UInt8,              -- Productivity
    work_pattern_analysis String,          -- Work patterns (JSON string)
    
    -- Quality & Compliance
    -- =================
    forecast_accuracy Decimal32(4),        -- Forecast accuracy
    forecast_trend Float32,               -- Accuracy trend
    data_quality_score UInt8,             -- Data quality
    compliance_score UInt8,               -- Process compliance
    
    customer_satisfaction_score Decimal32(2), -- CSAT
    nps_score Int8,                       -- NPS
    deal_margin_percentage Decimal32(4),   -- Deal margins
    deal_quality_score UInt8,             -- Deal quality
    
    -- Skills & Development
    -- =================
    product_knowledge_score UInt8,         -- Product knowledge
    sales_methodology_adherence UInt8,     -- Method adherence
    coaching_sessions_attended UInt8,      -- Coaching count
    training_completion_rate Decimal32(4),  -- Training progress
    skill_gaps Array(String),             -- Skill gaps
    improvement_areas Array(String),       -- Areas to improve
    
    -- Engagement & Collaboration
    -- ======================
    team_collaboration_score UInt8,        -- Collaboration
    cross_functional_deals UInt16,         -- Cross-func deals
    partner_involved_deals UInt16,         -- Partner deals
    internal_meeting_hours UInt8,          -- Internal meetings
    
    -- Benchmarking
    -- ==========
    peer_rank UInt16,                     -- Rank in team
    performance_percentile UInt8,          -- Percentile
    year_over_year_growth Float32,        -- YoY growth
    quarter_over_quarter_growth Float32,   -- QoQ growth
    
    -- Metadata
    -- =======
    created_at DateTime,                   -- Creation time
    updated_at DateTime,                   -- Last update
    data_completeness_score UInt8,        -- Data completeness
    calculation_version String,            -- Algorithm version
    
    -- Extended Analytics
    -- ===============
    custom_metrics Map(String, Float64),   -- Custom metrics
    metadata String,                       -- Additional metadata
    analysis_notes Array(String)           -- Analysis notes

) ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (workspace_id, rep_id, date)
SETTINGS index_granularity = 8192;

-- Table Notes:
-- ===========
-- - Uses SummingMergeTree for efficient aggregation
-- - Partitioned by month for historical analysis
-- - Ordered by tenant, rep, and date for typical queries
-- - Includes comprehensive performance metrics
-- - Supports detailed activity tracking
-- - Enables benchmarking and development planning
-- 
-- Common Queries:
-- -------------
-- 1. Performance trending and analysis
-- 2. Activity and effectiveness monitoring
-- 3. Pipeline and revenue tracking
-- 4. Quality and compliance assessment
-- 5. Skills and development planning

-- +goose down
DROP TABLE leads.sales_performance_v1;