import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CredentialCreateManyInputSchema } from '../inputTypeSchemas/CredentialCreateManyInputSchema'

export const CredentialCreateManyArgsSchema: z.ZodType<Prisma.CredentialCreateManyArgs> = z
    .object({
        data: z.union([CredentialCreateManyInputSchema, CredentialCreateManyInputSchema.array()]),
        skipDuplicates: z.boolean().optional()
    })
    .strict()

export default CredentialCreateManyArgsSchema
