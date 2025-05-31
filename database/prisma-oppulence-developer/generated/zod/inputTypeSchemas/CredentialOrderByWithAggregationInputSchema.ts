import type { Prisma } from '@prisma/client'

import { z } from 'zod'
import { SortOrderSchema } from './SortOrderSchema'
import { CredentialCountOrderByAggregateInputSchema } from './CredentialCountOrderByAggregateInputSchema'
import { CredentialMaxOrderByAggregateInputSchema } from './CredentialMaxOrderByAggregateInputSchema'
import { CredentialMinOrderByAggregateInputSchema } from './CredentialMinOrderByAggregateInputSchema'

export const CredentialOrderByWithAggregationInputSchema: z.ZodType<Prisma.CredentialOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        userId: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        value: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        _count: z.lazy(() => CredentialCountOrderByAggregateInputSchema).optional(),
        _max: z.lazy(() => CredentialMaxOrderByAggregateInputSchema).optional(),
        _min: z.lazy(() => CredentialMinOrderByAggregateInputSchema).optional()
    })
    .strict()

export default CredentialOrderByWithAggregationInputSchema
