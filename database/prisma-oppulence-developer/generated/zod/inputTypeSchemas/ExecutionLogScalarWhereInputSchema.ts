import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { StringFilterSchema } from './StringFilterSchema'
import { DateTimeFilterSchema } from './DateTimeFilterSchema'

export const ExecutionLogScalarWhereInputSchema: z.ZodType<Prisma.ExecutionLogScalarWhereInput> = z
    .object({
        AND: z
            .union([z.lazy(() => ExecutionLogScalarWhereInputSchema), z.lazy(() => ExecutionLogScalarWhereInputSchema).array()])
            .optional(),
        OR: z
            .lazy(() => ExecutionLogScalarWhereInputSchema)
            .array()
            .optional(),
        NOT: z
            .union([z.lazy(() => ExecutionLogScalarWhereInputSchema), z.lazy(() => ExecutionLogScalarWhereInputSchema).array()])
            .optional(),
        id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        logLevel: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        message: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        timestamp: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        executionPhaseId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional()
    })
    .strict()

export default ExecutionLogScalarWhereInputSchema
