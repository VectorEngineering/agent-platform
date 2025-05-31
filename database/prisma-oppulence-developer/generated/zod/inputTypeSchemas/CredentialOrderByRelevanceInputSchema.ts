import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { CredentialOrderByRelevanceFieldEnumSchema } from './CredentialOrderByRelevanceFieldEnumSchema'
import { SortOrderSchema } from './SortOrderSchema'

export const CredentialOrderByRelevanceInputSchema: z.ZodType<Prisma.CredentialOrderByRelevanceInput> = z
    .object({
        fields: z.union([
            z.lazy(() => CredentialOrderByRelevanceFieldEnumSchema),
            z.lazy(() => CredentialOrderByRelevanceFieldEnumSchema).array()
        ]),
        sort: z.lazy(() => SortOrderSchema),
        search: z.string()
    })
    .strict()

export default CredentialOrderByRelevanceInputSchema
