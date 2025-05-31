import { z } from 'zod'

export const WorkflowOrderByRelevanceFieldEnumSchema = z.enum([
    'id',
    'userId',
    'name',
    'description',
    'definition',
    'executionPlan',
    'cron',
    'status',
    'lastRunId',
    'lastRunStatus'
])

export default WorkflowOrderByRelevanceFieldEnumSchema
