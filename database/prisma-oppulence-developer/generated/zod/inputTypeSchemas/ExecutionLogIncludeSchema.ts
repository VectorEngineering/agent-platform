import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseArgsSchema } from '../outputTypeSchemas/ExecutionPhaseArgsSchema'

export const ExecutionLogIncludeSchema: z.ZodType<Prisma.ExecutionLogInclude> = z
    .object({
        executionPhase: z.union([z.boolean(), z.lazy(() => ExecutionPhaseArgsSchema)]).optional()
    })
    .strict()

export default ExecutionLogIncludeSchema
