import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogWhereInputSchema } from '../inputTypeSchemas/ExecutionLogWhereInputSchema'
import { ExecutionLogOrderByWithRelationInputSchema } from '../inputTypeSchemas/ExecutionLogOrderByWithRelationInputSchema'
import { ExecutionLogWhereUniqueInputSchema } from '../inputTypeSchemas/ExecutionLogWhereUniqueInputSchema'

export const ExecutionLogAggregateArgsSchema: z.ZodType<Prisma.ExecutionLogAggregateArgs> = z
    .object({
        where: ExecutionLogWhereInputSchema.optional(),
        orderBy: z.union([ExecutionLogOrderByWithRelationInputSchema.array(), ExecutionLogOrderByWithRelationInputSchema]).optional(),
        cursor: ExecutionLogWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default ExecutionLogAggregateArgsSchema
