import { z } from 'zod'

export const UserBalanceScalarFieldEnumSchema = z.enum(['userId', 'credits'])

export default UserBalanceScalarFieldEnumSchema
