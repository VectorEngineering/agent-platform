import type { Prisma } from '@prisma/client'

import { z } from 'zod'

export const ExecutionLogUncheckedCreateInputSchema: z.ZodType<Prisma.ExecutionLogUncheckedCreateInput> = z
    .object({
        id: z.string().cuid().optional(),
        logLevel: z.string(),
        message: z.string(),
        timestamp: z.coerce.date().optional(),
        executionPhaseId: z.string()
    })
    .strict()

export default ExecutionLogUncheckedCreateInputSchema
