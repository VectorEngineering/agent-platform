import { BusinessConfig as platform } from '@dub/platform-config'
export const DEFAULT_REDIRECTS = {
    home: platform.webUrl,
    dub: platform.webUrl,
    signin: `${platform.platformUrl}/login`,
    login: `${platform.platformUrl}/login`,
    register: `${platform.platformUrl}/register`,
    signup: `${platform.platformUrl}/register`,
    app: `${platform.platformUrl}`,
    dashboard: `${platform.platformUrl}`,
    links: `${platform.platformUrl}/links`,
    settings: `${platform.platformUrl}/settings`,
    welcome: `${platform.platformUrl}/onboarding/welcome`,
    discord: 'https://twitter.com/dubdotco' // placeholder for now
}

export const DUB_HEADERS = {
    'x-powered-by': platform.title
}

export const REDIRECTION_QUERY_PARAM = 'redir_url'
