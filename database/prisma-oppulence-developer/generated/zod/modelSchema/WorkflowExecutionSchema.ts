import { z } from 'zod'

/////////////////////////////////////////
// WORKFLOW EXECUTION SCHEMA
/////////////////////////////////////////

export const WorkflowExecutionSchema = z.object({
    id: z.string().cuid(),
    workflowId: z.string(),
    userId: z.string(),
    trigger: z.string(),
    status: z.string(),
    createdAt: z.coerce.date(),
    startedAt: z.coerce.date().nullish(),
    completedAt: z.coerce.date().nullish(),
    definition: z.string(),
    creditsConsumed: z.number().int()
})

export type WorkflowExecution = z.infer<typeof WorkflowExecutionSchema>

/////////////////////////////////////////
// WORKFLOW EXECUTION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WorkflowExecutionOptionalDefaultsSchema = WorkflowExecutionSchema.merge(
    z.object({
        id: z.string().cuid().optional(),
        createdAt: z.coerce.date().optional(),
        definition: z.string().optional(),
        creditsConsumed: z.number().int().optional()
    })
)

export type WorkflowExecutionOptionalDefaults = z.infer<typeof WorkflowExecutionOptionalDefaultsSchema>

export default WorkflowExecutionSchema
