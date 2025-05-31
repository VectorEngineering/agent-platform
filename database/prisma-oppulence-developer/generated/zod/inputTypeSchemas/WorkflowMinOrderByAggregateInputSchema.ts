import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'

export const WorkflowMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkflowMinOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        definition: z.lazy(() => SortOrderSchema).optional(),
        executionPlan: z.lazy(() => SortOrderSchema).optional(),
        creditsCost: z.lazy(() => SortOrderSchema).optional(),
        cron: z.lazy(() => SortOrderSchema).optional(),
        status: z.lazy(() => SortOrderSchema).optional(),
        lastRunAt: z.lazy(() => SortOrderSchema).optional(),
        lastRunId: z.lazy(() => SortOrderSchema).optional(),
        lastRunStatus: z.lazy(() => SortOrderSchema).optional(),
        nextRunAt: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        updateAt: z.lazy(() => SortOrderSchema).optional()
    })
    .strict()

export default WorkflowMinOrderByAggregateInputSchema
