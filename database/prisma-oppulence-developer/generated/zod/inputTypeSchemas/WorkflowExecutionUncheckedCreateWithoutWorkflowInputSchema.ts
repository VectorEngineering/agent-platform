import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseUncheckedCreateNestedManyWithoutExecutionInputSchema } from './ExecutionPhaseUncheckedCreateNestedManyWithoutExecutionInputSchema'

export const WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema: z.ZodType<Prisma.WorkflowExecutionUncheckedCreateWithoutWorkflowInput> =
    z
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
            phases: z.lazy(() => ExecutionPhaseUncheckedCreateNestedManyWithoutExecutionInputSchema).optional()
        })
        .strict()

export default WorkflowExecutionUncheckedCreateWithoutWorkflowInputSchema
