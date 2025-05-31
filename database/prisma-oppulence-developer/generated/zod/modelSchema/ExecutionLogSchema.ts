import { z } from 'zod'

/////////////////////////////////////////
// EXECUTION LOG SCHEMA
/////////////////////////////////////////

export const ExecutionLogSchema = z.object({
    id: z.string().cuid(),
    logLevel: z.string(),
    message: z.string(),
    timestamp: z.coerce.date(),
    executionPhaseId: z.string()
})

export type ExecutionLog = z.infer<typeof ExecutionLogSchema>

/////////////////////////////////////////
// EXECUTION LOG OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ExecutionLogOptionalDefaultsSchema = ExecutionLogSchema.merge(
    z.object({
        id: z.string().cuid().optional(),
        timestamp: z.coerce.date().optional()
    })
)

export type ExecutionLogOptionalDefaults = z.infer<typeof ExecutionLogOptionalDefaultsSchema>

export default ExecutionLogSchema
