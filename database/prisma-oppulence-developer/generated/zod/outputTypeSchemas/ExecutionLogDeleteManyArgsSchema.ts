import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogWhereInputSchema } from '../inputTypeSchemas/ExecutionLogWhereInputSchema'

export const ExecutionLogDeleteManyArgsSchema: z.ZodType<Prisma.ExecutionLogDeleteManyArgs> = z
    .object({
        where: ExecutionLogWhereInputSchema.optional()
    })
    .strict()

export default ExecutionLogDeleteManyArgsSchema
