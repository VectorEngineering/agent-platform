import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowWhereInputSchema } from '../inputTypeSchemas/WorkflowWhereInputSchema'
import { WorkflowOrderByWithAggregationInputSchema } from '../inputTypeSchemas/WorkflowOrderByWithAggregationInputSchema'
import { WorkflowScalarFieldEnumSchema } from '../inputTypeSchemas/WorkflowScalarFieldEnumSchema'
import { WorkflowScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/WorkflowScalarWhereWithAggregatesInputSchema'

export const WorkflowGroupByArgsSchema: z.ZodType<Prisma.WorkflowGroupByArgs> = z
    .object({
        where: WorkflowWhereInputSchema.optional(),
        orderBy: z.union([WorkflowOrderByWithAggregationInputSchema.array(), WorkflowOrderByWithAggregationInputSchema]).optional(),
        by: WorkflowScalarFieldEnumSchema.array(),
        having: WorkflowScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default WorkflowGroupByArgsSchema
