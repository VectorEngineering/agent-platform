-- +goose up

-- First create the target tables
CREATE TABLE leads.channel_performance_per_hour_v1 (
    workspace_id String,
    time DateTime,
    channel String,
    sub_channel String,
    interaction_type String,
    
    -- Interaction metrics
    total_interactions UInt64,
    unique_leads UInt64,
    
    -- Response metrics
    avg_response_time Float64,
    business_hours_ratio Float64,
    
    -- Quality metrics
    interaction_quality Float64,
    frustrated_interactions UInt64,
    error_encounters UInt64,
    
    -- Engagement depth
    avg_duration Float64,
    avg_engagement Float64,
    
    -- Channel effectiveness
    successful_interactions UInt64,
    actions_generated UInt64,
    
    -- Technical metrics
    device_types Array(String),
    avg_connection_speed Float64
) ENGINE = ReplacingMergeTree(time)
ORDER BY (workspace_id, channel, sub_channel, time);

-- Create the Channel Performance Materialized View
CREATE MATERIALIZED VIEW leads.channel_performance_mv_v1 
TO leads.channel_performance_per_hour_v1 
AS 
SELECT
    workspace_id,
    ts as time,
    channel,
    sub_channel,
    interaction_type,
    
    -- Interaction metrics
    count() AS total_interactions,
    count(DISTINCT lead_id) AS unique_leads,
    
    -- Response metrics
    avg(response_time_seconds) AS avg_response_time,
    countIf(business_hours = 1) / count() AS business_hours_ratio,
    
    -- Quality metrics
    avg(quality_score) AS interaction_quality,
    countIf(rage_click_count > 0) AS frustrated_interactions,
    countIf(error_count > 0) AS error_encounters,
    
    -- Engagement depth
    avg(duration_seconds) AS avg_duration,
    avg(depth_of_engagement) AS avg_engagement,
    
    -- Channel effectiveness
    countIf(interaction_outcome = 'positive' OR interaction_outcome = 'converted') AS successful_interactions,
    countIf(length(next_action) > 0) AS actions_generated,
    
    -- Technical metrics
    groupUniqArray(device_type) AS device_types,
    avg(connection_speed) AS avg_connection_speed
FROM 
(
    SELECT 
        *,
        toStartOfHour(time) as ts
    FROM leads.raw_interaction_events_v1
)
GROUP BY
    workspace_id,
    ts,
    channel,
    sub_channel,
    interaction_type
ORDER BY ts;

-- +goose down
DROP VIEW IF EXISTS leads.channel_performance_mv_v1;
DROP TABLE IF EXISTS leads.channel_performance_per_hour_v1;