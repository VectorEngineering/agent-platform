import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowWhereInputSchema } from '../inputTypeSchemas/WorkflowWhereInputSchema'
import { WorkflowOrderByWithRelationInputSchema } from '../inputTypeSchemas/WorkflowOrderByWithRelationInputSchema'
import { WorkflowWhereUniqueInputSchema } from '../inputTypeSchemas/WorkflowWhereUniqueInputSchema'

export const WorkflowAggregateArgsSchema: z.ZodType<Prisma.WorkflowAggregateArgs> = z
    .object({
        where: WorkflowWhereInputSchema.optional(),
        orderBy: z.union([WorkflowOrderByWithRelationInputSchema.array(), WorkflowOrderByWithRelationInputSchema]).optional(),
        cursor: WorkflowWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default WorkflowAggregateArgsSchema
