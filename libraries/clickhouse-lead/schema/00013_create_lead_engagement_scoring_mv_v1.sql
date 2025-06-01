-- +goose up
-- First create the target table
CREATE TABLE leads.lead_engagement_scoring_v1 (
    workspace_id String,
    lead_id String,
    time DateTime,
    
    -- Engagement metrics
    interaction_count UInt64,
    engagement_score Float64,
    quality_score Float64,
    
    -- Content engagement
    content_interactions UInt64,
    content_consumption_rate Float64,
    content_interests Array(String),
    
    -- Response patterns
    avg_response_time Float64,
    availability_score Float64,
    
    -- Intent strength
    unique_intent_signals UInt64,
    sentiment_trend Float64,
    urgency_indicators UInt64,
    
    -- Conversion readiness
    positive_interaction_rate Float64,
    identified_needs Array(String),
    objection_count UInt64,
    
    -- Digital body language
    frustration_signals UInt64,
    exit_intents UInt64,
    task_completion_rate Float64
) ENGINE = ReplacingMergeTree(time)
ORDER BY (workspace_id, lead_id, time);

-- Then create the materialized view
CREATE MATERIALIZED VIEW leads.lead_engagement_scoring_mv_v1
TO leads.lead_engagement_scoring_v1
AS SELECT
    workspace_id,
    lead_id,
    toStartOfHour(time) AS time,
    
    -- Engagement metrics
    count() AS interaction_count,
    sum(depth_of_engagement) / count() AS engagement_score,
    sum(quality_score) / count() AS quality_score,
    
    -- Content engagement
    countIf(content_type != '') AS content_interactions,
    avg(read_percentage) AS content_consumption_rate,
    
    -- Ensure content_interests is a single-dimensional array
    arrayDistinct(arrayFlatten(groupArray(content_category))) AS content_interests,
    
    -- Response patterns
    avg(response_time_seconds) AS avg_response_time,
    countIf(business_hours) / count() AS availability_score,
    
    -- Intent strength
    length(groupUniqArray(intent_signals)) AS unique_intent_signals,
    avg(sentiment_score) AS sentiment_trend,
    countIf(length(urgency_signals) > 0) AS urgency_indicators,
    
    -- Conversion readiness
    countIf(interaction_outcome = 'positive') / count() AS positive_interaction_rate,
    
    -- Ensure identified_needs is a single-dimensional array
    arrayDistinct(arrayFlatten(groupArray(pain_points))) AS identified_needs,
    
    -- Handle objection_count based on the type of objections
    length(arrayDistinct(arrayFlatten(groupArray(objections)))) AS objection_count,
    
    -- Digital body language
    countIf(rage_click_count > 0) AS frustration_signals,
    countIf(exit_intent) AS exit_intents,
    avg(completion_rate) AS task_completion_rate
FROM leads.raw_interaction_events_v1
GROUP BY
    workspace_id,
    lead_id,
    time;

-- +goose down
DROP VIEW IF EXISTS leads.lead_engagement_scoring_mv_v1;
DROP TABLE IF EXISTS leads.lead_engagement_scoring_v1;
