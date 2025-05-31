import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { UserPurchaseOrderByRelevanceFieldEnumSchema } from './UserPurchaseOrderByRelevanceFieldEnumSchema'
import { SortOrderSchema } from './SortOrderSchema'

export const UserPurchaseOrderByRelevanceInputSchema: z.ZodType<Prisma.UserPurchaseOrderByRelevanceInput> = z
    .object({
        fields: z.union([
            z.lazy(() => UserPurchaseOrderByRelevanceFieldEnumSchema),
            z.lazy(() => UserPurchaseOrderByRelevanceFieldEnumSchema).array()
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string()
    })
    .strict()

export default UserPurchaseOrderByRelevanceInputSchema
