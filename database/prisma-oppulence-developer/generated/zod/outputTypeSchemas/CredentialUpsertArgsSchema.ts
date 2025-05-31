import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CredentialWhereUniqueInputSchema } from '../inputTypeSchemas/CredentialWhereUniqueInputSchema'
import { CredentialCreateInputSchema } from '../inputTypeSchemas/CredentialCreateInputSchema'
import { CredentialUncheckedCreateInputSchema } from '../inputTypeSchemas/CredentialUncheckedCreateInputSchema'
import { CredentialUpdateInputSchema } from '../inputTypeSchemas/CredentialUpdateInputSchema'
import { CredentialUncheckedUpdateInputSchema } from '../inputTypeSchemas/CredentialUncheckedUpdateInputSchema'
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

export const CredentialUpsertArgsSchema: z.ZodType<Prisma.CredentialUpsertArgs> = z
    .object({
        select: CredentialSelectSchema.optional(),
        where: CredentialWhereUniqueInputSchema,
        create: z.union([CredentialCreateInputSchema, CredentialUncheckedCreateInputSchema]),
        update: z.union([CredentialUpdateInputSchema, CredentialUncheckedUpdateInputSchema])
    })
    .strict()

export default CredentialUpsertArgsSchema
