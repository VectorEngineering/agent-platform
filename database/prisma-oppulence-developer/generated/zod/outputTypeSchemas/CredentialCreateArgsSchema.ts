import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CredentialCreateInputSchema } from '../inputTypeSchemas/CredentialCreateInputSchema'
import { CredentialUncheckedCreateInputSchema } from '../inputTypeSchemas/CredentialUncheckedCreateInputSchema'
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

export const CredentialCreateArgsSchema: z.ZodType<Prisma.CredentialCreateArgs> = z
    .object({
        select: CredentialSelectSchema.optional(),
        data: z.union([CredentialCreateInputSchema, CredentialUncheckedCreateInputSchema])
    })
    .strict()

export default CredentialCreateArgsSchema
