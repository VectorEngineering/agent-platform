import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import radix from 'tailwindcss-radix'
import { themePresets } from './theme-presets'

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    future: {
        hoverOnlyWhenSupported: true
    },
    presets: [themePresets],
    theme: {
        extend: {
            colors: {
                /* docs colors */
                medusa: {
                    brown: {
                        50: '#fdf8f6',
                        100: '#f2e8e5',
                        200: '#eaddd7',
                        300: '#e0cec7',
                        400: '#d2bab0',
                        500: '#bfa094',
                        600: '#a18072',
                        700: '#977669',
                        800: '#846358',
                        900: '#43302b'
                    },
                    bg: {
                        subtle: {
                            DEFAULT: 'var(--docs-bg-subtle)',
                            hover: 'var(--docs-bg-subtle-hover)',
                            pressed: 'var(--docs-bg-subtle-pressed)'
                        },
                        base: {
                            DEFAULT: 'var(--docs-bg-base)',
                            hover: 'var(--docs-bg-base-hover)',
                            pressed: 'var(--docs-bg-base-pressed)'
                        },
                        component: {
                            DEFAULT: 'var(--docs-bg-component)',
                            hover: 'var(--docs-bg-component-hover)',
                            pressed: 'var(--docs-bg-component-pressed)'
                        },
                        'switch-off': {
                            DEFAULT: 'var(--docs-bg-switch-off)',
                            hover: 'var(--docs-bg-switch-off-hover)'
                        },
                        interactive: 'var(--docs-bg-interactive)',
                        overlay: 'var(--docs-bg-overlay)',
                        disabled: 'var(--docs-bg-disabled)',
                        highlight: {
                            DEFAULT: 'var(--docs-bg-highlight)',
                            hover: 'var(--docs-bg-highlight-hover)'
                        },
                        field: {
                            DEFAULT: 'var(--docs-bg-field)',
                            hover: 'var(--docs-bg-field-hover)',
                            component: {
                                DEFAULT: 'var(--docs-bg-field-component)',
                                hover: 'var(--docs-bg-field-component-hover)'
                            }
                        }
                    },
                    fg: {
                        base: 'var(--docs-fg-base)',
                        subtle: 'var(--docs-fg-subtle)',
                        muted: 'var(--docs-fg-muted)',
                        disabled: 'var(--docs-fg-disabled)',
                        on: {
                            color: 'var(--docs-fg-on-color)',
                            inverted: 'var(--docs-fg-on-inverted)'
                        },
                        interactive: {
                            DEFAULT: 'var(--docs-fg-interactive)',
                            hover: 'var(--docs-fg-interactive-hover)'
                        },
                        error: 'var(--docs-fg-error)'
                    },
                    border: {
                        base: 'var(--docs-border-base)',
                        strong: 'var(--docs-border-strong)',
                        interactive: 'var(--docs-border-interactive)',
                        error: 'var(--docs-border-error)',
                        danger: 'var(--docs-border-danger)',
                        transparent: 'var(--docs-border-transparent)',
                        menu: {
                            top: 'var(--docs-border-menu-top)'
                        }
                    },
                    button: {
                        inverted: {
                            DEFAULT: 'var(--docs-button-inverted)',
                            hover: 'var(--docs-button-inverted-hover)',
                            pressed: 'var(--docs-button-inverted-pressed)'
                        },
                        neutral: {
                            DEFAULT: 'var(--docs-button-neutral)',
                            hover: 'var(--docs-button-neutral-hover)',
                            pressed: 'var(--docs-button-neutral-pressed)'
                        },
                        danger: {
                            DEFAULT: 'var(--docs-button-danger)',
                            hover: 'var(--docs-button-danger-hover)',
                            pressed: 'var(--docs-button-danger-pressed)'
                        },
                        transparent: {
                            DEFAULT: 'var(--docs-button-transparent)',
                            hover: 'var(--docs-button-transparent-hover)',
                            pressed: 'var(--docs-button-transparent-pressed)'
                        }
                    },
                    tag: {
                        neutral: {
                            bg: {
                                DEFAULT: 'var(--docs-tags-neutral-bg)',
                                hover: 'var(--docs-tags-neutral-bg-hover)'
                            },
                            text: 'var(--docs-tags-neutral-text)',
                            icon: 'var(--docs-tags-neutral-icon)',
                            border: 'var(--docs-tags-neutral-border)'
                        },
                        purple: {
                            bg: {
                                DEFAULT: 'var(--docs-tags-purple-bg)',
                                hover: 'var(--docs-tags-purple-bg-hover)'
                            },
                            text: 'var(--docs-tags-purple-text)',
                            icon: 'var(--docs-tags-purple-icon)',
                            border: 'var(--docs-tags-purple-border)'
                        },
                        blue: {
                            bg: {
                                DEFAULT: 'var(--docs-tags-blue-bg)',
                                hover: 'var(--docs-tags-blue-bg-hover)'
                            },
                            text: 'var(--docs-tags-blue-text)',
                            icon: 'var(--docs-tags-blue-icon)',
                            border: 'var(--docs-tags-blue-border)'
                        },
                        green: {
                            bg: {
                                DEFAULT: 'var(--docs-tags-green-bg)',
                                hover: 'var(--docs-tags-green-bg-hover)'
                            },
                            text: 'var(--docs-tags-green-text)',
                            icon: 'var(--docs-tags-green-icon)',
                            border: 'var(--docs-tags-green-border)'
                        },
                        orange: {
                            bg: {
                                DEFAULT: 'var(--docs-tags-orange-bg)',
                                hover: 'var(--docs-tags-orange-bg-hover)'
                            },
                            text: 'var(--docs-tags-orange-text)',
                            icon: 'var(--docs-tags-orange-icon)',
                            border: 'var(--docs-tags-orange-border)'
                        },
                        red: {
                            bg: {
                                DEFAULT: 'var(--docs-tags-red-bg)',
                                hover: 'var(--docs-tags-red-bg-hover)'
                            },
                            text: 'var(--docs-tags-red-text)',
                            icon: 'var(--docs-tags-red-icon)',
                            border: 'var(--docs-tags-red-border)'
                        }
                    },
                    code: {
                        bg: {
                            base: {
                                DEFAULT: 'var(--docs-code-bg-base)'
                            },
                            header: 'var(--docs-code-bg-header)'
                        },
                        border: 'var(--docs-code-border)'
                    },
                    contrast: {
                        bg: {
                            base: {
                                DEFAULT: 'var(--docs-contrast-bg-base)',
                                pressed: 'var(--docs-contrast-bg-base-pressed)',
                                hover: 'var(--docs-contrast-bg-base-hover)'
                            },
                            subtle: 'var(--docs-contrast-bg-subtle)',
                            highlight: 'var(--docs-contrast-bg-highlight)',
                            alpha: 'var(--docs-contrast-bg-alpha)'
                        },
                        fg: {
                            primary: 'var(--docs-contrast-fg-primary)',
                            secondary: 'var(--docs-contrast-fg-secondary)'
                        },
                        border: {
                            base: 'var(--docs-contrast-border-base)',
                            top: 'var(--docs-contrast-border-top)',
                            bot: 'var(--docs-contrast-border-bot)'
                        },
                        // not in UI but necessary for show more button
                        button: {
                            DEFAULT: '#3D3D3F',
                            hover: '#505052'
                        }
                    },
                    alpha: {
                        white: {
                            alpha: {
                                6: 'var(--docs-alpha-white-alpha-6)',
                                12: 'var(--docs-alpha-white-alpha-12)'
                            }
                        }
                    }
                }
            },
            boxShadow: {
                'elevation-card-rest':
                    '0px 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 1px 2px -1px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.04)',
                'elevation-card-rest-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px #27272A, 0px 1px 2px 0px rgba(0, 0, 0, 0.32), 0px 2px 4px 0px rgba(0, 0, 0, 0.32)',
                'elevation-card-hover':
                    '0px 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 1px 2px -1px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.10)',
                'elevation-card-hover-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px #27272A, 0px 1px 4px 0px rgba(0, 0, 0, 0.48), 0px 2px 8px 0px rgba(0, 0, 0, 0.48)',
                'elevation-tooltip':
                    '0px 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.08)',
                'elevation-tooltip-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.04), 0px 0px 0px 1px rgba(255, 255, 255, 0.10), 0px 2px 4px 0px rgba(0, 0, 0, 0.32), 0px 4px 8px 0px rgba(0, 0, 0, 0.32)',
                'elevation-flyout':
                    '0px 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 8px 16px 0px rgba(0, 0, 0, 0.08)',
                'elevation-flyout-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.04), 0px 0px 0px 1px rgba(255, 255, 255, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.32), 0px 8px 16px 0px rgba(0, 0, 0, 0.32)',
                'elevation-modal':
                    '0px 0px 0px 1px #FFF inset, 0px 0px 0px 1.5px rgba(228, 228, 231, 0.60) inset, 0px 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 16px 32px 0px rgba(0, 0, 0, 0.08)',
                'elevation-modal-dark':
                    '0px 0px 0px 1px #18181B inset, 0px 0px 0px 1.5px rgba(255, 255, 255, 0.06) inset, 0px -1px 0px 0px rgba(255, 255, 255, 0.04), 0px 0px 0px 1px rgba(255, 255, 255, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.32), 0px 8px 16px 0px rgba(0, 0, 0, 0.32)',
                'button-neutral': '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
                'button-neutral-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px rgba(39, 39, 42, 1), 0px 0px 1px 1.5px rgba(0, 0, 0, 0.24), 0px 2px 2px 0px rgba(0, 0, 0, 0.24)',
                'button-neutral-focused':
                    '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 0px 2px rgba(255, 255, 255, 1), 0px 0px 0px 4px rgba(59, 130, 246, 0.6)',
                'button-neutral-focused-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px rgba(39, 39, 42, 1), 0px 0px 0px 2px rgba(24, 24, 27, 1), 0px 0px 0px 4px rgba(96, 165, 250, 0.8)',
                'button-danger':
                    '0px 0.75px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px 1px 2px 0px rgba(190, 18, 60, 0.4), 0px 0px 0px 1px rgba(190, 18, 60, 1)',
                'button-danger-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.16), 0px 0px 0px 1px rgba(255, 255, 255, 0.12), 0px 0px 0px 1px rgba(159, 18, 57, 1), 0px 0px 1px 1.5px rgba(0, 0, 0, 0.24), 0px 2px 2px 0px rgba(0, 0, 0, 0.24)',
                'button-danger-focused':
                    '0px 0.75px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px 1px 2px 0px rgba(190, 18, 60, 0.4), 0px 0px 0px 1px rgba(190, 18, 60, 1), 0px 0px 0px 2px rgba(255, 255, 255, 1), 0px 0px 0px 4px rgba(59, 130, 246, 0.6)',
                'button-danger-focused-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.16), 0px 0px 0px 1px rgba(255, 255, 255, 0.12), 0px 0px 0px 1px rgba(159, 18, 57, 1), 0px 0px 0px 2px rgba(24, 24, 27, 1), 0px 0px 0px 4px rgba(96, 165, 250, 0.8)',
                'button-inverted':
                    '0px 0.75px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.4), 0px 0px 0px 1px rgba(24, 24, 27, 1)',
                'button-inverted-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.12), 0px 0px 0px 1px rgba(255, 255, 255, 0.1), 0px 0px 0px 1px rgba(82, 82, 91, 1), 0px 0px 1px 1.5px rgba(0, 0, 0, 0.24), 0px 2px 2px 0px rgba(0, 0, 0, 0.24)',
                'button-inverted-focused':
                    '0px 0.75px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.4), 0px 0px 0px 1px rgba(24, 24, 27, 1), 0px 0px 0px 2px rgba(255, 255, 255, 1), 0px 0px 0px 4px rgba(59, 130, 246, 0.6)',
                'button-inverted-focused-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.12), 0px 0px 0px 1px rgba(255, 255, 255, 0.12), 0px 0px 0px 1px rgba(82, 82, 91, 1), 0px 0px 0px 2px rgba(24, 24, 27, 1), 0px 0px 0px 4px rgba(96, 165, 250, 0.8)',

                'elevation-code-block': '0px 0px 0px 1px #18181B inset, 0px 0px 0px 1.5px rgba(255, 255, 255, 0.20) inset',
                'elevation-code-block-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px #27272A, 0px 1px 2px 0px rgba(0, 0, 0, 0.32), 0px 2px 4px 0px rgba(0, 0, 0, 0.32)',
                active: '0px 0px 0px 3px #E1F0FF',
                'active-dark': '0px 0px 0px 3px #2C2250',
                'border-base': '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
                'border-base-dark':
                    '0px -1px 0px 0px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px rgba(255, 255, 255, 0.06), 0px 0px 0px 1px rgba(39, 39, 42, 1), 0px 0px 1px 1.5px rgba(0, 0, 0, 0.24), 0px 2px 2px 0px rgba(0, 0, 0, 0.24)'
            },
            borderRadius: {
                xxs: '2px',
                xs: '4px',
                sm: '6px',
                DEFAULT: '8px',
                md: '8px',
                lg: '12px',
                xl: '16px'
            },
            lineHeight: {
                DEFAULT: '24px'
            },
            backgroundImage: {
                'code-fade-top-to-bottom': `linear-gradient(180deg, #27272A 0%, rgba(39, 39, 42, 0.00) 100%)`,
                'code-fade-bottom-to-top': `linear-gradient(180deg, rgba(39, 39, 42, 0.00) 0%, #27272A 100%)`,
                'base-code-fade-right-to-left': `linear-gradient(90deg, #18181b7d, #18181B)`,
                'subtle-code-fade-right-to-left': `linear-gradient(90deg, #27272aa3, #27272A)`,
                'code-fade-top-to-bottom-dark': `linear-gradient(180deg, #2F2F32 0%, rgba(47, 47, 50, 0.00) 100%)`,
                'code-fade-bottom-to-top-dark': `linear-gradient(180deg, rgba(47, 47, 50, 0.00) 0%, #2F2F32 100%)`,
                'base-code-fade-right-to-left-dark': `linear-gradient(90deg, #27272aa3, #27272A)`,
                'subtle-code-fade-right-to-left-dark': `linear-gradient(90deg, #30303380, #303033)`,
                'border-dotted': 'linear-gradient(90deg,var(--docs-border-strong) 1px,transparent 1px)'
            },
            screens: {
                xs: '420px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                xxl: '1536px',
                xxxl: '3840px'
            },
            transitionTimingFunction: {
                ease: 'ease'
            },
            width: {
                toc: '221px',
                'sidebar-xs': 'calc(100% - 20px)'
            },
            typography: {
                DEFAULT: {
                    css: {
                        'blockquote p:first-of-type::before': { content: 'none' },
                        'blockquote p:first-of-type::after': { content: 'none' }
                    }
                }
            },
            maxWidth: {
                // sidebar
                'sidebar-xs': 'calc(100% - 20px)',
                'sidebar-sm': '300px',
                'sidebar-md': '300px',
                'sidebar-lg': '221px',
                'sidebar-xl': '221px',
                'sidebar-xxl': '221px',
                'sidebar-xxxl': '221px',
                // main content
                'main-content-xs': '100%',
                'main-content-sm': '100%',
                'main-content-md': '100%',
                'main-content-lg': '751px',
                'main-content-xl': '1007px',
                'main-content-xxl': '1263px',
                'main-content-xxxl': '3567px',
                // inner content
                'inner-content-xs': '100%',
                'inner-content-sm': '100%',
                'inner-content-md': '100%',
                'inner-content-lg': '640px',
                'inner-content-xl': '640px',
                'inner-content-xxl': '640px',
                'inner-content-xxxl': '640px',
                // wide layout
                'wide-content': '1112px',
                'xl-wide-content': '1112px',
                'lg-wide-content': '800px',
                // modal
                'modal-xs': '304px',
                'modal-sm': '624px',
                'modal-md': '752px',
                'modal-lg': '640px'
            },
            minWidth: {
                xl: '1419px'
            },
            fontFamily: {
                base: [
                    'var(--font-inter)',
                    'Inter',
                    'BlinkMacSystemFont',
                    '-apple-system',
                    'Segoe UI',
                    'Roboto',
                    'Oxygen',
                    'Ubuntu',
                    'Cantarell',
                    'Fira Sans',
                    'Droid Sans',
                    'Helvetica Neue',
                    'Helvetica',
                    'Arial',
                    'sans-serif'
                ],
                monospace: [
                    'var(--font-roboto-mono)',
                    'Roboto Mono',
                    'SFMono-Regular',
                    'Menlo',
                    'Monaco',
                    'Consolas',
                    'Liberation Mono',
                    'Courier New',
                    'monospace'
                ],
                display: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
                default: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono, ui-monospace)', 'ui-monospace', 'monospace']
            },
            // spacing: {
            //   px: "1px",
            //   0: "0px",
            //   0.125: "2px",
            //   0.25: "4px",
            //   0.4: "7px",
            //   0.5: "8px",
            //   0.75: "12px",
            //   1: "16px",
            //   1.5: "24px",
            //   2: "32px",
            //   2.5: "40px",
            //   3: "48px",
            //   4: "64px",
            //   5: "80px",
            //   6: "96px",
            //   7: "112px",
            //   8: "128px",
            // },
            fontSize: {
                h1: [
                    '24px',
                    {
                        lineHeight: '125%',
                        fontWeight: '500'
                    }
                ],
                h2: [
                    '18px',
                    {
                        lineHeight: '28px',
                        fontWeight: '500'
                    }
                ],
                h3: [
                    '16px',
                    {
                        lineHeight: '150%',
                        fontWeight: '500'
                    }
                ],
                h4: [
                    '1rem',
                    {
                        lineHeight: '20px',
                        fontWeight: '500'
                    }
                ],
                'compact-x-large-plus': [
                    '18px',
                    {
                        lineHeight: '20px',
                        fontWeight: '500'
                    }
                ],
                'compact-x-large': [
                    '18px',
                    {
                        lineHeight: '20px',
                        fontWeight: '400'
                    }
                ],
                'compact-large-plus': [
                    '16px',
                    {
                        lineHeight: '20px',
                        fontWeight: '500'
                    }
                ],
                'compact-large': [
                    '16px',
                    {
                        lineHeight: '20px',
                        fontWeight: '400'
                    }
                ],
                'compact-medium-plus': [
                    '14px',
                    {
                        lineHeight: '20px',
                        fontWeight: '500'
                    }
                ],
                'compact-medium': [
                    '14px',
                    {
                        lineHeight: '20px',
                        fontWeight: '400'
                    }
                ],
                'compact-small-plus': [
                    '13px',
                    {
                        lineHeight: '20px',
                        fontWeight: '500'
                    }
                ],
                'compact-small': [
                    '13px',
                    {
                        lineHeight: '20px',
                        fontWeight: '400'
                    }
                ],
                'compact-x-small-plus': [
                    '12px',
                    {
                        lineHeight: '20px',
                        fontWeight: '500'
                    }
                ],
                'compact-x-small': [
                    '12px',
                    {
                        lineHeight: '20px',
                        fontWeight: '400'
                    }
                ],
                'x-large-plus': [
                    '18px',
                    {
                        lineHeight: '150%',
                        fontWeight: '500'
                    }
                ],
                'x-large': [
                    '18px',
                    {
                        lineHeight: '150%',
                        fontWeight: '400'
                    }
                ],
                'large-plus': [
                    '16px',
                    {
                        lineHeight: '150%',
                        fontWeight: '500'
                    }
                ],
                large: [
                    '16px',
                    {
                        lineHeight: '150%',
                        fontWeight: '400'
                    }
                ],
                'medium-plus': [
                    '14px',
                    {
                        lineHeight: '150%',
                        fontWeight: '500'
                    }
                ],
                medium: [
                    '14px',
                    {
                        lineHeight: '150%',
                        fontWeight: '400'
                    }
                ],
                small: [
                    '13px',
                    {
                        lineHeight: '150%',
                        fontWeight: '400'
                    }
                ],
                'small-plus': [
                    '13px',
                    {
                        lineHeight: '150%',
                        fontWeight: '500'
                    }
                ],
                'x-small': [
                    '12px',
                    {
                        lineHeight: '150%',
                        fontWeight: '400'
                    }
                ],
                'x-small-plus': [
                    '12px',
                    {
                        lineHeight: '150%',
                        fontWeight: '500'
                    }
                ],
                'code-label': [
                    '12px',
                    {
                        lineHeight: '20px',
                        fontWeight: '400'
                    }
                ],
                'code-body': [
                    '12px',
                    {
                        lineHeight: '150%',
                        fontWeight: '400'
                    }
                ],
                '2xs': [
                    '0.625rem',
                    {
                        lineHeight: '0.875rem'
                    }
                ]
            },
            animation: {
                // Modal
                'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-in': 'fade-in 0.2s ease-out forwards',
                'scale-in-fade': 'scale-in-fade 0.2s ease-out forwards',
                // Popover, Tooltip
                'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-right-fade': 'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                // Sheet
                'slide-in-from-right': 'slide-in-from-right 0.2s ease',
                'slide-out-to-right': 'slide-out-to-right 0.2s ease',
                // Navigation menu
                'enter-from-right': 'enter-from-right 0.15s ease',
                'enter-from-left': 'enter-from-left 0.15s ease',
                'exit-to-right': 'exit-to-right 0.15s ease',
                'exit-to-left': 'exit-to-left 0.15s ease',
                'scale-in-content': 'scale-in-content 0.2s ease',
                'scale-out-content': 'scale-out-content 0.2s ease',
                // Accordion
                'accordion-down': 'accordion-down 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                'accordion-up': 'accordion-up 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                // Custom wiggle animation
                wiggle: 'wiggle 0.75s infinite',
                // Custom spinner animation (for loading-spinner)
                spinner: 'spinner 1.2s linear infinite',
                // Custom blink animation (for loading-dots)
                blink: 'blink 1.4s infinite both',
                // Custom pulse animation
                pulse: 'pulse 1s linear infinite alternate',
                fadeIn: 'fadeIn 500ms',
                fadeOut: 'fadeOut 500ms',
                fadeInDown: 'fadeInDown 500ms',
                fadeInLeft: 'fadeInLeft 500ms',
                fadeInRight: 'fadeInRight 500ms',
                fadeOutUp: 'fadeOutUp 500ms',
                fadeOutLeft: 'fadeOutLeft 500ms',
                fadeOutRight: 'fadeOutRight 500ms',
                tada: 'tada 1s',
                slideInRight: 'slideInRight 500ms',
                slideOutRight: 'slideOutRight 150ms',
                slideOutUp: 'slideOutUp 500ms',
                slideInLeft: 'slideInLeft 500ms',
                slideOutLeft: 'slideOutLeft 500ms',
                slideInDown: 'slideInDown 150ms',
                pulsingDots: 'pulsingDots 1s alternate infinite',
                minimize: 'minimize 500ms',
                maximize: 'maximize 500ms',
                flash: 'flash 1500ms 1',
                growWidth: 'growWidth 500ms'
            },
            scrollMargin: {
                56: '56px'
            },
            keyframes: {
                // Modal
                'scale-in': {
                    '0%': { transform: 'scale(0.95)' },
                    '100%': { transform: 'scale(1)' }
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'scale-in-fade': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                // Popover, Tooltip
                'slide-up-fade': {
                    '0%': { opacity: '0', transform: 'translateY(var(--offset, 2px))' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'slide-right-fade': {
                    '0%': { opacity: '0', transform: 'translateX(var(--offset, -2px))' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                'slide-down-fade': {
                    '0%': { opacity: '0', transform: 'translateY(var(--offset, -2px))' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'slide-left-fade': {
                    '0%': { opacity: '0', transform: 'translateX(var(--offset, 2px))' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                // Sheet
                'slide-in-from-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' }
                },
                'slide-out-to-right': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(100%)' }
                },
                // Navigation menu
                'enter-from-right': {
                    '0%': { transform: 'translateX(200px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' }
                },
                'enter-from-left': {
                    '0%': { transform: 'translateX(-200px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' }
                },
                'exit-to-right': {
                    '0%': { transform: 'translateX(0)', opacity: '1' },
                    '100%': { transform: 'translateX(200px)', opacity: '0' }
                },
                'exit-to-left': {
                    '0%': { transform: 'translateX(0)', opacity: '1' },
                    '100%': { transform: 'translateX(-200px)', opacity: '0' }
                },
                'scale-in-content': {
                    '0%': { transform: 'rotateX(-30deg) scale(0.9)', opacity: '0' },
                    '100%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' }
                },
                'scale-out-content': {
                    '0%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' },
                    '100%': { transform: 'rotateX(-10deg) scale(0.95)', opacity: '0' }
                },
                // Accordion
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                // Custom wiggle animation
                wiggle: {
                    '0%, 100%': {
                        transform: 'translateX(0%)',
                        transformOrigin: '50% 50%'
                    },
                    '15%': { transform: 'translateX(-4px) rotate(-4deg)' },
                    '30%': { transform: 'translateX(6px) rotate(4deg)' },
                    '45%': { transform: 'translateX(-6px) rotate(-2.4deg)' },
                    '60%': { transform: 'translateX(2px) rotate(1.6deg)' },
                    '75%': { transform: 'translateX(-1px) rotate(-0.8deg)' }
                },
                // Custom spinner animation (for loading-spinner)
                spinner: {
                    '0%': {
                        opacity: '1'
                    },
                    '100%': {
                        opacity: '0'
                    }
                },
                // Custom blink animation (for loading-dots)
                blink: {
                    '0%': {
                        opacity: '0.2'
                    },
                    '20%': {
                        opacity: '1'
                    },
                    '100%': {
                        opacity: '0.2'
                    }
                },
                // Custom pulse animation
                pulse: {
                    from: {
                        opacity: '0'
                    },
                    to: {
                        opacity: '1'
                    }
                },
                tada: {
                    from: {
                        transform: 'scale3d(1, 1, 1)'
                    },
                    '10%, 20%': {
                        transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)'
                    },
                    '30%, 50%, 70%, 90%': {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)'
                    },
                    '40%, 60%, 80%': {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
                    },
                    to: {
                        transform: 'scale3d(1, 1, 1)'
                    }
                },
                fadeInDown: {
                    from: {
                        opacity: '0',
                        transform: 'translate3d(0, -100%, 0)'
                    },
                    to: {
                        opacity: '1',
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                fadeInLeft: {
                    from: {
                        opacity: '0',
                        transform: 'translate3d(-100%, 0, 0)'
                    },
                    to: {
                        opacity: '1',
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                fadeInRight: {
                    from: {
                        opacity: '0',
                        transform: 'translate3d(100%, 0, 0)'
                    },
                    to: {
                        opacity: '1',
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                fadeOutUp: {
                    from: {
                        opacity: '1'
                    },
                    to: {
                        opacity: '0',
                        transform: 'translate3d(0, -100%, 0)'
                    }
                },
                fadeOutLeft: {
                    from: {
                        opacity: '1'
                    },
                    to: {
                        opacity: '0',
                        transform: 'translate3d(-100%, 0, 0)'
                    }
                },
                fadeOutRight: {
                    from: {
                        opacity: '1'
                    },
                    to: {
                        opacity: '0',
                        transform: 'translate3d(100%, 0, 0)'
                    }
                },
                slideInRight: {
                    from: {
                        transform: 'translate3d(100%, 0, 0)',
                        visibility: 'visible'
                    },
                    to: {
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                slideOutRight: {
                    from: {
                        transform: 'translate3d(0, 0, 0)'
                    },
                    to: {
                        visibility: 'hidden',
                        transform: 'translate3d(100%, 0, 0)'
                    }
                },
                slideInLeft: {
                    from: {
                        transform: 'translate3d(-100%, 0, 0)',
                        visibility: 'visible'
                    },
                    to: {
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                slideOutLeft: {
                    from: {
                        transform: 'translate3d(0, 0, 0)'
                    },
                    to: {
                        visibility: 'hidden',
                        transform: 'translate3d(-100%, 0, 0)'
                    }
                },
                pulsingDots: {
                    '0%': {
                        opacity: '1'
                    },
                    '100%': {
                        opacity: '0.3'
                    }
                },
                minimize: {
                    from: {
                        transform: 'scale(1)'
                    },
                    to: {
                        transform: 'scale(0)'
                    }
                },
                maximize: {
                    from: {
                        transform: 'scale(0)'
                    },
                    to: {
                        transform: 'scale(1)'
                    }
                },
                flash: {
                    '0%': {
                        backgroundColor: 'transparent'
                    },
                    '50%': {
                        backgroundColor: 'var(--animation-color)'
                    },
                    '100%': {
                        backgroundColor: 'transparent'
                    }
                },
                slideInDown: {
                    from: {
                        transform: 'translate3d(0, -100%, 0)',
                        visibility: 'visible'
                    },
                    to: {
                        transform: 'translate3d(0, 0, 0)'
                    }
                },
                slideOutUp: {
                    from: {
                        transform: 'translate3d(0, 0, 0)'
                    },
                    to: {
                        transform: 'translate3d(0, -100%, 0)',
                        visibility: 'hidden'
                    }
                },
                growWidth: {
                    from: {
                        width: '0'
                    },
                    to: {
                        width: '100%'
                    }
                }
            },
            dropShadow: {
                'card-hover': ['0 8px 12px #222A350d', '0 32px 80px #2f30370f']
            }
        }
    },
    animationDelay: {
        0: '0ms',
        200: '200ms',
        400: '400ms'
    },
    plugins: [forms, typography, radix]
}

export default config
