import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { WorkflowExecutionOrderByRelevanceFieldEnumSchema } from './WorkflowExecutionOrderByRelevanceFieldEnumSchema'
import { SortOrderSchema } from './SortOrderSchema'

export const WorkflowExecutionOrderByRelevanceInputSchema: z.ZodType<Prisma.WorkflowExecutionOrderByRelevanceInput> = z
    .object({
        fields: z.union([
            z.lazy(() => WorkflowExecutionOrderByRelevanceFieldEnumSchema),
            z.lazy(() => WorkflowExecutionOrderByRelevanceFieldEnumSchema).array()
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string()
    })
    .strict()

export default WorkflowExecutionOrderByRelevanceInputSchema
