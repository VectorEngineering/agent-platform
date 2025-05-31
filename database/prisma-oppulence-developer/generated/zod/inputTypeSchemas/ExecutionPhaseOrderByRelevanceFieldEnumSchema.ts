import { z } from 'zod'

export const ExecutionPhaseOrderByRelevanceFieldEnumSchema = z.enum([
    'id',
    'userId',
    'status',
    'node',
    'name',
    'inputs',
    'outputs',
    'workflowExecutionId'
])

export default ExecutionPhaseOrderByRelevanceFieldEnumSchema
