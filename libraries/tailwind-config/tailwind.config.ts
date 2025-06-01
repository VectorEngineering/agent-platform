import coreConfig from './modified.tailwind.config'
// import path from "node:path"

// // Get two levels up from require.resolve("@medusajs/ui")
// const root = path.join(require.resolve("docs-ui"), "../..")
// const uiPath = path.join(root, "**/*.{js,ts,jsx,tsx,mdx}")

/** @type {import('tailwindcss').Config} */
export default {
    ...coreConfig
    // content: [uiPath],
}
