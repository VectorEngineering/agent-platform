-- +goose up
CREATE TABLE leads.raw_interaction_events_v1 (
    /**
    * Lead Interaction Events Table (V1)
    * ================================
    * 
    * Comprehensive tracking of all lead interactions with rich contextual data.
    * Designed to capture the complete picture of how leads engage across all touchpoints.
    * 
    * Use Cases:
    * ---------
    * 1. Advanced engagement scoring
    * 2. Behavioral pattern analysis
    * 3. Conversion path optimization
    * 4. Content effectiveness measurement
    * 5. Sales intelligence gathering
    * 6. Predictive lead scoring
    * 7. Attribution modeling
    */

    /**
     * Event Identification
     * ==================
     */
    workspace_id String,    -- Multi-tenant identifier
    event_id String,          -- Unique identifier
    lead_id String,           -- Lead identifier
    time    DateTime,          -- Unix milliseconds
    event_source String,      -- System/integration that generated event
    event_version String,     -- Schema version of the event
    
    /**
     * Interaction Context
     * =================
     */
    interaction_type LowCardinality(String), -- Primary interaction classification
    interaction_subtype LowCardinality(String), -- Detailed interaction type
    channel LowCardinality(String),         -- Primary channel
    sub_channel LowCardinality(String),     -- Specific platform/medium
    campaign_id String,                     -- Associated campaign
    campaign_group String,                  -- Campaign grouping
    experiment_id String,                   -- A/B test identifier
    variant_id String,                      -- Test variant
    
    /**
     * Interaction Quality & Metrics
     * ==========================
     */
    duration_seconds Int32,                 -- Duration
    duration_milliseconds Int64,            -- Precise duration
    depth_of_engagement UInt8,              -- Overall engagement (0-100)
    quality_score UInt8,                    -- Interaction quality (0-100)
    completion_rate Float32,                -- Task completion (0-1)
    bounce Boolean,                         -- Whether interaction was abandoned
    exit_intent Boolean,                    -- Showed exit intent
    rage_click_count UInt8,                -- Frustrated clicking count
    dead_click_count UInt8,                -- Clicks on non-interactive elements
    error_count UInt8,                      -- Number of errors encountered
    
    /**
     * Intent & Behavior Signals
     * ======================
     */
    intent_signals Array(LowCardinality(String)), -- Buying signals
    intent_categories Array(LowCardinality(String)), -- Intent categories
    behavior_flags Array(LowCardinality(String)),   -- Behavioral flags
    interest_shown Array(LowCardinality(String)),   -- Areas of interest
    pain_points Array(LowCardinality(String)),      -- Identified pain points
    objections Array(LowCardinality(String)),       -- Raised objections
    sentiment_score Int8,                           -- -100 to 100
    urgency_signals Array(LowCardinality(String)),  -- Urgency indicators
    
    /**
     * Content Interaction
     * =================
     */
    content_id String,                       -- Content identifier
    content_type LowCardinality(String),     -- Content type
    content_category Array(LowCardinality(String)), -- Categories
    content_topic Array(LowCardinality(String)),    -- Topics/tags
    content_format LowCardinality(String),   -- Format (pdf, video, etc)
    content_language LowCardinality(String), -- Content language
    content_version String,                  -- Content version
    content_stage LowCardinality(String),    -- Funnel stage
    content_engagement_metrics Map(String, Float64), -- Detailed metrics
    
    /**
     * Content Consumption
     * ================
     */
    scroll_depth UInt8,                      -- Scroll percentage
    scroll_depth_milestones Array(UInt8),    -- Scroll milestones hit
    time_on_content Int32,                   -- Active time (seconds)
    attention_time Int32,                    -- True attention time
    read_percentage Float32,                 -- Estimated read %
    video_watch_percentage Float32,          -- Video watch %
    video_milestones Array(UInt8),          -- Video milestones hit
    interaction_count UInt16,                -- Number of interactions
    
    /**
     * Form & Input Data
     * ===============
     */
    form_id String,                          -- Form identifier
    form_name String,                        -- Form name
    form_type LowCardinality(String),        -- Form type
    form_steps_total UInt8,                  -- Total form steps
    form_step_reached UInt8,                 -- Last step reached
    form_fields_total UInt8,                 -- Total fields
    form_fields_filled UInt8,                -- Fields completed
    form_submission_success Boolean,          -- Submission status
    form_errors Array(String),               -- Validation errors
    
    /**
     * Chat & Conversation
     * ================
     */
    conversation_id String,                   -- Chat session ID
    message_count UInt16,                    -- Messages exchanged
    response_time_avg Int32,                 -- Avg response time
    chat_duration Int32,                     -- Chat duration
    chat_sentiment_score Int8,               -- Chat sentiment
    chat_topics Array(LowCardinality(String)), -- Discussed topics
    chat_resolution_status LowCardinality(String), -- Resolution status
    chat_agent_id String,                    -- Agent identifier
    
    /**
     * Call & Meeting Data
     * ================
     */
    call_id String,                          -- Call identifier
    call_type LowCardinality(String),        -- Call type
    call_outcome LowCardinality(String),     -- Call outcome
    call_duration Int32,                     -- Call duration
    call_recording_url String,               -- Recording URL
    call_transcript_summary String,          -- Summary
    call_next_steps Array(String),           -- Agreed actions
    call_participants Array(String),         -- Participant IDs
    
    /**
     * Email Interaction
     * ==============
     */
    email_id String,                         -- Email identifier
    email_subject String,                    -- Subject line
    email_template_id String,                -- Template used
    email_campaign_id String,                -- Campaign ID
    email_open_count UInt8,                  -- Times opened
    email_click_count UInt8,                 -- Links clicked
    email_reply Boolean,                     -- Got reply
    email_reply_time Int32,                  -- Reply time
    email_links_clicked Array(String),       -- Clicked links
    
    /**
     * Journey & Session
     * ==============
     */
    session_id String,                       -- Session identifier
    session_number UInt32,                   -- Session number
    sequence_number UInt32,                  -- Event sequence
    interaction_path String,                 -- Journey path
    previous_interaction_id String,          -- Previous event
    next_interaction_id String,              -- Next event
    journey_stage LowCardinality(String),    -- Journey stage
    journey_scenario LowCardinality(String), -- Journey type
    
    /**
     * Technical Context
     * ===============
     */
    device_fingerprint String,               -- Device ID
    device_type LowCardinality(String),      -- Device type
    device_brand String,                     -- Device brand
    device_model String,                     -- Device model
    os_name LowCardinality(String),          -- OS name
    os_version String,                       -- OS version
    browser_name LowCardinality(String),     -- Browser
    browser_version String,                  -- Browser version
    screen_resolution String,                -- Screen size
    viewport_size String,                    -- Viewport
    connection_type LowCardinality(String),  -- Connection
    connection_speed Float32,                -- Speed Mbps
    
    /**
     * Location & Time
     * ============
     */
    ip_address String,                       -- IP address
    user_agent String,                       -- User agent
    geo_country LowCardinality(String),      -- Country
    geo_region LowCardinality(String),       -- Region
    geo_city String,                         -- City
    geo_postal_code String,                  -- Postal code
    geo_coordinates Tuple(Float64, Float64), -- Lat/Long
    timezone String,                         -- Timezone
    local_time DateTime,                     -- Local time
    
    /**
     * Business Context
     * =============
     */
    business_hours Boolean,                  -- In business hours
    response_time_seconds Int32,             -- Response time
    was_scheduled Boolean,                   -- Scheduled flag
    priority LowCardinality(String),         -- Priority level
    interaction_outcome LowCardinality(String), -- Outcome
    outcome_reason String,                   -- Outcome reason
    next_action String,                      -- Next action
    next_action_due DateTime,                -- Action due
    assigned_to String,                      -- Assignee
    
    /**
     * Integration Data
     * =============
     */
    source_system String,                    -- Source system
    source_timestamp Int64,                  -- Source time
    integration_id String,                   -- Integration ID
    external_id String,                      -- External ID
    sync_status LowCardinality(String),      -- Sync status
    
    /**
     * Metadata
     * =======
     */
    created_at DateTime,                     -- Creation time
    updated_at DateTime,                     -- Update time
    processed_at DateTime,                   -- Process time
    version UInt32,                          -- Version
    is_deleted UInt8,                        -- Deletion flag
    deletion_time DateTime DEFAULT NULL,     -- Deletion time
    
    /**
     * Custom & Extended Data
     * ===================
     */
    tags Array(LowCardinality(String)),      -- Tags
    labels Map(String, String),              -- Labels
    custom_attributes Map(String, String),   -- Custom attrs
    metadata String,                         -- Additional data
    debug_info String,                        -- Debug info
    raw_data String                          -- Raw event data
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(toDateTime(time))
ORDER BY (workspace_id, lead_id, time, event_id)
SETTINGS index_granularity = 8192;

-- +goose down
DROP TABLE leads.raw_interaction_events_v1;
