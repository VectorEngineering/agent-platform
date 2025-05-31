import { z } from 'zod'

export const ExecutionPhaseScalarFieldEnumSchema = z.enum([
    'id',
    'userId',
    'status',
    'number',
    'node',
    'name',
    'startedAt',
    'completedAt',
    'inputs',
    'outputs',
    'creditsConsumed',
    'workflowExecutionId'
])

export default ExecutionPhaseScalarFieldEnumSchema
