import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionLogWhereInputSchema } from '../inputTypeSchemas/ExecutionLogWhereInputSchema'
import { ExecutionLogOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ExecutionLogOrderByWithAggregationInputSchema'
import { ExecutionLogScalarFieldEnumSchema } from '../inputTypeSchemas/ExecutionLogScalarFieldEnumSchema'
import { ExecutionLogScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ExecutionLogScalarWhereWithAggregatesInputSchema'

export const ExecutionLogGroupByArgsSchema: z.ZodType<Prisma.ExecutionLogGroupByArgs> = z
    .object({
        where: ExecutionLogWhereInputSchema.optional(),
        orderBy: z.union([ExecutionLogOrderByWithAggregationInputSchema.array(), ExecutionLogOrderByWithAggregationInputSchema]).optional(),
        by: ExecutionLogScalarFieldEnumSchema.array(),
        having: ExecutionLogScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default ExecutionLogGroupByArgsSchema
