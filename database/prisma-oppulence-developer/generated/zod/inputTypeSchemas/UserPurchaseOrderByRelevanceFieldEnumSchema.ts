import { z } from 'zod'

export const UserPurchaseOrderByRelevanceFieldEnumSchema = z.enum(['id', 'userId', 'stripeId', 'description', 'currency'])

export default UserPurchaseOrderByRelevanceFieldEnumSchema
