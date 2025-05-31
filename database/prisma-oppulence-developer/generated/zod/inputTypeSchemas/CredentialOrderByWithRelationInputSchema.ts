import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { CredentialOrderByRelevanceInputSchema } from './CredentialOrderByRelevanceInputSchema'

export const CredentialOrderByWithRelationInputSchema: z.ZodType<Prisma.CredentialOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        value: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        _relevance: z.lazy(() => CredentialOrderByRelevanceInputSchema).optional()
    })
    .strict()

export default CredentialOrderByWithRelationInputSchema
