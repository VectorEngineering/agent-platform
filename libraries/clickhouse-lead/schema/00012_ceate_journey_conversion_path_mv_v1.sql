-- +goose up
-- First create the target table
CREATE TABLE leads.journey_analytics_per_day_v1 (
    workspace_id String,
    time DateTime,
    journey_stage String,
    journey_scenario String,
    
    -- Journey metrics
    leads_in_journey UInt64,
    total_sessions UInt64,
    avg_touchpoints Float64,
    
    -- Stage progression
    common_paths String,
    content_stages_visited Array(String),
    
    -- Engagement quality
    avg_engagement_depth Float64,
    avg_time_per_lead Float64,
    
    -- Intent progression
    -- Changed to Array(Array(String)) to accommodate grouped arrays
    observed_intent_signals Array(Array(String)),
    behavior_patterns Array(Array(String)),
    
    -- Conversion signals
    conversions UInt64,
    urgent_leads UInt64,
    
    -- Channel preferences
    used_channels Array(String),
    dominant_channel String,
    
    -- Content impact
    influential_content Array(String),
    
    -- Geographic distribution
    active_countries Array(String),
    primary_market String
) ENGINE = ReplacingMergeTree(time)
ORDER BY (workspace_id, journey_stage, journey_scenario, time);

-- Then create the materialized view
CREATE MATERIALIZED VIEW leads.journey_analytics_mv_v1
TO leads.journey_analytics_per_day_v1
AS SELECT
    workspace_id,
    toStartOfDay(time) AS time,
    journey_stage,
    journey_scenario,
    
    -- Journey metrics
    count(DISTINCT lead_id) AS leads_in_journey,
    count(DISTINCT session_id) AS total_sessions,
    avg(sequence_number) AS avg_touchpoints,
    
    -- Stage progression
    any(interaction_path) AS common_paths,
    groupArray(DISTINCT content_stage) AS content_stages_visited,
    
    -- Engagement quality
    avg(depth_of_engagement) AS avg_engagement_depth,
    sum(duration_seconds) / count(DISTINCT lead_id) AS avg_time_per_lead,
    
    -- Intent progression
    groupArray(DISTINCT intent_signals) AS observed_intent_signals,
    groupArray(DISTINCT behavior_flags) AS behavior_patterns,
    
    -- Conversion signals
    countIf(interaction_outcome = 'converted') AS conversions,
    countIf(urgency_signals != []) AS urgent_leads,
    
    -- Channel preferences
    groupArray(DISTINCT channel) AS used_channels,
    any(channel) AS dominant_channel,
    
    -- Content impact
    groupArray(DISTINCT content_id) AS influential_content,
    
    -- Geographic distribution
    groupArray(DISTINCT geo_country) AS active_countries,
    any(geo_country) AS primary_market
FROM leads.raw_interaction_events_v1
GROUP BY
    workspace_id,
    time,
    journey_stage,
    journey_scenario
ORDER BY time;

-- +goose down
DROP VIEW IF EXISTS leads.journey_analytics_mv_v1;
DROP TABLE IF EXISTS leads.journey_analytics_per_day_v1;
