import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { UserBalanceOrderByRelevanceFieldEnumSchema } from './UserBalanceOrderByRelevanceFieldEnumSchema'
import { SortOrderSchema } from './SortOrderSchema'

export const UserBalanceOrderByRelevanceInputSchema: z.ZodType<Prisma.UserBalanceOrderByRelevanceInput> = z
    .object({
        fields: z.union([
            z.lazy(() => UserBalanceOrderByRelevanceFieldEnumSchema),
            z.lazy(() => UserBalanceOrderByRelevanceFieldEnumSchema).array()
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string()
    })
    .strict()

export default UserBalanceOrderByRelevanceInputSchema
