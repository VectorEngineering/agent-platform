
-- +goose up
CREATE TABLE leads.sales_cycle_events_v1 (
    /**
    * Sales Cycle Events Table (V1)
    * ===========================
    * Comprehensive tracking of sales cycle events with maximum data capture
    */
    
    /**
     * Core Identifiers & Metadata
     */
    workspace_id String,    -- Multi-tenant identifier
    event_id String,          -- Unique event identifier
    lead_id String,           -- Associated lead ID
    opportunity_id String,    -- Associated opportunity ID
    account_id String,        -- Parent account ID
    parent_event_id String,   -- Parent event if part of sequence
    time    DateTime,                          -- Event timestamp (Unix ms)
    event_source String,                      -- Origin of event
    event_version String,                     -- Schema version
    
    /**
     * Sales Activity Details
     */
    activity_type LowCardinality(String),     -- Primary activity type
    activity_subtype LowCardinality(String),  -- Detailed activity type
    activity_status LowCardinality(String),   -- Current status
    activity_outcome LowCardinality(String),  -- Result
    activity_priority LowCardinality(String), -- Priority level
    activity_complexity UInt8,                -- Complexity score
    activity_sequence_number UInt32,          -- Sequence in sales process
    previous_activity_id String,              -- Previous activity
    next_activity_id String,                  -- Next planned activity
    parent_activity_id String,                -- Parent activity if sub-activity
    activity_source_system String,            -- Originating system
    activity_category Array(LowCardinality(String)), -- Activity categories
    activity_tags Array(String),              -- Activity tags
    is_customer_facing Boolean,               -- Customer facing flag
    requires_follow_up Boolean,               -- Follow-up needed
    follow_up_deadline DateTime,              -- Follow-up due
    
    /**
     * Sales Representatives
     */
    primary_rep_id String,                    -- Primary sales rep
    supporting_rep_ids Array(String),         -- Supporting reps
    sales_team_id String,                     -- Team identifier
    sales_region LowCardinality(String),      -- Sales region
    sales_territory String,                   -- Territory
    rep_experience_level UInt8,               -- Rep experience (0-100)
    rep_win_rate Float32,                     -- Historical win rate
    rep_quota_attainment Float32,             -- Quota achievement
    rep_engagement_score UInt8,               -- Rep engagement (0-100)
    manager_id String,                        -- Sales manager
    
    /**
     * Stakeholder Details
     */
    stakeholder_id String,                    -- Primary stakeholder
    stakeholder_ids Array(String),            -- All stakeholders
    stakeholder_roles Array(LowCardinality(String)), -- Stakeholder roles
    stakeholder_departments Array(LowCardinality(String)), -- Departments
    stakeholder_levels Array(LowCardinality(String)), -- Org levels
    stakeholder_influence_levels Array(UInt8), -- Influence scores
    buying_committee_roles Array(LowCardinality(String)), -- Committee roles
    decision_making_capacities Array(LowCardinality(String)), -- Decision authority
    stakeholder_engagement_scores Array(UInt8), -- Engagement levels
    stakeholder_relationships Array(LowCardinality(String)), -- Relationship types
    key_contact_changes Array(String),        -- Contact role changes
    relationship_strength_scores Array(UInt8), -- Relationship scores
    last_contact_dates Array(DateTime),       -- Last contacts
    preferred_contact_methods Array(LowCardinality(String)), -- Contact preferences
    
    /**
     * Meeting & Communication Intelligence
     */
    meeting_duration_seconds Int32,           -- Duration
    meeting_type LowCardinality(String),      -- Meeting type
    meeting_platform String,                  -- Platform used
    meeting_recording_url String,             -- Recording link
    meeting_transcript_url String,            -- Transcript link
    meeting_sentiment_score Int8,             -- Overall sentiment
    meeting_energy_level UInt8,               -- Energy level
    key_topics_discussed Array(String),       -- Topics covered
    topic_sentiment_scores Map(String, Int8), -- Topic sentiments
    next_steps_clarity_score UInt8,          -- Next steps clarity
    follow_up_commitments Array(String),      -- Follow-ups
    action_items Array(String),               -- Action items
    decision_makers_present Array(String),    -- Present decision makers
    meeting_effectiveness_score UInt8,        -- Effectiveness
    participant_engagement_scores Map(String, UInt8), -- Participant engagement
    questions_asked Array(String),            -- Questions raised
    objections_raised Array(String),          -- Objections
    objection_handling_scores Array(UInt8),   -- Objection handling
    meeting_preparation_score UInt8,          -- Preparation level
    meeting_objective_achieved Boolean,        -- Objective met
    
    /**
     * Sales Process & Methodology
     */
    sales_methodology LowCardinality(String), -- Methodology
    sales_stage LowCardinality(String),       -- Current stage
    previous_stage LowCardinality(String),    -- Previous stage
    stage_change_reason String,               -- Stage change reason
    stage_duration_days UInt16,               -- Time in stage
    stage_progress_percentage UInt8,          -- Stage progress
    deal_velocity_indicator Int8,             -- Velocity vs benchmark
    deal_health_score UInt8,                  -- Overall health
    deal_risk_score UInt8,                    -- Risk level
    deal_complexity_score UInt8,              -- Complexity
    deal_priority_score UInt8,                -- Priority
    sales_motion LowCardinality(String),      -- Sales motion type
    deal_acceleration_attempts Array(String), -- Acceleration efforts
    deal_stall_reasons Array(String),         -- Stall reasons
    
    /**
     * Deal Dynamics & Financials
     */
    current_deal_size Decimal64(2),           -- Current value
    previous_deal_size Decimal64(2),          -- Previous value
    deal_size_change_reason String,           -- Value change reason
    original_deal_size Decimal64(2),          -- Original value
    deal_size_history Array(Decimal64(2)),    -- Value history
    pricing_model LowCardinality(String),     -- Pricing model
    pricing_tier LowCardinality(String),      -- Pricing tier
    payment_terms String,                     -- Payment terms
    billing_frequency LowCardinality(String), -- Billing frequency
    contract_duration_months UInt8,           -- Contract length
    discount_requested Decimal32(2),          -- Requested discount
    discount_approved Decimal32(2),           -- Approved discount
    discount_justification String,            -- Discount reason
    cost_of_sale Decimal64(2),               -- Sales cost
    expected_margin Decimal32(2),             -- Expected margin
    implementation_cost Decimal64(2),         -- Implementation cost
    total_contract_value Decimal64(2),        -- Total value
    annual_recurring_revenue Decimal64(2),    -- ARR
    monthly_recurring_revenue Decimal64(2),   -- MRR
    one_time_revenue Decimal64(2),           -- One-time revenue
    expansion_revenue_potential Decimal64(2), -- Expansion potential
    
    /**
     * Competitive Analysis
     */
    competitors_mentioned Array(String),       -- Named competitors
    competitive_displacement Boolean,          -- Replacement deal
    displaced_competitor String,               -- Competitor replaced
    competitive_strengths Array(String),       -- Our strengths
    competitive_weaknesses Array(String),      -- Our weaknesses
    competitor_strengths Array(String),        -- Their strengths
    competitor_weaknesses Array(String),       -- Their weaknesses
    win_probability UInt8,                     -- Win probability
    win_probability_change Int8,               -- Probability change
    loss_risk_factors Array(String),           -- Risk factors
    risk_mitigation_plans Array(String),       -- Risk mitigations
    differentiation_points Array(String),       -- Differentiators
    competitive_positioning String,             -- Position strategy
    competitor_pricing_intel Map(String, String), -- Competitor pricing
    competitive_feature_gaps Array(String),     -- Feature gaps
    competitive_win_rate Float32,               -- Win rate vs competitor
    
    /**
     * Solution & Value Proposition
     */
    business_drivers Array(String),            -- Business drivers
    pain_points Array(String),                 -- Pain points
    pain_point_priorities Map(String, UInt8),  -- Pain point priority
    solution_components Array(String),          -- Solution elements
    product_lines Array(String),                -- Product lines
    features_discussed Array(String),           -- Features covered
    feature_interest_levels Map(String, UInt8), -- Feature interest
    technical_requirements Array(String),       -- Tech requirements
    integration_requirements Array(String),      -- Integration needs
    customization_needs Array(String),          -- Customization
    solution_fit_score UInt8,                   -- Solution fit
    technical_fit_score UInt8,                  -- Technical fit
    functional_fit_score UInt8,                 -- Functional fit
    roi_metrics Array(String),                  -- ROI metrics
    roi_calculation_details String,             -- ROI details (JSON string)
    value_drivers Array(String),                -- Value drivers
    success_metrics Array(String),              -- Success metrics
    implementation_complexity_score UInt8,       -- Implementation complexity
    time_to_value_days UInt16,                  -- Time to value
    expected_outcomes Array(String),             -- Expected outcomes
    
    /**
     * Stakeholder Sentiment & Engagement
     */
    technical_sentiment_score Int8,             -- Technical sentiment
    business_sentiment_score Int8,              -- Business sentiment
    financial_sentiment_score Int8,             -- Financial sentiment
    user_sentiment_score Int8,                  -- User sentiment
    overall_sentiment_trend Int8,               -- Sentiment trend
    champion_engagement_score UInt8,            -- Champion engagement
    detractor_risk_score UInt8,                -- Detractor risk
    relationship_health_score UInt8,            -- Relationship health
    executive_sponsorship_strength UInt8,       -- Exec support
    stakeholder_alignment_score UInt8,          -- Alignment score
    
    /**
     * Buying Process & Decision Making
     */
    buying_stage LowCardinality(String),        -- Buying stage
    buying_process_type LowCardinality(String), -- Process type
    evaluation_criteria Array(String),          -- Evaluation criteria
    decision_criteria Array(String),            -- Decision criteria
    decision_making_process String,             -- Decision process
    approval_chain Array(String),               -- Approval chain
    budget_status LowCardinality(String),       -- Budget status
    budget_type LowCardinality(String),         -- Budget type
    budget_timeframe String,                    -- Budget timing
    budget_approval_status String,              -- Budget approval
    procurement_process String,                 -- Procurement process
    legal_requirements Array(String),           -- Legal requirements
    security_requirements Array(String),        -- Security needs
    compliance_requirements Array(String),      -- Compliance needs
    
    /**
     * Time & Planning
     */
    expected_close_date Date,                   -- Expected close
    original_close_date Date,                   -- Original close
    close_date_changes Array(Date),             -- Close date history
    implementation_start_date Date,             -- Implementation start
    go_live_date Date,                         -- Go-live date
    critical_milestones Array(String),          -- Key milestones
    milestone_dates Map(String, Date),          -- Milestone timing
    decision_timeframe String,                  -- Decision timing
    implementation_timeline String,             -- Implementation plan
    
    /**
     * Financial Context
     */
    currency_code LowCardinality(String),       -- Currency
    exchange_rate Decimal32(6),                 -- Exchange rate
    timezone String,                            -- Timezone
    fiscal_quarter String,                      -- Fiscal quarter
    fiscal_year UInt16,                         -- Fiscal year
    fiscal_period String,                       -- Fiscal period
    
    /**
     * Extended Metadata
     */
    created_at DateTime,                        -- Creation time
    updated_at DateTime,                        -- Last update
    created_by String,                          -- Creator
    updated_by String,                          -- Last modifier
    version UInt32,                             -- Version
    is_deleted UInt8,                           -- Deletion flag
    deletion_time DateTime DEFAULT NULL,        -- Deletion time
    
    /**
     * Custom & Debug Data
     */
    custom_fields Map(String, String),          -- Custom fields
    integration_metadata Map(String, String),   -- Integration data
    debug_info String,                         -- Debug data (JSON string)
    raw_data String                           -- Raw event data (JSON string)

) ENGINE = MergeTree()
PARTITION BY toYYYYMM(toDateTime(time))
ORDER BY (time, lead_id, event_id)
SETTINGS index_granularity = 8192;

-- +goose down
DROP TABLE leads.sales_cycle_events_v1;