import { expect, test } from 'vitest'
import { ClickHouse } from './index'
import { ClickHouseContainer } from './testutil'
import { LeadInteractionEvent } from './types'

test(
    'handles lead interaction tracking and aggregation',
    {
        timeout: 300_000
    },
    async (t) => {
        const container = await ClickHouseContainer.start(t)
        const ch = new ClickHouse({ url: container.url() })
        const baseTime = Date.now()

        // Create test interactions
        const interactions = [
            {
                workspace_id: 'ws_123',
                event_id: '123e4567-e89b-12d3-a456-426614174000',
                lead_id: 'lead_1',
                time: baseTime.toString(),
                event_source: 'test',
                event_version: '1.0',
                interaction_type: 'open',
                interaction_subtype: 'email_open',
                channel: 'email',
                sub_channel: 'marketing',
                duration_seconds: 0,
                duration_milliseconds: 0,
                depth_of_engagement: 50,
                quality_score: 80,
                completion_rate: 1,
                bounce: false,
                exit_intent: false,
                rage_click_count: 0,
                dead_click_count: 0,
                error_count: 0,
                intent_signals: [] as string[],
                is_deleted: 0
            },
            {
                workspace_id: 'ws_123',
                event_id: '123e4567-e89b-12d3-a456-426614174001',
                lead_id: 'lead_1',
                time: (baseTime + 3600000).toString(),
                event_source: 'test',
                event_version: '1.0',
                interaction_type: 'visit',
                interaction_subtype: 'web_visit',
                channel: 'web',
                sub_channel: 'direct',
                duration_seconds: 0,
                duration_milliseconds: 0,
                depth_of_engagement: 75,
                quality_score: 85,
                completion_rate: 1,
                bounce: false,
                exit_intent: false,
                rage_click_count: 0,
                dead_click_count: 0,
                error_count: 0,
                intent_signals: [] as string[],
                is_deleted: 0
            },
            {
                workspace_id: 'ws_123',
                event_id: '123e4567-e89b-12d3-a456-426614174002',
                lead_id: 'lead_2',
                time: (baseTime + 7200000).toString(),
                event_source: 'test',
                event_version: '1.0',
                interaction_type: 'message',
                interaction_subtype: 'chat_message',
                channel: 'chat',
                sub_channel: 'support',
                duration_seconds: 0,
                duration_milliseconds: 0,
                depth_of_engagement: 90,
                quality_score: 90,
                completion_rate: 1,
                bounce: false,
                exit_intent: false,
                rage_click_count: 0,
                dead_click_count: 0,
                error_count: 0,
                intent_signals: [] as string[],
                is_deleted: 0
            }
        ]

        // Insert interactions
        for (const interaction of interactions) {
            const { err } = await ch.leadInteractions.insert(interaction)
            console.log(err)
            expect(err).toBeUndefined()
        }

        // Test hourly aggregation
        const hourlyResult = await ch.leadInteractions.perHour({
            workspaceId: 'ws_123',
            start: baseTime - 1000,
            end: baseTime + 7200000
        })

        expect(hourlyResult.err).toBeUndefined()
        expect(hourlyResult.val).toHaveLength(2) // 2 hours with data

        // Test channel filtering
        const emailResult = await ch.leadInteractions.perHour({
            workspaceId: 'ws_123',
            start: baseTime - 1000,
            end: baseTime + 7200000,
            channel: 'email'
        })

        expect(emailResult.err).toBeUndefined()
    }
)
