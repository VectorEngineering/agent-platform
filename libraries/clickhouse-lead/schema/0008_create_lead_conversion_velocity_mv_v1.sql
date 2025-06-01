-- +goose Up
-- Step 1: Create the target table `leads.lead_conversion_velocity_per_day_v1`
CREATE TABLE IF NOT EXISTS leads.lead_conversion_velocity_per_day_v1 (
    workspace_id String,
    day DateTime,
    industry String,
    current_stage String,
    
    -- Volume metrics
    total_leads UInt64,
    high_quality_leads UInt64,
    
    -- Scoring averages
    avg_lead_score Float64,
    avg_fit_score Float64,
    avg_interest_score Float64,
    
    -- Conversion metrics
    avg_days_to_qualify Float64,
    avg_days_to_convert Float64,
    
    -- Engagement depth
    avg_website_engagement Float64,
    avg_content_engagement Float64,
    avg_email_engagement Float64,
    
    -- Product interest
    top_product_interests Array(String),
    
    -- Value metrics
    pipeline_value Float64
) ENGINE = ReplacingMergeTree(day)
ORDER BY (workspace_id, day, industry, current_stage);

-- Step 2: Create the materialized view `leads.lead_conversion_velocity_mv_v1`
CREATE MATERIALIZED VIEW IF NOT EXISTS leads.lead_conversion_velocity_mv_v1
TO leads.lead_conversion_velocity_per_day_v1
AS SELECT
    workspace_id,
    toStartOfDay(time) AS day,
    industry,
    current_stage,
    
    -- Volume metrics
    count() AS total_leads,
    countIf(final_score >= 80) AS high_quality_leads,
    
    -- Scoring averages
    avg(final_score) AS avg_lead_score,
    avg(fit_score) AS avg_fit_score,
    avg(interest_score) AS avg_interest_score,
    
    -- Conversion metrics
    avg((qualification_time - first_contact_time)) / 86400 AS avg_days_to_qualify, -- Assuming time is in seconds
    avg((conversion_time - first_contact_time)) / 86400 AS avg_days_to_convert,     -- Adjusted divisor to convert seconds to days
    
    -- Engagement depth
    avg(website_engagement_score) AS avg_website_engagement,
    avg(content_engagement_score) AS avg_content_engagement,
    avg(email_engagement_score) AS avg_email_engagement,
    
    -- Product interest
    arrayDistinct(arrayFlatten(groupArray(product_interest))) AS top_product_interests, -- Ensures single-dimensional Array(String)
    
    -- Value metrics
    sum(deal_size * (probability / 100)) AS pipeline_value
FROM leads.raw_lead_events_v1
GROUP BY
    workspace_id,
    day,               -- Changed from `time` to `day` to match SELECT alias
    industry,
    current_stage
ORDER BY day;

-- +goose Down
DROP VIEW IF EXISTS leads.lead_conversion_velocity_mv_v1;
DROP TABLE IF EXISTS leads.lead_conversion_velocity_per_day_v1;
