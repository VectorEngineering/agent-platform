import { z } from 'zod'

/*
 * An identifier is any string the user gives us to be used as a lookup key.
 * It must be URL safe and fit into our database (varchar 256)
 */
const identifier = z
    .string()
    .min(3)
    .max(256)
    .regex(/^[a-zA-Z0-9_\.:\-]*$/, 'Only alphanumeric, underscores, periods, colons and hyphens are allowed')

/**
 * A name is a user given human-readable string.
 *
 * It must not be used in URLs.
 *
 * @example the name of a key
 */
const name = z.string().min(3).max(256)

/**
 * A description is a user given human-readable string.
 *
 * It must not be used in URLs.
 *
 * @example The description of a permission
 */
const description = z.string().min(3).max(256)

const solomonAiId = z
    .string()
    .refine((value) => {
        const parts = value.split('_')
        if (parts.length !== 2) return false
        const [prefix, _] = parts
        return prefix.length === 3
    }, 'Prefix must be exactly 3 characters long')
    .refine((value) => /^[a-z]+$/.test(value.split('_')[0]), 'Prefix must contain only lowercase letters')
    .refine((value) => {
        const [, id] = value.split('_')
        return id && id.length >= 8
    }, 'ID part must be at least 8 characters long')
    .refine((value) => {
        const [, id] = value.split('_')
        return /^[a-zA-Z0-9]+$/.test(id || '')
    }, 'ID part must contain only alphanumeric characters')

export const validation = {
    identifier,
    name,
    description,
    solomonAiId
}
