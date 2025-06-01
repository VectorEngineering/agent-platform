To Integrate with the core theme, you need to add the following to your tailwind.config.ts:

```ts
import coreConfig from '@playbookmedia/tailwind-config'
import path from 'path'

// Get two levels up from require.resolve("@medusajs/ui")
const root = path.join(require.resolve('@playbookmedia/ui'), '../..')
const uiPath = path.join(root, '**/*.{js,ts,jsx,tsx,mdx}')

// filter out unwanted config from the core theme
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { spacing, ...coreTheme } = coreConfig.theme || {}
// filter out unwanted config from extended theme
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { borderRadius, ...extendedTheme } = coreConfig.theme?.extend || {}

// remove core spacing except those having "docs" prefix
const modifiedSpacing: Record<string, string | number> = {}
for (const [key, value] of Object.entries(coreConfig.theme.spacing).filter(([key]) => key.startsWith('docs_'))) {
    modifiedSpacing[key as string] = value
}

// remove core border radius except those having "docs" prefix
const modifiedRadius: Record<string, string | number> = {}
for (const [key, value] of Object.entries(coreConfig.theme.extend.borderRadius).filter(([key]) => key.startsWith('docs_'))) {
    modifiedRadius[key] = value
}

module.exports = {
    ...coreConfig,
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', uiPath],
    darkMode: [...coreConfig.darkMode, 'class'],
    presets: [...coreConfig.presets],
    theme: {
        ...coreTheme,
        extend: {
            ...extendedTheme,
            container: {
                center: true,
                screens: {
                    '2xl': '1400px'
                }
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                    50: 'rgb(var(--primary-50) / <alpha-value>)',
                    100: 'rgb(var(--primary-100) / <alpha-value>)',
                    200: 'rgb(var(--primary-200) / <alpha-value>)',
                    300: 'rgb(var(--primary-300) / <alpha-value>)',
                    400: 'rgb(var(--primary-400) / <alpha-value>)',
                    500: 'rgb(var(--primary-500) / <alpha-value>)',
                    600: 'rgb(var(--primary-600) / <alpha-value>)',
                    700: 'rgb(var(--primary-700) / <alpha-value>)',
                    800: 'rgb(var(--primary-800) / <alpha-value>)',
                    900: 'rgb(var(--primary-900) / <alpha-value>)'
                }
            },
            borderRadius: modifiedRadius,
            spacing: modifiedSpacing
        }
    }
}
```
