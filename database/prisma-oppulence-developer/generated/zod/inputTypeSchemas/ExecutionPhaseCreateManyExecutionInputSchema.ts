import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const ExecutionPhaseCreateManyExecutionInputSchema: z.ZodType<Prisma.ExecutionPhaseCreateManyExecutionInput> = z
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
        creditsConsumed: z.number().int().optional().nullable()
    })
    .strict()

export default ExecutionPhaseCreateManyExecutionInputSchema
