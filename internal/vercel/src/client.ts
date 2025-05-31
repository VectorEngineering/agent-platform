import { Err, FetchError, Ok, type Result } from '@playbookmedia/error'
import { z } from 'zod'

/** Response structure for Vercel API errors */
type VercelErrorResponse = {
    error: string
    message: string
}

/** Schema for Vercel project data */
const projectSchema = z.object({
    id: z.string(),
    name: z.string()
})
export type Project = z.infer<typeof projectSchema>

/** Schema for Vercel environment variable data */
const environmentVariable = z.object({})
export type EnvironmentVariable = z.infer<typeof environmentVariable>

/**
 * Client for interacting with the Vercel API
 * @see https://vercel.com/docs/rest-api
 */
export class Vercel {
    private readonly baseUrl: string
    private readonly token: string
    private readonly teamId: string | null

    /**
     * Creates a new Vercel API client instance
     * @param opts - Configuration options
     * @param opts.accessToken - Vercel access token for authentication
     * @param opts.baseUrl - Optional custom API base URL (defaults to https://api.vercel.com)
     * @param opts.teamId - Optional team ID for team-scoped operations
     */
    constructor(opts: { accessToken: string; baseUrl?: string; teamId?: string }) {
        this.baseUrl = opts.baseUrl ?? 'https://api.vercel.com'
        this.token = opts.accessToken
        this.teamId = opts.teamId ?? null
    }

    /**
     * Makes an authenticated request to the Vercel API
     * @template TResult - Expected response type
     * @param req - Request configuration
     * @param req.method - HTTP method to use
     * @param req.path - URL path segments
     * @param req.parameters - Optional query parameters
     * @param req.opts - Optional fetch options (cache, revalidation)
     * @param req.body - Optional request body
     * @returns Result containing the response data or a FetchError
     * @internal
     */
    private async fetch<TResult>(req: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE'
        path: string[]
        parameters?: Record<string, unknown>
        opts?: { cache?: RequestCache; revalidate?: number }
        body?: unknown
    }): Promise<Result<TResult, FetchError>> {
        const url = new URL(req.path.join('/'), this.baseUrl)
        try {
            if (req.parameters) {
                for (const [key, value] of Object.entries(req.parameters)) {
                    if (typeof value === 'undefined' || value === null) {
                        continue
                    }
                    url.searchParams.set(key, value.toString())
                }
            }
            if (this.teamId) {
                url.searchParams.set('teamId', this.teamId)
            }
            const res = await fetch(url, {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                },
                body: req.body ? JSON.stringify(req.body) : undefined,
                cache: req.opts?.cache,
                // @ts-ignore
                next: {
                    revalidate: req.opts?.revalidate
                }
            })
            if (!res.ok) {
                const error = (await res.json()) as VercelErrorResponse
                console.error(error)
                return Err(
                    new FetchError({
                        message: error.message,
                        retry: true,
                        context: {
                            url: url.toString(),
                            method: req.method
                        }
                    })
                )
            }
            const body = await res.json()
            return Ok(body)
        } catch (e) {
            return Err(
                new FetchError({
                    message: (e as Error).message,
                    retry: true,
                    context: {
                        url: url.toString(),
                        method: req.method
                    }
                })
            )
        }
    }

    /**
     * Retrieves details for a specific Vercel project
     * @param projectId - ID of the project to fetch
     * @returns Result containing project details or a FetchError
     */
    public async getProject(projectId: string): Promise<Result<Project, FetchError>> {
        return this.fetch({
            method: 'GET',
            path: ['v9', 'projects', projectId]
        })
    }

    /**
     * Retrieves a list of all accessible Vercel projects
     * @returns Result containing an array of projects or a FetchError
     */
    public async listProjects(): Promise<Result<Project[], FetchError>> {
        const res = await this.fetch<{ projects: Project[] }>({
            method: 'GET',
            path: ['v9', 'projects']
        })
        if (res.err) {
            return res
        }
        return Ok(res.val.projects)
    }

    /**
     * Creates or updates an environment variable for a Vercel project
     * @param projectId - ID of the target project
     * @param environment - Target environment (e.g., "development", "production")
     * @param key - Environment variable name
     * @param value - Environment variable value
     * @param sensitive - Whether the variable contains sensitive data
     * @returns Result containing the created/updated variable ID or a FetchError
     */
    public async upsertEnvironmentVariable(
        projectId: string,
        environment: string,
        key: string,
        value: string,
        sensitive?: boolean
    ): Promise<Result<{ created: { id: string } }, FetchError>> {
        return await this.fetch({
            method: 'POST',
            path: ['v10', 'projects', projectId, 'env'],
            parameters: { upsert: true },
            body: {
                key,
                value,
                type: sensitive ? (environment === 'development' ? 'encrypted' : 'sensitive') : 'plain',
                target: [environment]
            }
        })
    }

    /**
     * Removes an environment variable from a Vercel project
     * @param projectId - ID of the target project
     * @param envId - ID of the environment variable to remove
     * @returns Result indicating success or a FetchError
     */
    public async removeEnvironmentVariable(projectId: string, envId: string): Promise<Result<void, FetchError>> {
        return await this.fetch({
            method: 'DELETE',
            path: ['v10', 'projects', projectId, 'env', envId]
        })
    }
}
