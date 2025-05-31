import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema'
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema'

export const ExecutionLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExecutionLogScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ExecutionLogScalarWhereWithAggregatesInputSchema),
                z.lazy(() => ExecutionLogScalarWhereWithAggregatesInputSchema).array()
            ])
            .optional(),
        OR: z
            .lazy(() => ExecutionLogScalarWhereWithAggregatesInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ExecutionLogScalarWhereWithAggregatesInputSchema),
                z.lazy(() => ExecutionLogScalarWhereWithAggregatesInputSchema).array()
            ])
            .optional(),
        id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        logLevel: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        message: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
        timestamp: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
        executionPhaseId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional()
    })
    .strict()

export default ExecutionLogScalarWhereWithAggregatesInputSchema
