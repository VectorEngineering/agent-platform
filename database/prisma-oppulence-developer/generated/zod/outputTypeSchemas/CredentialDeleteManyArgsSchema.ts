import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { CredentialWhereInputSchema } from '../inputTypeSchemas/CredentialWhereInputSchema'

export const CredentialDeleteManyArgsSchema: z.ZodType<Prisma.CredentialDeleteManyArgs> = z
    .object({
        where: CredentialWhereInputSchema.optional()
    })
    .strict()

export default CredentialDeleteManyArgsSchema
