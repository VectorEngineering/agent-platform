import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseWhereInputSchema } from '../inputTypeSchemas/ExecutionPhaseWhereInputSchema'
import { ExecutionPhaseOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ExecutionPhaseOrderByWithAggregationInputSchema'
import { ExecutionPhaseScalarFieldEnumSchema } from '../inputTypeSchemas/ExecutionPhaseScalarFieldEnumSchema'
import { ExecutionPhaseScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ExecutionPhaseScalarWhereWithAggregatesInputSchema'

export const ExecutionPhaseGroupByArgsSchema: z.ZodType<Prisma.ExecutionPhaseGroupByArgs> = z
    .object({
        where: ExecutionPhaseWhereInputSchema.optional(),
        orderBy: z
            .union([ExecutionPhaseOrderByWithAggregationInputSchema.array(), ExecutionPhaseOrderByWithAggregationInputSchema])
            .optional(),
        by: ExecutionPhaseScalarFieldEnumSchema.array(),
        having: ExecutionPhaseScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default ExecutionPhaseGroupByArgsSchema
