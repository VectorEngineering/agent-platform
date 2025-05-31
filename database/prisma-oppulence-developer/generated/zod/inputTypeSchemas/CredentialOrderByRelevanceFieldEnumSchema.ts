import { z } from 'zod'

export const CredentialOrderByRelevanceFieldEnumSchema = z.enum(['id', 'userId', 'name', 'value'])

export default CredentialOrderByRelevanceFieldEnumSchema
