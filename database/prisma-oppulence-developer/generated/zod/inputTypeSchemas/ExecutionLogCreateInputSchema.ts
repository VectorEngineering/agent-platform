import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseCreateNestedOneWithoutLogsInputSchema } from './ExecutionPhaseCreateNestedOneWithoutLogsInputSchema'

export const ExecutionLogCreateInputSchema: z.ZodType<Prisma.ExecutionLogCreateInput> = z
    .object({
        id: z.string().cuid().optional(),
        logLevel: z.string(),
        message: z.string(),
        timestamp: z.coerce.date().optional(),
        executionPhase: z.lazy(() => ExecutionPhaseCreateNestedOneWithoutLogsInputSchema)
    })
    .strict()

export default ExecutionLogCreateInputSchema
