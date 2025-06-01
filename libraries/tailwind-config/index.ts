import { config } from './config'
import resolveConfig from 'tailwindcss/resolveConfig'

export const tailwind = resolveConfig(config)
