import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CredentialUpdateInputSchema } from '../inputTypeSchemas/CredentialUpdateInputSchema'
import { CredentialUncheckedUpdateInputSchema } from '../inputTypeSchemas/CredentialUncheckedUpdateInputSchema'
import { CredentialWhereUniqueInputSchema } from '../inputTypeSchemas/CredentialWhereUniqueInputSchema'
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

export const CredentialUpdateArgsSchema: z.ZodType<Prisma.CredentialUpdateArgs> = z
    .object({
        select: CredentialSelectSchema.optional(),
        data: z.union([CredentialUpdateInputSchema, CredentialUncheckedUpdateInputSchema]),
        where: CredentialWhereUniqueInputSchema
    })
    .strict()

export default CredentialUpdateArgsSchema
