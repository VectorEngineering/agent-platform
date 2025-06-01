-- +goose up
CREATE TABLE leads.revenue_intelligence_summary_v1 (
    workspace_id String,
    time DateTime,
    
    -- Pipeline metrics
    total_pipeline Float64,
    weighted_pipeline Float64,
    deal_count UInt64,
    
    -- Stage analysis
    current_stage String,
    stage_conversion_rate Float64,
    high_confidence_pipeline Float64,
    
    -- Time-based metrics
    avg_sales_cycle_days Float64,
    
    -- Deal characteristics
    avg_complexity Float64,
    avg_implementation_time Float64,
    
    -- Segmentation
    industry String,
    company_size_range String,
    deal_tier String,
    
    -- Leading indicators
    avg_lead_quality Float64,
    champion_backed_deals UInt64
)
ENGINE = ReplacingMergeTree(time)
ORDER BY (workspace_id, time, current_stage, industry, company_size_range, deal_tier);


-- Create the Revenue Intelligence Materialized View
CREATE MATERIALIZED VIEW leads.revenue_intelligence_mv_v1 
TO leads.revenue_intelligence_summary_v1 
AS 
SELECT
    workspace_id,
    ts as time,
    
    -- Pipeline metrics
    sum(deal_size) as total_pipeline,
    sum(deal_size * (probability / 100)) as weighted_pipeline,
    count() as deal_count,
    
    -- Stage analysis
    current_stage,
    avg(probability) as stage_conversion_rate,
    sum(if(probability >= 70, deal_size, 0)) as high_confidence_pipeline,
    
    -- Time-based metrics
    avg(toUnixTimestamp(expected_close_date) - toUnixTimestamp(first_contact_time)) / 86400 as avg_sales_cycle_days,
    
    -- Deal characteristics
    avg(deal_complexity_score) as avg_complexity,
    avg(implementation_time_days) as avg_implementation_time,
    
    -- Segmentation
    industry,
    company_size_range,
    deal_tier,
    
    -- Leading indicators
    sum(final_score) / count() as avg_lead_quality,
    countIf(length(champions) > length(detractors)) as champion_backed_deals
FROM 
(
    SELECT 
        *,
        toStartOfDay(time) as ts,
        case
            when deal_size < 10000 then 'small'
            when deal_size < 50000 then 'medium'
            when deal_size < 100000 then 'large'
            else 'enterprise'
        end as deal_tier
    FROM leads.raw_lead_events_v1
)
GROUP BY
    workspace_id,
    ts,
    current_stage,
    industry,
    company_size_range,
    deal_tier
ORDER BY ts;

-- +goose down
DROP VIEW IF EXISTS leads.revenue_intelligence_mv_v1;
DROP TABLE IF EXISTS leads.revenue_intelligence_summary_v1;