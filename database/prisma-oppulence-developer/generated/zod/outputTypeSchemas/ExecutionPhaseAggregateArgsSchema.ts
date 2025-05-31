import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { ExecutionPhaseWhereInputSchema } from '../inputTypeSchemas/ExecutionPhaseWhereInputSchema'
import { ExecutionPhaseOrderByWithRelationInputSchema } from '../inputTypeSchemas/ExecutionPhaseOrderByWithRelationInputSchema'
import { ExecutionPhaseWhereUniqueInputSchema } from '../inputTypeSchemas/ExecutionPhaseWhereUniqueInputSchema'

export const ExecutionPhaseAggregateArgsSchema: z.ZodType<Prisma.ExecutionPhaseAggregateArgs> = z
    .object({
        where: ExecutionPhaseWhereInputSchema.optional(),
        orderBy: z.union([ExecutionPhaseOrderByWithRelationInputSchema.array(), ExecutionPhaseOrderByWithRelationInputSchema]).optional(),
        cursor: ExecutionPhaseWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default ExecutionPhaseAggregateArgsSchema
