import { expect, test } from 'vitest'
import { ClickHouse } from './index'
import { leadStage, leadStatus } from './leads'
import { ClickHouseContainer } from './testutil'

test(
    'getLatestLead retrieves most recent lead data',
    {
        timeout: 300_000
    },
    async (t) => {
        const container = await ClickHouseContainer.start(t)
        const ch = new ClickHouse({ url: container.url() })
        const baseTime = Date.now()

        // Insert multiple events for the same lead
        const events = [
            {
                lead_id: 'lead_123',
                workspace_id: 'workspace_123',
                event_id: 'event_1',
                time: baseTime.toString(),
                event_type: 'creation',
                company: 'Tech Corp',
                industry: 'Technology',
                email: 'contact@techcorp.com',
                current_stage: leadStage.enum.NEW,
                current_status: leadStatus.enum.ACTIVE,
                final_score: 50,
                deal_size: 10000,
                probability: 30,
                tags: ['new']
            },
            {
                lead_id: 'lead_123',
                workspace_id: 'workspace_123',
                event_id: 'event_2',
                time: (baseTime + 1000).toString(),
                event_type: 'update',
                company: 'Tech Corp Updated',
                industry: 'Technology',
                email: 'contact@techcorp.com',
                current_stage: leadStage.enum.QUALIFIED,
                current_status: leadStatus.enum.ACTIVE,
                final_score: 75,
                deal_size: 15000,
                probability: 50,
                tags: ['qualified']
            }
        ]

        // Insert events
        for (const event of events) {
            const { err } = await ch.leads.insert(event)
            expect(err).toBeUndefined()
        }

        // Test retrieval
        const result = await ch.leads.latest({
            workspaceId: 'workspace_123',
            leadId: 'lead_123'
        })

        // Verify latest state
        expect(result.err).toBeUndefined()
        expect(result.val).toBeDefined()
        expect(result.val![0]).toMatchObject({
            lead_id: 'lead_123',
            company: 'Tech Corp Updated',
            current_stage: leadStage.enum.QUALIFIED,
            final_score: 75,
            deal_size: 15000,
            probability: 50
        })
    }
)

test(
    'getLatestLead filters out test/demo leads',
    {
        timeout: 300_000
    },
    async (t) => {
        const container = await ClickHouseContainer.start(t)
        const ch = new ClickHouse({ url: container.url() })

        const testLead = {
            lead_id: 'test_lead',
            workspace_id: 'workspace_123',
            event_id: 'event_test',
            time: Date.now().toString(),
            event_type: 'creation',
            company: 'Test Company',
            industry: 'Technology',
            email: 'test@test.com',
            current_stage: leadStage.enum.NEW,
            current_status: leadStatus.enum.ACTIVE,
            final_score: 50,
            deal_size: 10000,
            probability: 30,
            tags: ['test']
        }

        const { err } = await ch.leads.insert(testLead)
        expect(err).toBeUndefined()

        const result = await ch.leads.latest({
            workspaceId: testLead.workspace_id,
            leadId: testLead.lead_id
        })

        // Should not return test lead
        expect(result.val).toHaveLength(0)
    }
)

test(
    'getLatestLead handles missing leads gracefully',
    {
        timeout: 300_000
    },
    async (t) => {
        const container = await ClickHouseContainer.start(t)
        const ch = new ClickHouse({ url: container.url() })

        const result = await ch.leads.latest({
            workspaceId: 'nonexistent',
            leadId: 'nonexistent'
        })

        expect(result.err).toBeUndefined()
        expect(result.val).toHaveLength(0)
    }
)

test(
    'getLatestLead filters out archived/deleted/duplicate leads',
    {
        timeout: 300_000
    },
    async (t) => {
        const container = await ClickHouseContainer.start(t)
        const ch = new ClickHouse({ url: container.url() })
        const now = Date.now()

        const archivedLead = {
            lead_id: 'archived_lead',
            workspace_id: 'workspace_123',
            event_id: 'event_archived',
            time: now.toString(),
            event_type: 'archive',
            company: 'Archived Corp',
            industry: 'Technology',
            email: 'archived@example.com',
            current_stage: leadStage.enum.NEW,
            current_status: leadStatus.enum.ARCHIVED,
            final_score: 50,
            deal_size: 10000,
            probability: 30,
            tags: ['archived']
        }

        const { err } = await ch.leads.insert(archivedLead)
        expect(err).toBeUndefined()

        const result = await ch.leads.latest({
            workspaceId: archivedLead.workspace_id,
            leadId: archivedLead.lead_id
        })

        // Should not return archived lead
        expect(result.val).toHaveLength(0)
    }
)
