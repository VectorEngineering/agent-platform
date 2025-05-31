import { z } from 'zod'

/////////////////////////////////////////
// CREDENTIAL SCHEMA
/////////////////////////////////////////

export const CredentialSchema = z.object({
    id: z.string().cuid(),
    userId: z.string(),
    name: z.string(),
    value: z.string(),
    createdAt: z.coerce.date()
})

export type Credential = z.infer<typeof CredentialSchema>

/////////////////////////////////////////
// CREDENTIAL OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CredentialOptionalDefaultsSchema = CredentialSchema.merge(
    z.object({
        id: z.string().cuid().optional(),
        createdAt: z.coerce.date().optional()
    })
)

export type CredentialOptionalDefaults = z.infer<typeof CredentialOptionalDefaultsSchema>

export default CredentialSchema
