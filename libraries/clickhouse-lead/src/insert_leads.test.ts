import { expect, test } from 'vitest'
import { ClickHouse } from './index'
import { leadStage, leadStatus } from './leads'
import { ClickHouseContainer } from './testutil'

test(
    'handles basic CRUD operations',
    {
        timeout: 300_000
    },
    async (t) => {
        const container = await ClickHouseContainer.start(t)
        const ch = new ClickHouse({ url: container.url() })
        const now = Date.now()

        // Create - Basic lead
        const basicLead = {
            lead_id: 'basic_lead',
            workspace_id: 'workspace_123',
            event_id: 'event_1',
            time: now.toString(),
            event_type: 'creation',
            company: 'Basic Corp',
            industry: 'Technology',
            email: 'basic@example.com',
            current_stage: leadStage.enum.NEW,
            current_status: leadStatus.enum.ACTIVE,
            final_score: 50,
            deal_size: 10000,
            probability: 30,
            tags: ['new']
        }

        const { err: createErr } = await ch.leads.insert(basicLead)
        expect(createErr).toBeUndefined()

        // Read
        const result = await ch.leads.latest({
            workspaceId: basicLead.workspace_id,
            leadId: basicLead.lead_id
        })
        expect(result.err).toBeUndefined()
        expect(result.val![0].company).toBe('Basic Corp')

        // Update
        const updatedLead = {
            ...basicLead,
            event_id: 'event_2',
            time: (now + 1000).toString(),
            company: 'Basic Corp Updated',
            current_stage: leadStage.enum.QUALIFIED
        }
        const { err: updateErr } = await ch.leads.insert(updatedLead)
        expect(updateErr).toBeUndefined()

        // Verify update
        const afterUpdate = await ch.leads.latest({
            workspaceId: basicLead.workspace_id,
            leadId: basicLead.lead_id
        })
        expect(afterUpdate.val![0].company).toBe('Basic Corp Updated')
    }
)

test(
    'handles complex lead data',
    {
        timeout: 300_000
    },
    async (t) => {
        const container = await ClickHouseContainer.start(t)
        const ch = new ClickHouse({ url: container.url() })
        const now = Date.now()

        const complexLead = {
            lead_id: 'complex_lead',
            workspace_id: 'workspace_123',
            event_id: 'event_complex',
            time: now.toString(),
            event_type: 'creation',

            // Company details
            company: 'Enterprise Solutions Ltd',
            industry: 'Technology',
            sub_industry: 'Enterprise Software',
            employee_count: 1000,
            company_type: 'Private',
            company_size_range: '1000-5000',
            revenue_range: '100M-500M',

            // Contact info
            email: 'contact@enterprise.com',
            contact_name: 'Jane Smith',
            contact_title: 'CTO',

            // Scores and metrics
            current_stage: leadStage.enum.OPPORTUNITY,
            current_status: leadStatus.enum.ACTIVE,
            final_score: 90,
            deal_size: 500000,
            probability: 75,
            fit_score: 85,
            interest_score: 90,

            // Arrays
            tags: ['enterprise', 'high-value', 'tech'],
            technologies_used: ['AWS', 'Kubernetes', 'React'],
            competitors: ['Competitor A', 'Competitor B'],

            // Additional fields
            deal_currency: 'USD',
            company_description: 'Leading enterprise solutions provider',
            total_funding: 50000000,
            product_usage_score: 85
        }

        const { err: insertErr } = await ch.leads.insert(complexLead)
        expect(insertErr).toBeUndefined()

        const result = await ch.leads.latest({
            workspaceId: complexLead.workspace_id,
            leadId: complexLead.lead_id
        })

        expect(result.err).toBeUndefined()
        expect(result.val![0].company).toBe(complexLead.company)
        expect(result.val![0].industry).toBe(complexLead.industry)
        expect(result.val![0].final_score).toBe(complexLead.final_score)
        expect(result.val![0].deal_size).toBe(complexLead.deal_size)
        expect(result.val![0].tags).toEqual(expect.arrayContaining(complexLead.tags))
    }
)

test(
    'handles lead stage transitions',
    {
        timeout: 300_000
    },
    async (t) => {
        const container = await ClickHouseContainer.start(t)
        const ch = new ClickHouse({ url: container.url() })
        const baseTime = Date.now()

        const stages = [
            { stage: leadStage.enum.NEW, time: baseTime },
            { stage: leadStage.enum.QUALIFIED, time: baseTime + 1000 },
            { stage: leadStage.enum.OPPORTUNITY, time: baseTime + 2000 },
            { stage: leadStage.enum.NEGOTIATION, time: baseTime + 3000 },
            { stage: leadStage.enum.CLOSED_WON, time: baseTime + 4000 }
        ]

        const baseLead = {
            lead_id: 'stage_transition_lead',
            workspace_id: 'workspace_123',
            company: 'Stage Corp',
            industry: 'Manufacturing',
            email: 'stages@example.com',
            current_status: leadStatus.enum.ACTIVE,
            final_score: 75,
            deal_size: 100000,
            probability: 50,
            tags: ['testing']
        }

        for (const [index, { stage, time }] of stages.entries()) {
            const leadUpdate = {
                ...baseLead,
                event_id: `event_${index + 1}`,
                time: time.toString(),
                event_type: 'stage_update',
                current_stage: stage,
                probability: 50 + index * 10 // Increasing probability with each stage
            }

            const { err } = await ch.leads.insert(leadUpdate)
            expect(err).toBeUndefined()
        }

        const finalState = await ch.leads.latest({
            workspaceId: baseLead.workspace_id,
            leadId: baseLead.lead_id
        })

        expect(finalState.err).toBeUndefined()
        expect(finalState.val![0].current_stage).toBe(leadStage.enum.CLOSED_WON)
        expect(finalState.val![0].probability).toBe(90)
    }
)
