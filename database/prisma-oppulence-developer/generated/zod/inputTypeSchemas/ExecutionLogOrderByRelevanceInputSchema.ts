import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionLogOrderByRelevanceFieldEnumSchema } from './ExecutionLogOrderByRelevanceFieldEnumSchema'
import { SortOrderSchema } from './SortOrderSchema'

export const ExecutionLogOrderByRelevanceInputSchema: z.ZodType<Prisma.ExecutionLogOrderByRelevanceInput> = z
    .object({
        fields: z.union([
            z.lazy(() => ExecutionLogOrderByRelevanceFieldEnumSchema),
            z.lazy(() => ExecutionLogOrderByRelevanceFieldEnumSchema).array()
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string()
    })
    .strict()

export default ExecutionLogOrderByRelevanceInputSchema
