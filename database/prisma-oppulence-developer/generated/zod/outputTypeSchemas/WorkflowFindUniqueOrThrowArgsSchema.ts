import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { WorkflowIncludeSchema } from '../inputTypeSchemas/WorkflowIncludeSchema'
import { WorkflowWhereUniqueInputSchema } from '../inputTypeSchemas/WorkflowWhereUniqueInputSchema'
import { WorkflowExecutionFindManyArgsSchema } from './WorkflowExecutionFindManyArgsSchema'
import { WorkflowCountOutputTypeArgsSchema } from './WorkflowCountOutputTypeArgsSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WorkflowSelectSchema: z.ZodType<Prisma.WorkflowSelect> = z
    .object({
        id: z.boolean().optional(),
        userId: z.boolean().optional(),
        name: z.boolean().optional(),
        description: z.boolean().optional(),
        definition: z.boolean().optional(),
        executionPlan: z.boolean().optional(),
        creditsCost: z.boolean().optional(),
        cron: z.boolean().optional(),
        status: z.boolean().optional(),
        lastRunAt: z.boolean().optional(),
        lastRunId: z.boolean().optional(),
        lastRunStatus: z.boolean().optional(),
        nextRunAt: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        updateAt: z.boolean().optional(),
        executions: z.union([z.boolean(), z.lazy(() => WorkflowExecutionFindManyArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => WorkflowCountOutputTypeArgsSchema)]).optional()
    })
    .strict()

export const WorkflowFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkflowFindUniqueOrThrowArgs> = z
    .object({
        select: WorkflowSelectSchema.optional(),
        include: WorkflowIncludeSchema.optional(),
        where: WorkflowWhereUniqueInputSchema
    })
    .strict()

export default WorkflowFindUniqueOrThrowArgsSchema
