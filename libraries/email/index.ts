import { Resend } from 'resend'
import { env } from '@playbookmedia/env'

export const resend = new Resend(env.RESEND_TOKEN)
