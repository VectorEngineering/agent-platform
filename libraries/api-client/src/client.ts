import type { PermissionQuery } from '@playbookmedia/rbac'
import type { ErrorResponse } from './errors'
import type { paths } from './openapi'

import { type Telemetry, getTelemetry } from './telemetry'

export type SolomonAIOptions = (
    | {
          token?: never

          /**
           * The root key from solomon-ai.dev.
           *
           * You can create/manage your root keys here:
           * https://solomon-ai.dev/app/settings/root-keys
           */
          rootKey: string
      }
    | {
          /**
           * The workspace key from solomon-ai.dev
           *
           * @deprecated Use `rootKey`
           */
          token: string
          rootKey?: never
      }
) & {
    /**
     * @default https://api.solomon-ai.dev
     */
    baseUrl?: string

    /**
     *
     * By default telemetry data is enabled, and sends:
     * runtime (Node.js / Edge)
     * platform (Node.js / Vercel / AWS)
     * SDK version
     */
    disableTelemetry?: boolean

    /**
     * Retry on network errors
     */
    retry?: {
        /**
         * How many attempts should be made
         * The maximum number of requests will be `attempts + 1`
         * `0` means no retries
         *
         * @default 5
         */
        attempts?: number
        /**
         * Return how many milliseconds to wait until the next attempt is made
         *
         * @default `(retryCount) => Math.round(Math.exp(retryCount) * 10)),`
         */
        backoff?: (retryCount: number) => number
    }
    /**
     * Customize the `fetch` cache behaviour
     */
    cache?: RequestCache

    /**
     * The version of the SDK instantiating this client.
     *
     * This is used for internal metrics and is not covered by semver, and may change at any time.
     *
     * You can leave this blank unless you are building a wrapper around this SDK.
     */
    wrapperSdkVersion?: string
}

type ApiRequest = {
    path: string[]
} & (
    | {
          method: 'GET'
          body?: never
          query?: Record<string, string | number | boolean | null>
      }
    | {
          method: 'POST'
          body?: unknown
          query?: never
      }
)

type Result<R> =
    | {
          result: R
          error?: never
      }
    | {
          result?: never
          error: {
              code: ErrorResponse['error']['code']
              message: ErrorResponse['error']['message']
              docs: ErrorResponse['error']['docs']
              requestId: string
          }
      }

export class SolomonAI {
    public readonly baseUrl: string
    private readonly rootKey: string
    private readonly cache?: RequestCache
    private readonly telemetry?: Telemetry | null

    public readonly retry: {
        attempts: number
        backoff: (retryCount: number) => number
    }

    constructor(opts: SolomonAIOptions) {
        this.baseUrl = opts.baseUrl ?? 'https://api.solomon-ai.dev'
        this.rootKey = opts.rootKey ?? opts.token
        if (!opts.disableTelemetry) {
            this.telemetry = getTelemetry(opts)
        }

        this.cache = opts.cache
        /**
         * Even though typescript should prevent this, some people still pass undefined or empty strings
         */
        if (!this.rootKey) {
            throw new Error('SolomonAI root key must be set, maybe you passed in `undefined` or an empty string?')
        }

        this.retry = {
            attempts: opts.retry?.attempts ?? 5,
            backoff: opts.retry?.backoff ?? ((n) => Math.round(Math.exp(n) * 10))
        }
    }

