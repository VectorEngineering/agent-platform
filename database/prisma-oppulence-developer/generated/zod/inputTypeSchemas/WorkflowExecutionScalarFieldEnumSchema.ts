import { z } from 'zod'

export const WorkflowExecutionScalarFieldEnumSchema = z.enum([
    'id',
    'workflowId',
    'userId',
    'trigger',
    'status',
    'createdAt',
    'startedAt',
    'completedAt',
    'definition',
    'creditsConsumed'
])

export default WorkflowExecutionScalarFieldEnumSchema
