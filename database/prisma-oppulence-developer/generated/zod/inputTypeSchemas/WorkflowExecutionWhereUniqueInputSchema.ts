import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionWhereInputSchema } from './WorkflowExecutionWhereInputSchema'
import { StringFilterSchema } from './StringFilterSchema'
import { DateTimeFilterSchema } from './DateTimeFilterSchema'
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema'
import { IntFilterSchema } from './IntFilterSchema'
import { ExecutionPhaseListRelationFilterSchema } from './ExecutionPhaseListRelationFilterSchema'
import { WorkflowRelationFilterSchema } from './WorkflowRelationFilterSchema'
import { WorkflowWhereInputSchema } from './WorkflowWhereInputSchema'

export const WorkflowExecutionWhereUniqueInputSchema: z.ZodType<Prisma.WorkflowExecutionWhereUniqueInput> = z
    .object({
        id: z.string().cuid()
    })
    .and(
        z
            .object({
                id: z.string().cuid().optional(),
                AND: z
                    .union([z.lazy(() => WorkflowExecutionWhereInputSchema), z.lazy(() => WorkflowExecutionWhereInputSchema).array()])
                    .optional(),
                OR: z
                    .lazy(() => WorkflowExecutionWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z
                    .union([z.lazy(() => WorkflowExecutionWhereInputSchema), z.lazy(() => WorkflowExecutionWhereInputSchema).array()])
                    .optional(),
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
                creditsConsumed: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
                phases: z.lazy(() => ExecutionPhaseListRelationFilterSchema).optional(),
                workflow: z.union([z.lazy(() => WorkflowRelationFilterSchema), z.lazy(() => WorkflowWhereInputSchema)]).optional()
            })
            .strict()
    )

export default WorkflowExecutionWhereUniqueInputSchema
