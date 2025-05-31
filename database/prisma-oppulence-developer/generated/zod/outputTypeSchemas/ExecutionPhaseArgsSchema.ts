import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseSelectSchema } from '../inputTypeSchemas/ExecutionPhaseSelectSchema'
import { ExecutionPhaseIncludeSchema } from '../inputTypeSchemas/ExecutionPhaseIncludeSchema'

export const ExecutionPhaseArgsSchema: z.ZodType<Prisma.ExecutionPhaseDefaultArgs> = z
    .object({
        select: z.lazy(() => ExecutionPhaseSelectSchema).optional(),
        include: z.lazy(() => ExecutionPhaseIncludeSchema).optional()
    })
    .strict()

export default ExecutionPhaseArgsSchema
