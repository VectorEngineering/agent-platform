-- +goose up

-- First create the target table
CREATE TABLE leads.account_intelligence_summary_v1 (
    workspace_id String,
    account_id String,
    company String,
    time DateTime,
    
    -- Company profile
    industry String,
    company_size String,
    revenue_range String,
    growth_rate Float64,
    
    -- Technology landscape
    tech_stack Array(String),
    tech_compatibility Float64,
    integration_complexity Float64,
    
    -- Deal characteristics
    active_leads UInt32,
    total_opportunity_value Float64,
    avg_win_probability Float64,
    
    -- Buying process
    key_decision_factors Array(String),
    success_metrics Array(String),
    
    -- Risk factors
    product_fit Float64,
    support_health Float64,
    risk_factors Array(String),
    
    -- Competitive position
    competitor_landscape Array(String),
    strategic_partners Array(String)
) ENGINE = ReplacingMergeTree(time)
ORDER BY (workspace_id, account_id, time);

-- Then create the materialized view
CREATE MATERIALIZED VIEW leads.account_intelligence_mv_v1 
TO leads.account_intelligence_summary_v1 
AS SELECT
    workspace_id,
    account_id,
    company,
    day_time as time,
    
    -- Company profile
    any(industry) as industry,
    any(company_size_range) as company_size,
    any(revenue_range) as revenue_range,
    any(growth_rate) as growth_rate,
    
    -- Technology landscape
    groupUniqArray(arrayJoin(technologies_used)) as tech_stack,
    any(compatibility_score) / 100.0 as tech_compatibility,
    any(integration_complexity_score) / 100.0 as integration_complexity,
    
    -- Deal characteristics
    count(DISTINCT lead_id) as active_leads,
    sum(deal_size) as total_opportunity_value,
    avg(probability) / 100.0 as avg_win_probability,
    
    -- Buying process
    groupUniqArray(arrayJoin(decision_criteria)) as key_decision_factors,
    groupUniqArray(arrayJoin(success_criteria)) as success_metrics,
    
    -- Risk factors
    any(product_usage_score) / 100.0 as product_fit,
    any(support_ticket_severity_trend) / 100.0 as support_health,
    groupUniqArray(arrayJoin(churn_risk_indicators)) as risk_factors,
    
    -- Competitive position
    groupUniqArray(arrayJoin(competitors)) as competitor_landscape,
    groupUniqArray(arrayJoin(partner_ecosystem)) as strategic_partners
FROM (
    SELECT 
        *,
        toStartOfDay(time) as day_time
    FROM leads.raw_lead_events_v1
)
GROUP BY
    workspace_id,
    account_id,
    company,
    day_time
ORDER BY day_time;

-- +goose down
DROP VIEW IF EXISTS leads.account_intelligence_mv_v1;
DROP TABLE IF EXISTS leads.account_intelligence_summary_v1;