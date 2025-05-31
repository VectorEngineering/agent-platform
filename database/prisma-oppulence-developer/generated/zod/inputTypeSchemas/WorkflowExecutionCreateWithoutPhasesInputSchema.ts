import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowCreateNestedOneWithoutExecutionsInputSchema } from './WorkflowCreateNestedOneWithoutExecutionsInputSchema'

export const WorkflowExecutionCreateWithoutPhasesInputSchema: z.ZodType<Prisma.WorkflowExecutionCreateWithoutPhasesInput> = z
    .object({
        id: z.string().cuid().optional(),
        userId: z.string(),
        trigger: z.string(),
        status: z.string(),
        createdAt: z.coerce.date().optional(),
        startedAt: z.coerce.date().optional().nullable(),
        completedAt: z.coerce.date().optional().nullable(),
        definition: z.string().optional(),
        creditsConsumed: z.number().int().optional(),
        workflow: z.lazy(() => WorkflowCreateNestedOneWithoutExecutionsInputSchema)
    })
    .strict()

export default WorkflowExecutionCreateWithoutPhasesInputSchema
