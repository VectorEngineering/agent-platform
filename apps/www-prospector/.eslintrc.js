module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:markdown/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:jsx-a11y/recommended'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    parser: '@typescript-eslint/parser',
    ignorePatterns: ['**/node_modules', '**/dist', '**/build', '**/package-lock.json'],
    plugins: ['unused-imports'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
        'no-undef': 'off',
        'no-console': [process.env.CI ? 'error' : 'warn', { allow: ['warn', 'error', 'info'] }],
        'no-redeclare': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'jsx-a11y/heading-has-content': 'off',
        'valid-typeof': 'off',
        'react/no-unknown-property': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        'no-empty': 'off'
    }
}
