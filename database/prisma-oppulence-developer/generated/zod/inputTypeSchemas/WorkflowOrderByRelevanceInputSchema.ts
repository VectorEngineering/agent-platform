import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowOrderByRelevanceFieldEnumSchema } from './WorkflowOrderByRelevanceFieldEnumSchema'
import { SortOrderSchema } from './SortOrderSchema'

export const WorkflowOrderByRelevanceInputSchema: z.ZodType<Prisma.WorkflowOrderByRelevanceInput> = z
    .object({
        fields: z.union([
            z.lazy(() => WorkflowOrderByRelevanceFieldEnumSchema),
            z.lazy(() => WorkflowOrderByRelevanceFieldEnumSchema).array()
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string()
    })
    .strict()

export default WorkflowOrderByRelevanceInputSchema
