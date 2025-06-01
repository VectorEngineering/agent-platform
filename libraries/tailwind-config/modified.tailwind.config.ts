// This config file includes the base configurations with the modified configs for UI docs
import coreConfig from './base.tailwind.config'

// modify core spacing to have "docs" prefix
const modifiedSpacing: Record<string, string> = {}
for (const [key, value] of Object.entries(coreConfig.theme.spacing)) {
    modifiedSpacing[`docs_${key}`] = value
}

// modify core border radius to have "docs" prefix
const modifiedRadius: Record<string, string> = {}
for (const [key, value] of Object.entries(coreConfig.theme.extend.borderRadius)) {
    modifiedRadius[`docs_${key}`] = value
}

/** @type {import('tailwindcss').Config} */
export default {
    ...coreConfig,
    theme: {
        ...coreConfig.theme,
        extend: {
            ...coreConfig.theme.extend,
            borderRadius: {
                ...coreConfig.theme.extend.borderRadius,
                ...modifiedRadius
            }
        },
        spacing: {
            ...coreConfig.theme.spacing,
            ...modifiedSpacing
        }
    }
}
