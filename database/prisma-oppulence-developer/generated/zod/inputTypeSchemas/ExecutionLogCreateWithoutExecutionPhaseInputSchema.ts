import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const ExecutionLogCreateWithoutExecutionPhaseInputSchema: z.ZodType<Prisma.ExecutionLogCreateWithoutExecutionPhaseInput> = z
    .object({
        id: z.string().cuid().optional(),
        logLevel: z.string(),
        message: z.string(),
        timestamp: z.coerce.date().optional()
    })
    .strict()

export default ExecutionLogCreateWithoutExecutionPhaseInputSchema
