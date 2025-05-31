import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseArgsSchema } from '../outputTypeSchemas/ExecutionPhaseArgsSchema'

export const ExecutionLogSelectSchema: z.ZodType<Prisma.ExecutionLogSelect> = z
    .object({
        id: z.boolean().optional(),
        logLevel: z.boolean().optional(),
        message: z.boolean().optional(),
        timestamp: z.boolean().optional(),
        executionPhaseId: z.boolean().optional(),
        executionPhase: z.union([z.boolean(), z.lazy(() => ExecutionPhaseArgsSchema)]).optional()
    })
    .strict()

export default ExecutionLogSelectSchema
