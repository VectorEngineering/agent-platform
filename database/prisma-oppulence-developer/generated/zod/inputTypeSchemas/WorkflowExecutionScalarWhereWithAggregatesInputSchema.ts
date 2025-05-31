import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema'
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema'
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema'
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema'

export const WorkflowExecutionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkflowExecutionScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => WorkflowExecutionScalarWhereWithAggregatesInputSchema),
                z.lazy(() => WorkflowExecutionScalarWhereWithAggregatesInputSchema).array()
            ])
            .optional(),
        OR: z
            .lazy(() => WorkflowExecutionScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => WorkflowExecutionScalarWhereWithAggregatesInputSchema),
                z.lazy(() => WorkflowExecutionScalarWhereWithAggregatesInputSchema).array()
            ])
            .optional(),
        id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        workflowId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        trigger: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        status: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
        startedAt: z
            .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
            .optional()
            .nullable(),
        completedAt: z
            .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
            .optional()
            .nullable(),
        definition: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        creditsConsumed: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional()
    })
    .strict()

export default WorkflowExecutionScalarWhereWithAggregatesInputSchema
