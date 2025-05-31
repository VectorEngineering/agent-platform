import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CredentialWhereInputSchema } from '../inputTypeSchemas/CredentialWhereInputSchema'
import { CredentialOrderByWithRelationInputSchema } from '../inputTypeSchemas/CredentialOrderByWithRelationInputSchema'
import { CredentialWhereUniqueInputSchema } from '../inputTypeSchemas/CredentialWhereUniqueInputSchema'
import { CredentialScalarFieldEnumSchema } from '../inputTypeSchemas/CredentialScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CredentialSelectSchema: z.ZodType<Prisma.CredentialSelect> = z
    .object({
        id: z.boolean().optional(),
        userId: z.boolean().optional(),
        name: z.boolean().optional(),
        value: z.boolean().optional(),
        createdAt: z.boolean().optional()
    })
    .strict()

export const CredentialFindManyArgsSchema: z.ZodType<Prisma.CredentialFindManyArgs> = z
    .object({
        select: CredentialSelectSchema.optional(),
        where: CredentialWhereInputSchema.optional(),
        orderBy: z.union([CredentialOrderByWithRelationInputSchema.array(), CredentialOrderByWithRelationInputSchema]).optional(),
        cursor: CredentialWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z.union([CredentialScalarFieldEnumSchema, CredentialScalarFieldEnumSchema.array()]).optional()
    })
    .strict()

export default CredentialFindManyArgsSchema
