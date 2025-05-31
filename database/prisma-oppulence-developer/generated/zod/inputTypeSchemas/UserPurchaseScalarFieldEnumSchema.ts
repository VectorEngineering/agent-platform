import { z } from 'zod'

export const UserPurchaseScalarFieldEnumSchema = z.enum(['id', 'userId', 'stripeId', 'description', 'amount', 'currency', 'date'])

export default UserPurchaseScalarFieldEnumSchema
