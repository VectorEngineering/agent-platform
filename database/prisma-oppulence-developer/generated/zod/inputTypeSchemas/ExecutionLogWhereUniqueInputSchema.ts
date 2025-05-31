import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogWhereInputSchema } from './ExecutionLogWhereInputSchema'
import { StringFilterSchema } from './StringFilterSchema'
import { DateTimeFilterSchema } from './DateTimeFilterSchema'
import { ExecutionPhaseRelationFilterSchema } from './ExecutionPhaseRelationFilterSchema'
import { ExecutionPhaseWhereInputSchema } from './ExecutionPhaseWhereInputSchema'

export const ExecutionLogWhereUniqueInputSchema: z.ZodType<Prisma.ExecutionLogWhereUniqueInput> = z
    .object({
        id: z.string().cuid()
    })
    .and(
        z
            .object({
                id: z.string().cuid().optional(),
                AND: z.union([z.lazy(() => ExecutionLogWhereInputSchema), z.lazy(() => ExecutionLogWhereInputSchema).array()]).optional(),
                OR: z
                    .lazy(() => ExecutionLogWhereInputSchema)
                    .array()
                    .optional(),
                NOT: z.union([z.lazy(() => ExecutionLogWhereInputSchema), z.lazy(() => ExecutionLogWhereInputSchema).array()]).optional(),
                logLevel: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                message: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                timestamp: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
                executionPhaseId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
                executionPhase: z
                    .union([z.lazy(() => ExecutionPhaseRelationFilterSchema), z.lazy(() => ExecutionPhaseWhereInputSchema)])
                    .optional()
            })
            .strict()
    )

export default ExecutionLogWhereUniqueInputSchema
