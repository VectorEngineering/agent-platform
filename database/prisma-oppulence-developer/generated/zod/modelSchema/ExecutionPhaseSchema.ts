import { z } from 'zod'

/////////////////////////////////////////
// EXECUTION PHASE SCHEMA
/////////////////////////////////////////

export const ExecutionPhaseSchema = z.object({
    id: z.string().cuid(),
    userId: z.string(),
    status: z.string(),
    number: z.number().int(),
    node: z.string(),
    name: z.string(),
    startedAt: z.coerce.date().nullish(),
    completedAt: z.coerce.date().nullish(),
    inputs: z.string().nullish(),
    outputs: z.string().nullish(),
    creditsConsumed: z.number().int().nullish(),
    workflowExecutionId: z.string()
})

export type ExecutionPhase = z.infer<typeof ExecutionPhaseSchema>

/////////////////////////////////////////
// EXECUTION PHASE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ExecutionPhaseOptionalDefaultsSchema = ExecutionPhaseSchema.merge(
    z.object({
        id: z.string().cuid().optional()
    })
)

export type ExecutionPhaseOptionalDefaults = z.infer<typeof ExecutionPhaseOptionalDefaultsSchema>

export default ExecutionPhaseSchema
