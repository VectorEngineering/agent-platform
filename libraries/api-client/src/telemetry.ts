import type { SolomonAIOptions } from './client'
import { version } from '../package.json'

export type Telemetry = {
    /**
     * SolomonAI-Telemetry-Sdk
     * @example @playbookmedia/api@v1.1.1
     */
    sdkVersions: string[]
    /**
     * SolomonAI-Telemetry-Platform
     * @example cloudflare
     */
    platform?: string
    /**
     * SolomonAI-Telemetry-Runtime
     * @example node@v18
     */
    runtime?: string
}

export function getTelemetry(opts: SolomonAIOptions): Telemetry | null {
    let platform: string | undefined
    let runtime: string | undefined
    const sdkVersions = [`@playbookmedia/api@${version}`]

    try {
        if (typeof process !== 'undefined') {
            if (process.env.SOLOMONAI_DISABLE_TELEMETRY) {
                return null
            }
            platform = process.env.VERCEL ? 'vercel' : process.env.AWS_REGION ? 'aws' : undefined

            // @ts-ignore
            if (typeof EdgeRuntime !== 'undefined') {
                runtime = 'edge-light'
            } else {
                runtime = `node@${process.version}`
            }
        }

        if (opts.wrapperSdkVersion) {
            sdkVersions.push(opts.wrapperSdkVersion)
        }
    } catch (_error) {}

    return { platform, runtime, sdkVersions }
}
