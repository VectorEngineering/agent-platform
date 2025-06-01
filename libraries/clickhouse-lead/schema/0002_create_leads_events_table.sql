-- +goose up
CREATE TABLE leads.raw_lead_events_v1 (
    /**
    * Raw Lead Events Table (V1)
    * =========================
    * 
    * This table stores comprehensive lead event data with full historical tracking.
    * Each row represents a lead event/change with complete lead information at that point in time.
    * 
    * Example Lead Profile:
    * -------------------
    * - B2B SaaS Company Lead
    * - Enterprise Software Purchase
    * - Multiple Stakeholders
    * - 6-Month Sales Cycle
    * 
    * Storage Notes:
    * - Uses MergeTree engine for high-performance inserts and queries
    * - Ordered by tenant_id, timestamp, and lead_id for efficient filtering
    * - Uses LowCardinality for columns with limited distinct values
    */

    /**
     * Event Identification & Metadata
     * ============================
     * Core fields to track individual events and their context
     */
    workspace_id String,    -- Multi-tenant identifier
    event_id String,      -- Unique identifier for each event
    time          DateTime,
    event_type LowCardinality(String), -- Type of event (creation, update, qualification, etc.)
    
    /**
     * Lead Core Information
     * ===================
     * Essential lead/company identification and classification
     */
    lead_id String,       -- Unique identifier for the lead
    endpoint_id String,   -- Associated endpoint/integration ID
    email String,         -- Primary contact email
    company String,       -- Company/organization name
    industry LowCardinality(String),      -- Industry classification
    sub_industry LowCardinality(String),  -- Detailed industry segment
    employee_count UInt32,                -- Company size by employee count
    annual_revenue Decimal64(2),          -- Annual revenue in standard currency
    year_founded UInt16,                  -- Company founding year
    stock_symbol String,                  -- Stock symbol if public
    company_type LowCardinality(String),  -- Public, Private, Government, etc.
    account_id String,                         -- Parent account identifier
    company_size_range LowCardinality(String), -- Company size bracket
    revenue_range LowCardinality(String),      -- Annual revenue bracket
    industry_vertical LowCardinality(String),  -- Primary industry vertical
    
    /**
     * Enhanced Company Information
     * =========================
     * Enriched company data for better lead qualification
     */
    company_description String,           -- Brief company description
    technologies_used Array(LowCardinality(String)), -- Tech stack information
    competitors Array(String),            -- Known competitors
    funding_rounds Array(String),         -- Funding history
    total_funding Decimal64(2),           -- Total funding raised
    last_funding_date Date,               -- Most recent funding
    growth_rate Float64,                  -- YoY growth rate
    market_segment LowCardinality(String), -- Target market segment
    geographic_presence Array(LowCardinality(String)), -- Operating locations
    regulatory_compliance Array(LowCardinality(String)), -- Compliance requirements
    
    /**
     * Contact Details
     * =============
     * Primary contact person information and location
     */
    contact_name String,                  -- Full name of primary contact
    contact_title String,                 -- Job title/position
    contact_phone String,                 -- Contact phone number
    contact_country LowCardinality(String), -- Country code/name
    contact_city String,                    -- City name
    contact_timezone String,                -- Timezone identifier
    contact_linkedin_url String,            -- LinkedIn profile URL
    contact_twitter_handle String,          -- Twitter handle
    contact_department LowCardinality(String), -- Department/Division
    reporting_to String,                    -- Superior's role
    years_in_role UInt8,                   -- Experience in current role
    decision_making_role LowCardinality(String), -- Decision maker, Influencer, etc.
    preferred_contact_method LowCardinality(String), -- Email, Phone, etc.
    languages Array(LowCardinality(String)), -- Spoken languages
    
    /**
     * Additional Stakeholders
     * ====================
     * Other contacts involved in the buying process stored as arrays
     */
    stakeholder_ids Array(String),                    -- Array of stakeholder IDs
    stakeholder_names Array(String),                  -- Array of stakeholder names
    stakeholder_titles Array(String),                 -- Array of job titles
    stakeholder_roles Array(LowCardinality(String)),  -- Array of roles in decision process
    stakeholder_influence_levels Array(UInt8),        -- Array of influence scores
    stakeholder_emails Array(String),                 -- Array of email addresses
    stakeholder_phones Array(String),                 -- Array of phone numbers
    stakeholder_departments Array(LowCardinality(String)), -- Array of departments
    stakeholder_engagement_scores Array(Float64),     -- Array of engagement scores
    
    /**
     * Marketing Attribution
     * ==================
     * Source tracking and campaign attribution data
     */
    source LowCardinality(String),        -- Traffic source (e.g., organic, paid)
    medium LowCardinality(String),        -- Marketing medium (e.g., cpc, email)
    campaign_id String,                   -- Campaign identifier
    campaign_name String,                 -- Campaign name
    referrer_domain String,               -- Original referrer domain
    landing_page String,                  -- First page visited
    utm_parameters String,                -- Full UTM parameter string
    referral_path Array(String),          -- Complete conversion path
    first_touch_channel String,           -- First marketing touchpoint
    last_touch_channel String,            -- Last marketing touchpoint
    
    /**
     * Technical Context
     * ===============
     * Device and browser information
     */
    device_type LowCardinality(String),   -- Device category (mobile, desktop, etc)
    device_os LowCardinality(String),     -- Operating system
    browser LowCardinality(String),       -- Browser type
    ip_address String,                    -- IP address (for geo-tracking)
    user_agent String,                    -- Full user agent string
    
    /**
     * Enhanced Lead Scoring
     * ==================
     * Comprehensive scoring system (0-100 scale)
     */
    fit_score UInt8,          -- Company/product fit score
    interest_score UInt8,     -- Demonstrated interest level
    behavior_score UInt8,     -- Engagement behavior score
    budget_score UInt8,       -- Budget qualification score
    authority_score UInt8,    -- Decision-making authority score
    need_score UInt8,         -- Problem/need intensity score
    timing_score UInt8,       -- Purchase timing score
    final_score UInt8,        -- Composite lead score
    
    /**
     * Behavioral Scoring Components
     * ==========================
     * Detailed behavioral analysis
     */
    website_engagement_score Float64,     -- Website interaction score
    content_engagement_score Float64,     -- Content consumption score
    email_engagement_score Float64,       -- Email interaction score
    social_engagement_score Float64,      -- Social media engagement
    event_participation_score Float64,    -- Webinar/event participation
    product_interest_score Float64,       -- Product-specific interest
    
    /**
     * Lead Status and Stage
     * ===================
     * Current and previous state tracking
     */
    previous_status LowCardinality(String),  -- Previous lead status
    current_status LowCardinality(String),   -- Current lead status
    previous_stage LowCardinality(String),   -- Previous pipeline stage
    current_stage LowCardinality(String),    -- Current pipeline stage
    stage_duration_days Map(String, UInt16), -- Days spent in each stage
    status_change_history Array(String),     -- Historical status changes
    
    /**
     * Deal/Opportunity Information
     * =========================
     * Sales opportunity details and tracking
     */
    deal_size Decimal64(2),                  -- Potential deal value
    deal_currency LowCardinality(String),    -- Deal currency code
    probability UInt8,                       -- Win probability percentage
    expected_close_date Date,                -- Projected closing date
    actual_close_date Date,                  -- Actual deal closure date
    win_reason LowCardinality(String),       -- Reason for winning deal
    loss_reason LowCardinality(String),      -- Reason for losing deal
    competitor LowCardinality(String),       -- Competing vendor if lost
    deal_complexity_score UInt8,             -- Complexity rating
    implementation_time_days UInt16,         -- Expected implementation time
    contract_term_months UInt8,              -- Contract duration
    renewal_probability Float64,             -- Likelihood of renewal
    
    /**
     * Product Interest & Requirements
     * ============================
     * Specific product and requirement details
     */
    product_interest Array(LowCardinality(String)), -- Interested products/services
    initial_requirement String,                     -- Initial stated needs
    detailed_requirements String,                   -- Detailed requirements
    technical_requirements Array(String),           -- Technical specifications
    budget_range LowCardinality(String),           -- Budget range category
    purchase_timeline LowCardinality(String),       -- Expected purchase timeframe
    decision_criteria Array(String),                -- Key decision factors
    success_criteria Array(String),                 -- Success metrics
    integration_needs Array(String),                -- Integration requirements
    
    /**
     * Assignment & Routing
     * =================
     * Internal handling and prioritization
     */
    assigned_team_id String,                -- Assigned team identifier
    assigned_user_id String,                -- Assigned user/rep identifier
    routing_rule_id String,                 -- Applied routing rule
    priority LowCardinality(String),        -- Lead priority level
    sla_status LowCardinality(String),      -- SLA compliance status
    response_time_seconds UInt32,           -- Time to first response
    
    /**
     * Engagement Metrics
     * ===============
     * Quantitative engagement tracking
     */
    email_opens UInt32,                     -- Email open count
    email_clicks UInt32,                    -- Email click count
    website_visits UInt32,                  -- Website visit count
    form_submissions UInt32,                -- Form submission count
    chat_interactions UInt32,               -- Chat interaction count
    meeting_requests UInt32,                -- Meeting request count
    document_downloads Array(String),        -- Downloaded materials
    webinar_attendances Array(String),       -- Attended webinars
    support_tickets UInt32,                  -- Number of support inquiries
    feature_requests Array(String),          -- Requested features
    
    /**
     * Communication History
     * ==================
     * Detailed interaction tracking
     */
    communication_preference LowCardinality(String), -- Preferred channel
    last_contacted_by String,                       -- Last touching sales rep
    last_contact_type LowCardinality(String),       -- Type of last contact
    next_scheduled_contact DateTime,                -- Next planned touchpoint
    communication_frequency String,                 -- Contact frequency preference
    opt_in_status Map(String, UInt8),              -- Channel-specific opt-ins
    
    /**
     * Temporal Tracking
     * ==============
     * Key timeline markers in Unix milliseconds
     */
    first_contact_time Int64,               -- First contact timestamp
    last_contact_time Int64,                -- Most recent contact
    qualification_time Int64,               -- Qualification timestamp
    conversion_time Int64,                  -- Conversion timestamp
    last_activity_time Int64,              -- Last activity timestamp
    next_action_due_time Int64,            -- Next action due
    
    /**
     * Classification Tags
     * ================
     * Flexible categorization array
     */
    tags Array(LowCardinality(String)),     -- Classification/segment tags
    custom_fields Map(String, String),      -- Custom field values
    
    /**
     * Compliance & Governance
     * ====================
     * Regulatory and compliance tracking
     */
    gdpr_status LowCardinality(String),     -- GDPR compliance status
    consent_records Array(String),          -- Consent history
    data_processing_basis String,           -- Legal basis for processing
    data_retention_policy String,           -- Retention policy applied
    
    /**
     * Metadata
     * =======
     * Additional system information
     */
    created_at DateTime,                    -- Record creation time
    updated_at DateTime,                    -- Last update time
    created_by String,                      -- Creator identifier
    updated_by String,                      -- Last modifier identifier
    version UInt32,                         -- Record version number
    is_deleted UInt8,                       -- Soft delete flag
    deletion_time DateTime DEFAULT NULL,    -- Deletion timestamp
    
    /**
     * Extended Attributes
     * ================
     * Flexible storage for additional data
     */
    metadata String,                          -- Additional metadata (JSON string)
    custom_attributes String,                 -- Custom attribute storage (JSON string)
    integration_data String,                  -- Third-party integration data (JSON string)
    
    /**
     * Technical Infrastructure
     * =====================
     * Technology landscape and integration potential
     */
    tech_stack Array(String),                  -- Current technologies
    tech_categories Array(String),             -- Technology categories
    compatibility_score UInt8,                 -- Solution compatibility (0-100)
    integration_complexity_score UInt8,         -- Integration difficulty (0-100)
    
    /**
     * Growth & Market Indicators
     * ======================
     * Company growth and market position signals
     */
    funding_events Array(String),              -- Funding history
    expansion_signals Array(String),           -- Growth indicators
    hiring_velocity Int8,                      -- Hiring trend (-100 to 100)
    market_sentiment_score Int8,               -- Market perception (-100 to 100)
    
    /**
     * Strategic Relationships
     * ===================
     * Partnership and ecosystem analysis
     */
    partnership_status LowCardinality(String), -- Current partnership level
    partner_ecosystem Array(String),           -- Partner relationships
    strategic_alliances Array(String),         -- Strategic partnerships
    competitor_relationships Array(String),     -- Competitor associations
    
    /**
     * Buying Center Mapping
     * ==================
     * Key stakeholder identification and roles
     */
    decision_makers Array(String),             -- Primary decision makers
    influencers Array(String),                -- Key influencers
    budget_holders Array(String),             -- Budget authorities
    champions Array(String),                  -- Internal champions
    detractors Array(String),                -- Potential blockers
    
    /**
     * Account Health Metrics
     * ==================
     * Current customer health indicators
     */
    product_usage_score UInt8,               -- Usage effectiveness (0-100)
    support_ticket_severity_trend Int8,      -- Support trend (-100 to 100)
    nps_score Int8,                         -- Net Promoter Score (-100 to 100)
    churn_risk_indicators Array(String)      -- Churn risk factors
) ENGINE = MergeTree()
ORDER BY (workspace_id, time, lead_id, event_id);

-- +goose down
DROP TABLE leads.raw_lead_events_v1;