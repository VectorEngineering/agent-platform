import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseUncheckedCreateNestedManyWithoutExecutionInputSchema } from './ExecutionPhaseUncheckedCreateNestedManyWithoutExecutionInputSchema'

export const WorkflowExecutionUncheckedCreateInputSchema: z.ZodType<Prisma.WorkflowExecutionUncheckedCreateInput> = z
    .object({
        id: z.string().cuid().optional(),
        workflowId: z.string(),
        userId: z.string(),
        trigger: z.string(),
        status: z.string(),
        createdAt: z.coerce.date().optional(),
        startedAt: z.coerce.date().optional().nullable(),
        completedAt: z.coerce.date().optional().nullable(),
        definition: z.string().optional(),
        creditsConsumed: z.number().int().optional(),
        phases: z.lazy(() => ExecutionPhaseUncheckedCreateNestedManyWithoutExecutionInputSchema).optional()
    })
    .strict()

export default WorkflowExecutionUncheckedCreateInputSchema
