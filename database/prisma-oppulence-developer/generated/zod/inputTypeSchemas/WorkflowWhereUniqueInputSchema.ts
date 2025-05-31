import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowNameUserIdCompoundUniqueInputSchema } from './WorkflowNameUserIdCompoundUniqueInputSchema'
import { WorkflowWhereInputSchema } from './WorkflowWhereInputSchema'
import { StringFilterSchema } from './StringFilterSchema'
import { StringNullableFilterSchema } from './StringNullableFilterSchema'
import { IntFilterSchema } from './IntFilterSchema'
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema'
import { DateTimeFilterSchema } from './DateTimeFilterSchema'
import { WorkflowExecutionListRelationFilterSchema } from './WorkflowExecutionListRelationFilterSchema'

export const WorkflowWhereUniqueInputSchema: z.ZodType<Prisma.WorkflowWhereUniqueInput> = z
    .union([
        z.object({
            id: z.string().cuid(),
            name_userId: z.lazy(() => WorkflowNameUserIdCompoundUniqueInputSchema)
        }),
        z.object({
            id: z.string().cuid()
        }),
        z.object({
            name_userId: z.lazy(() => WorkflowNameUserIdCompoundUniqueInputSchema)
        })
    ])
    .and(
        z
            .object({
                id: z.string().cuid().optional(),
                name_userId: z.lazy(() => WorkflowNameUserIdCompoundUniqueInputSchema).optional(),
                AND: z.union([z.lazy(() => WorkflowWhereInputSchema), z.lazy(() => WorkflowWhereInputSchema).array()]).optional(),
                OR: z
                    .lazy(() => WorkflowWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z.union([z.lazy(() => WorkflowWhereInputSchema), z.lazy(() => WorkflowWhereInputSchema).array()]).optional(),
                userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                description: z
                    .union([z.lazy(() => StringNullableFilterSchema), z.string()])
                    .optional()
                    .nullable(),
                definition: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                executionPlan: z
                    .union([z.lazy(() => StringNullableFilterSchema), z.string()])
                    .optional()
                    .nullable(),
                creditsCost: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
                cron: z
                    .union([z.lazy(() => StringNullableFilterSchema), z.string()])
                    .optional()
                    .nullable(),
                status: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                lastRunAt: z
                    .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
                    .optional()
                    .nullable(),
                lastRunId: z
                    .union([z.lazy(() => StringNullableFilterSchema), z.string()])
                    .optional()
                    .nullable(),
                lastRunStatus: z
                    .union([z.lazy(() => StringNullableFilterSchema), z.string()])
                    .optional()
                    .nullable(),
                nextRunAt: z
                    .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
                    .optional()
                    .nullable(),
                createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
                updateAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
                executions: z.lazy(() => WorkflowExecutionListRelationFilterSchema).optional()
            })
            .strict()
    )

export default WorkflowWhereUniqueInputSchema
