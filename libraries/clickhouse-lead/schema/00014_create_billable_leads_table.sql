-- +goose up
CREATE TABLE billing.billable_leads_per_month_v1
(
  year          Int,
  month         Int,
  workspace_id  String,
  count         Int64,
  qualified_leads Int64,
  opportunity_leads Int64,
  converted_leads Int64
)
ENGINE = SummingMergeTree()
ORDER BY (workspace_id, year, month)
;

CREATE MATERIALIZED VIEW billing.billable_leads_per_month_mv_v1
TO billing.billable_leads_per_month_v1
AS SELECT
    workspace_id,
    toYear(time) AS year,
    toMonth(time) AS month,
    count(DISTINCT lead_id) as count,
    count(DISTINCT CASE WHEN final_score >= 70 THEN lead_id END) as qualified_leads,
    count(DISTINCT CASE WHEN deal_size > 0 THEN lead_id END) as opportunity_leads,
    count(DISTINCT CASE WHEN current_stage IN ('closed_won', 'customer') THEN lead_id END) as converted_leads
FROM leads.raw_lead_events_v1
WHERE current_status NOT IN ('archived', 'deleted', 'duplicate')
    AND NOT (company ILIKE '%test%' OR company ILIKE '%demo%')
    AND email != ''
    AND company != ''
GROUP BY
    workspace_id,
    year,
    month
;

-- +goose down
DROP VIEW IF EXISTS billing.billable_leads_per_month_mv_v1;
DROP TABLE IF EXISTS billing.billable_leads_per_month_v1;
