import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { UserPurchaseOrderByRelevanceInputSchema } from './UserPurchaseOrderByRelevanceInputSchema'

export const UserPurchaseOrderByWithRelationInputSchema: z.ZodType<Prisma.UserPurchaseOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        stripeId: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        amount: z.lazy(() => SortOrderSchema).optional(),
        currency: z.lazy(() => SortOrderSchema).optional(),
        date: z.lazy(() => SortOrderSchema).optional(),
        _relevance: z.lazy(() => UserPurchaseOrderByRelevanceInputSchema).optional()
    })
    .strict()

export default UserPurchaseOrderByWithRelationInputSchema
