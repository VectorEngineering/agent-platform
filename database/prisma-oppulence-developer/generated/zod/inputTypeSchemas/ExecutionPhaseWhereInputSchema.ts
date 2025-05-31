import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringFilterSchema } from './StringFilterSchema'
import { IntFilterSchema } from './IntFilterSchema'
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema'
import { StringNullableFilterSchema } from './StringNullableFilterSchema'
import { IntNullableFilterSchema } from './IntNullableFilterSchema'
import { WorkflowExecutionRelationFilterSchema } from './WorkflowExecutionRelationFilterSchema'
import { WorkflowExecutionWhereInputSchema } from './WorkflowExecutionWhereInputSchema'
import { ExecutionLogListRelationFilterSchema } from './ExecutionLogListRelationFilterSchema'

export const ExecutionPhaseWhereInputSchema: z.ZodType<Prisma.ExecutionPhaseWhereInput> = z
    .object({
        AND: z.union([z.lazy(() => ExecutionPhaseWhereInputSchema), z.lazy(() => ExecutionPhaseWhereInputSchema).array()]).optional(),
        OR: z
            .lazy(() => ExecutionPhaseWhereInputSchema)
            .array()
            .optional(),
        NOT: z.union([z.lazy(() => ExecutionPhaseWhereInputSchema), z.lazy(() => ExecutionPhaseWhereInputSchema).array()]).optional(),
        id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        status: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        number: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
        node: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        startedAt: z
            .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
            .optional()
            .nullable(),
        completedAt: z
            .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
            .optional()
            .nullable(),
        inputs: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        outputs: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        creditsConsumed: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number()])
            .optional()
            .nullable(),
        workflowExecutionId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        execution: z
            .union([z.lazy(() => WorkflowExecutionRelationFilterSchema), z.lazy(() => WorkflowExecutionWhereInputSchema)])
            .optional(),
        logs: z.lazy(() => ExecutionLogListRelationFilterSchema).optional()
    })
    .strict()

export default ExecutionPhaseWhereInputSchema
