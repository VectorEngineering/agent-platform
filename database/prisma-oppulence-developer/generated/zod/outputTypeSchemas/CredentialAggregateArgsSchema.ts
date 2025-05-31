import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CredentialWhereInputSchema } from '../inputTypeSchemas/CredentialWhereInputSchema'
import { CredentialOrderByWithRelationInputSchema } from '../inputTypeSchemas/CredentialOrderByWithRelationInputSchema'
import { CredentialWhereUniqueInputSchema } from '../inputTypeSchemas/CredentialWhereUniqueInputSchema'

export const CredentialAggregateArgsSchema: z.ZodType<Prisma.CredentialAggregateArgs> = z
    .object({
        where: CredentialWhereInputSchema.optional(),
        orderBy: z.union([CredentialOrderByWithRelationInputSchema.array(), CredentialOrderByWithRelationInputSchema]).optional(),
        cursor: CredentialWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional()
    })
    .strict()

export default CredentialAggregateArgsSchema
