import type { Config } from 'tailwindcss'

const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            display: '350'
        },
        extend: {
            borderColor: {
                DEFAULT: 'rgb(0 0 0 / 0.07)'
            },
            boxShadow: {
                DEFAULT: '`0 0px 15px rgba(0 0 0 / 0.04), 0 0px 2px rgba(0 0 0 / 0.06)`',
                lg: '0 0px 20px rgba(0 0 0 / 0.04), 0 0px 5px rgba(0 0 0 / 0.06)',
                xl: '0 0px 30px rgba(0 0 0 / 0.04), 0 0px 10px rgba(0 0 0 / 0.06)',
                hidden: '0 1px 8px rgb(0 0 0 / 0), 0 0.5px 2.5px rgb(0 0 0 / 0)',
                up: '-2px -2px 22px 0px rgba(61, 84, 171, 0.15)',
                '3xl': '0 0 50px rgba(0 0 0 / 0.02), 0 0 50px rgba(0 0 0 / 0.04)'
            },
            colors: {
                cream: '#F5F5F5',
                gravel: '#4E4E4E',
                iridium: '#3F3F3F',
                orange: '#FFA947',
                peach: '#FFE0BD',
                platinum: '#E6E6E6',
                ghost: '#CDCDCD',
                grandis: '#FFC989',
                porcelain: '#F1F1F1',
                ironside: '#636363',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                polar: {
                    '50': 'hsl(233, 8%, 85%)',
                    '100': 'hsl(233, 8%, 79%)',
                    '200': 'hsl(233, 8%, 68%)',
                    '300': 'hsl(233, 8%, 57%)',
                    '400': 'hsl(233, 8%, 46%)',
                    '500': 'hsl(233, 8%, 36%)',
                    '600': 'hsl(233, 8%, 15%)',
                    '700': 'hsl(233, 8%, 12%)',
                    '800': 'hsl(233, 8%, 9%)',
                    '900': 'hsl(233, 8%, 6%)',
                    '950': 'hsl(233, 8%, 3%)'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                'caret-blink': {
                    '0%,70%,100%': {
                        opacity: '1'
                    },
                    '20%,50%': {
                        opacity: '0'
                    }
                },
                'open-sidebar': {
                    from: {
                        width: '60px'
                    },
                    to: {
                        width: '300px'
                    }
                },
                'close-sidebar': {
                    from: {
                        width: '300px'
                    },
                    to: {
                        width: '60px'
                    }
                },
                'fade-in': {
                    from: {
                        opacity: '0'
                    },
                    to: {
                        opacity: '1'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'caret-blink': 'caret-blink 1.25s ease-out infinite',
                'open-sidebar': 'open-sidebar 0.2s ease-out',
                'close-sidebar': 'close-sidebar 0.2s ease-out',
                'fade-in': 'fade-in 0.2s ease-out'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
