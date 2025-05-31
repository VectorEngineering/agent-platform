import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { ExecutionPhaseOrderByRelevanceFieldEnumSchema } from './ExecutionPhaseOrderByRelevanceFieldEnumSchema'
import { SortOrderSchema } from './SortOrderSchema'

export const ExecutionPhaseOrderByRelevanceInputSchema: z.ZodType<Prisma.ExecutionPhaseOrderByRelevanceInput> = z
    .object({
        fields: z.union([
            z.lazy(() => ExecutionPhaseOrderByRelevanceFieldEnumSchema),
            z.lazy(() => ExecutionPhaseOrderByRelevanceFieldEnumSchema).array()
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string()
    })
    .strict()

export default ExecutionPhaseOrderByRelevanceInputSchema
