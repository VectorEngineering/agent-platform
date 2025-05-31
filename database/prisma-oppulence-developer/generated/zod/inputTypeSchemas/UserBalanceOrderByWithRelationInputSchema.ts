import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { UserBalanceOrderByRelevanceInputSchema } from './UserBalanceOrderByRelevanceInputSchema'

export const UserBalanceOrderByWithRelationInputSchema: z.ZodType<Prisma.UserBalanceOrderByWithRelationInput> = z
    .object({
        userId: z.lazy(() => SortOrderSchema).optional(),
        credits: z.lazy(() => SortOrderSchema).optional(),
        _relevance: z.lazy(() => UserBalanceOrderByRelevanceInputSchema).optional()
    })
    .strict()

export default UserBalanceOrderByWithRelationInputSchema