    private getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.rootKey}`
        }
        if (this.telemetry?.sdkVersions) {
            headers['SolomonAI-Telemetry-SDK'] = this.telemetry.sdkVersions.join(',')
        }
        if (this.telemetry?.platform) {
            headers['SolomonAI-Telemetry-Platform'] = this.telemetry.platform
        }
        if (this.telemetry?.runtime) {
            headers['SolomonAI-Telemetry-Runtime'] = this.telemetry.runtime
        }
        return headers
    }

    private isErrorResponse(data: unknown): data is ErrorResponse {
        return (
            typeof data === 'object' &&
            data !== null &&
            'error' in data &&
            typeof data.error === 'object' &&
            data.error !== null &&
            'code' in data.error &&
            'message' in data.error &&
            'docs' in data.error
        )
    }

    private async fetch<TResult>(req: ApiRequest): Promise<Result<TResult>> {
        let res: Response | null = null
        let err: Error | null = null

        for (let i = 0; i <= this.retry.attempts; i++) {
            const url = new URL(`${this.baseUrl}/${req.path.join('/')}`)
            if (req.query) {
                for (const [k, v] of Object.entries(req.query)) {
                    if (typeof v === 'undefined' || v === null) {
                        continue
                    }
                    url.searchParams.set(k, v.toString())
                }
            }

            try {
                res = await fetch(url, {
                    method: req.method,
                    headers: this.getHeaders(),
                    cache: this.cache,
                    body: JSON.stringify(req.body)
                })

                if (res.ok) {
                    const data = await res.json()
                    return { result: data as TResult }
                }

                // Handle error responses
                try {
                    const errorData = await res.json()
                    if (this.isErrorResponse(errorData)) {
                        return {
                            error: {
                                code: errorData.error.code,
                                message: errorData.error.message,
                                docs: errorData.error.docs,
                                requestId: errorData.error.requestId || res.headers.get('unkey-request-id') || 'N/A'
                            }
                        }
                    }
                    // If the error response doesn't match our expected format
                    return {
                        error: {
                            code: 'INTERNAL_SERVER_ERROR',
                            message: 'Unexpected error response format',
                            docs: 'https://developer.mozilla.org/en-US/docs/Web/API/fetch',
                            requestId: res.headers.get('unkey-request-id') || 'N/A'
                        }
                    }
                } catch (jsonError) {
                    // Handle JSON parsing errors
                    return {
                        error: {
                            code: 'INTERNAL_SERVER_ERROR',
                            message: 'Invalid JSON response',
                            docs: 'https://developer.mozilla.org/en-US/docs/Web/API/fetch',
                            requestId: res.headers.get('unkey-request-id') || 'N/A'
                        }
                    }
                }
            } catch (fetchError) {
                err = fetchError as Error
                // Continue to retry logic
            }

            const backoff = this.retry.backoff(i)
            console.debug(
                'attempt %d of %d to reach %s failed, retrying in %d ms: %s | %s',
                i + 1,
                this.retry.attempts + 1,
                url,
                backoff,
                err?.message ?? `status=${res?.status}`,
                res?.headers.get('unkey-request-id')
            )
            await new Promise((r) => setTimeout(r, backoff))
        }

        // Handle network errors
        return {
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: err?.message || 'Network error',
                docs: 'https://developer.mozilla.org/en-US/docs/Web/API/fetch',
                requestId: 'N/A'
            }
        }
    }

    public get keys() {
        return {
            create: async (
                req: paths['/v1/keys.createKey']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/keys.createKey']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'keys.createKey'],
                    method: 'POST',
                    body: req
                })
            },
            update: async (
                req: paths['/v1/keys.updateKey']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/keys.updateKey']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'keys.updateKey'],
                    method: 'POST',
                    body: req
                })
            },
            verify: async <TPermission extends string = string>(
                req: Omit<paths['/v1/keys.verifyKey']['post']['requestBody']['content']['application/json'], 'authorization'> & {
                    authorization?: { permissions: PermissionQuery<TPermission> }
                }
            ): Promise<Result<paths['/v1/keys.verifyKey']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'keys.verifyKey'],
                    method: 'POST',
                    body: req
                })
            },
            delete: async (
                req: paths['/v1/keys.deleteKey']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/keys.deleteKey']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'keys.deleteKey'],
                    method: 'POST',
                    body: req
                })
            },
            updateRemaining: async (
                req: paths['/v1/keys.updateRemaining']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/keys.updateRemaining']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'keys.updateRemaining'],
                    method: 'POST',
                    body: req
                })
            },
            get: async (
                req: paths['/v1/keys.getKey']['get']['parameters']['query']
            ): Promise<Result<paths['/v1/keys.getKey']['get']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'keys.getKey'],
                    method: 'GET',
                    query: req
                })
            },
            getVerifications: async (
                req: paths['/v1/keys.getVerifications']['get']['parameters']['query']
            ): Promise<Result<paths['/v1/keys.getVerifications']['get']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'keys.getVerifications'],
                    method: 'GET',
                    query: req
                })
            }
        }
    }

    public get apis() {
        return {
            create: async (
                req: paths['/v1/apis.createApi']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/apis.createApi']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'apis.createApi'],
                    method: 'POST',
                    body: req
                })
            },
            delete: async (
                req: paths['/v1/apis.deleteApi']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/apis.deleteApi']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'apis.deleteApi'],
                    method: 'POST',
                    body: req
                })
            },
            get: async (
                req: paths['/v1/apis.getApi']['get']['parameters']['query']
            ): Promise<Result<paths['/v1/apis.getApi']['get']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'apis.getApi'],
                    method: 'GET',
                    query: req
                })
            },
            listKeys: async (
                req: paths['/v1/apis.listKeys']['get']['parameters']['query']
            ): Promise<Result<paths['/v1/apis.listKeys']['get']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'apis.listKeys'],
                    method: 'GET',
                    query: req
                })
            }
        }
    }
    public get ratelimits() {
        return {
            limit: async (
                req: paths['/v1/ratelimits.limit']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/ratelimits.limit']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'ratelimits.limit'],
                    method: 'POST',
                    body: req
                })
            },
            getOverride: async (
                req: paths['/v1/ratelimits.getOverride']['get']['parameters']['query']
            ): Promise<Result<paths['/v1/ratelimits.getOverride']['get']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'ratelimits.getOverride'],
                    method: 'GET',
                    query: req
                })
            },
            listOverrides: async (
                req: paths['/v1/ratelimits.listOverrides']['get']['parameters']['query']
            ): Promise<Result<paths['/v1/ratelimits.listOverrides']['get']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'ratelimits.listOverrides'],
                    method: 'GET',
                    query: req
                })
            },

            setOverride: async (
                req: paths['/v1/ratelimits.setOverride']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/ratelimits.setOverride']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'ratelimits.setOverride'],
                    method: 'POST',
                    body: req
                })
            },

            deleteOverride: async (
                req: paths['/v1/ratelimits.deleteOverride']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/ratelimits.deleteOverride']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'ratelimits.deleteOverride'],
                    method: 'POST',
                    body: req
                })
            }
        }
    }
    public get identities() {
        return {
            create: async (
                req: paths['/v1/identities.createIdentity']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/identities.createIdentity']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'identities.createIdentity'],
                    method: 'POST',
                    body: req
                })
            },
            get: async (
                req: paths['/v1/identities.getIdentity']['get']['parameters']['query']
            ): Promise<Result<paths['/v1/identities.getIdentity']['get']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'identities.getIdentity'],
                    method: 'GET',
                    query: req
                })
            },
            list: async (
                req: paths['/v1/identities.listIdentities']['get']['parameters']['query']
            ): Promise<Result<paths['/v1/identities.listIdentities']['get']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'identities.listIdentities'],
                    method: 'GET',
                    query: req
                })
            },
            delete: async (
                req: paths['/v1/identities.deleteIdentity']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/identities.deleteIdentity']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'identities.deleteIdentity'],
                    method: 'POST',
                    body: req
                })
            },
            update: async (
                req: paths['/v1/identities.updateIdentity']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/identities.updateIdentity']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'identities.updateIdentity'],
                    method: 'POST',
                    body: req
                })
            }
        }
    }

    public get migrations() {
        return {
            createKeys: async (
                req: paths['/v1/migrations.createKeys']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/migrations.createKeys']['post']['responses']['200']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'migrations.createKeys'],
                    method: 'POST',
                    body: req
                })
            },
            enqueueKeys: async (
                req: paths['/v1/migrations.enqueueKeys']['post']['requestBody']['content']['application/json']
            ): Promise<Result<paths['/v1/migrations.enqueueKeys']['post']['responses']['202']['content']['application/json']>> => {
                return await this.fetch({
                    path: ['v1', 'migrations.enqueueKeys'],
                    method: 'POST',
                    body: req
                })
            }
        }
    }
}
