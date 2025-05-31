import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogCreateManyInputSchema } from '../inputTypeSchemas/ExecutionLogCreateManyInputSchema'

export const ExecutionLogCreateManyArgsSchema: z.ZodType<Prisma.ExecutionLogCreateManyArgs> = z
    .object({
        data: z.union([ExecutionLogCreateManyInputSchema, ExecutionLogCreateManyInputSchema.array()]),
        skipDuplicates: z.boolean().optional()
    })
    .strict()

export default ExecutionLogCreateManyArgsSchema
