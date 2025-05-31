import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogCreateNestedManyWithoutExecutionPhaseInputSchema } from './ExecutionLogCreateNestedManyWithoutExecutionPhaseInputSchema'

export const ExecutionPhaseCreateWithoutExecutionInputSchema: z.ZodType<Prisma.ExecutionPhaseCreateWithoutExecutionInput> = z
    .object({
        id: z.string().cuid().optional(),
        userId: z.string(),
        status: z.string(),
        number: z.number().int(),
        node: z.string(),
        name: z.string(),
        startedAt: z.coerce.date().optional().nullable(),
        completedAt: z.coerce.date().optional().nullable(),
        inputs: z.string().optional().nullable(),
        outputs: z.string().optional().nullable(),
        creditsConsumed: z.number().int().optional().nullable(),
        logs: z.lazy(() => ExecutionLogCreateNestedManyWithoutExecutionPhaseInputSchema).optional()
    })
    .strict()

export default ExecutionPhaseCreateWithoutExecutionInputSchema
