import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringFilterSchema } from './StringFilterSchema'
import { DateTimeFilterSchema } from './DateTimeFilterSchema'
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema'
import { IntFilterSchema } from './IntFilterSchema'

export const WorkflowExecutionScalarWhereInputSchema: z.ZodType<Prisma.WorkflowExecutionScalarWhereInput> = z
    .object({
        AND: z
            .union([z.lazy(() => WorkflowExecutionScalarWhereInputSchema), z.lazy(() => WorkflowExecutionScalarWhereInputSchema).array()])
            .optional(),
        OR: z
            .lazy(() => WorkflowExecutionScalarWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([z.lazy(() => WorkflowExecutionScalarWhereInputSchema), z.lazy(() => WorkflowExecutionScalarWhereInputSchema).array()])
            .optional(),
        id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        workflowId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        trigger: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        status: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        startedAt: z
            .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
            .optional()
            .nullable(),
        completedAt: z
            .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
            .optional()
            .nullable(),
        definition: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        creditsConsumed: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional()
    })
    .strict()

export default WorkflowExecutionScalarWhereInputSchema
