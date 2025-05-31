import { z } from 'zod'

export const CredentialScalarFieldEnumSchema = z.enum(['id', 'userId', 'name', 'value', 'createdAt'])

export default CredentialScalarFieldEnumSchema
