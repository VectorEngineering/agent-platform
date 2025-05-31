import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const ExecutionLogCreateManyInputSchema: z.ZodType<Prisma.ExecutionLogCreateManyInput> = z
    .object({
        id: z.string().cuid().optional(),
        logLevel: z.string(),
        message: z.string(),
        timestamp: z.coerce.date().optional(),
        executionPhaseId: z.string()
    })
    .strict()

export default ExecutionLogCreateManyInputSchema
