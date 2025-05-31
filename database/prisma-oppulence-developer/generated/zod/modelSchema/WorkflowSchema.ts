import { z } from 'zod'

/////////////////////////////////////////
// WORKFLOW SCHEMA
/////////////////////////////////////////

export const WorkflowSchema = z.object({
    id: z.string().cuid(),
    userId: z.string(),
    name: z.string(),
    description: z.string().nullish(),
    definition: z.string(),
    executionPlan: z.string().nullish(),
    creditsCost: z.number().int(),
    cron: z.string().nullish(),
    status: z.string(),
    lastRunAt: z.coerce.date().nullish(),
    lastRunId: z.string().nullish(),
    lastRunStatus: z.string().nullish(),
    nextRunAt: z.coerce.date().nullish(),
    createdAt: z.coerce.date(),
    updateAt: z.coerce.date()
})

export type Workflow = z.infer<typeof WorkflowSchema>

/////////////////////////////////////////
// WORKFLOW OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WorkflowOptionalDefaultsSchema = WorkflowSchema.merge(
    z.object({
        id: z.string().cuid().optional(),
        creditsCost: z.number().int().optional(),
        createdAt: z.coerce.date().optional(),
        updateAt: z.coerce.date().optional()
    })
)

export type WorkflowOptionalDefaults = z.infer<typeof WorkflowOptionalDefaultsSchema>

export default WorkflowSchema
