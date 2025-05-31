import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogUncheckedCreateNestedManyWithoutExecutionPhaseInputSchema } from './ExecutionLogUncheckedCreateNestedManyWithoutExecutionPhaseInputSchema'

export const ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema: z.ZodType<Prisma.ExecutionPhaseUncheckedCreateWithoutExecutionInput> =
    z
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
            logs: z.lazy(() => ExecutionLogUncheckedCreateNestedManyWithoutExecutionPhaseInputSchema).optional()
        })
        .strict()

export default ExecutionPhaseUncheckedCreateWithoutExecutionInputSchema
