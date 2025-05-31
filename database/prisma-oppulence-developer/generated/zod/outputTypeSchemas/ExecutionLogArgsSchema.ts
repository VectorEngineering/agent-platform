import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogSelectSchema } from '../inputTypeSchemas/ExecutionLogSelectSchema'
import { ExecutionLogIncludeSchema } from '../inputTypeSchemas/ExecutionLogIncludeSchema'

export const ExecutionLogArgsSchema: z.ZodType<Prisma.ExecutionLogDefaultArgs> = z
    .object({
        select: z.lazy(() => ExecutionLogSelectSchema).optional(),
        include: z.lazy(() => ExecutionLogIncludeSchema).optional()
    })
    .strict()

export default ExecutionLogArgsSchema
