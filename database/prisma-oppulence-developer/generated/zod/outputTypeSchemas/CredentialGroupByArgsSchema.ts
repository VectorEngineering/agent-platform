import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CredentialWhereInputSchema } from '../inputTypeSchemas/CredentialWhereInputSchema'
import { CredentialOrderByWithAggregationInputSchema } from '../inputTypeSchemas/CredentialOrderByWithAggregationInputSchema'
import { CredentialScalarFieldEnumSchema } from '../inputTypeSchemas/CredentialScalarFieldEnumSchema'
import { CredentialScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/CredentialScalarWhereWithAggregatesInputSchema'

export const CredentialGroupByArgsSchema: z.ZodType<Prisma.CredentialGroupByArgs> = z
    .object({
        where: CredentialWhereInputSchema.optional(),
        orderBy: z.union([CredentialOrderByWithAggregationInputSchema.array(), CredentialOrderByWithAggregationInputSchema]).optional(),
        by: CredentialScalarFieldEnumSchema.array(),
        having: CredentialScalarWhereWithAggregatesInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default CredentialGroupByArgsSchema
