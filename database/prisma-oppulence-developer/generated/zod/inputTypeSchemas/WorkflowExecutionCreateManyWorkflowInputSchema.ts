import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const WorkflowExecutionCreateManyWorkflowInputSchema: z.ZodType<Prisma.WorkflowExecutionCreateManyWorkflowInput> = z
    .object({
        id: z.string().cuid().optional(),
        userId: z.string(),
        trigger: z.string(),
        status: z.string(),
        createdAt: z.coerce.date().optional(),
        startedAt: z.coerce.date().optional().nullable(),
        completedAt: z.coerce.date().optional().nullable(),
        definition: z.string().optional(),
        creditsConsumed: z.number().int().optional()
    })
    .strict()

export default WorkflowExecutionCreateManyWorkflowInputSchema
