import { z } from 'zod'

export const WorkflowScalarFieldEnumSchema = z.enum([
    'id',
    'userId',
    'name',
    'description',
    'definition',
    'executionPlan',
    'creditsCost',
    'cron',
    'status',
    'lastRunAt',
    'lastRunId',
    'lastRunStatus',
    'nextRunAt',
    'createdAt',
    'updateAt'
])

export default WorkflowScalarFieldEnumSchema
