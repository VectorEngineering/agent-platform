import { Body } from '@react-email/body'
import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Html } from '@react-email/html'
import { Link } from '@react-email/link'
import { Section } from '@react-email/section'
import { Tailwind } from '@react-email/tailwind'
import { Text } from '@react-email/text'
// biome-ignore lint/style/useImportType: need access to `children`, not just the type
import type { ReactNode } from 'react'
import * as React from 'react'
import CONSTANTS from '../../constants/constants'

/**
 * Props interface for the Layout component
 * @interface LayoutProps
 * @property {ReactNode} children - The content to be rendered within the layout
 */
interface LayoutProps {
    children: ReactNode
}

/**
 * Layout component that provides a consistent structure for all email templates
 * This component wraps email content with common styling and footer elements.
 *
 * @component
 * @param {LayoutProps} props - Component props
 * @param {ReactNode} props.children - The email-specific content to render
 *
 * @example
 * ```tsx
 * <Layout>
 *   <Text>Your email content here</Text>
 * </Layout>
 * ```
 *
 * @returns {JSX.Element} A React Email component with consistent layout structure
 *
 * @remarks
 * The layout includes:
 * - Tailwind CSS styling
 * - Responsive container structure
 * - White background with consistent padding
 * - Social media footer with links to:
 *   - X (Twitter)
 *   - Discord
 *   - GitHub
 * - Consistent font styling (sans-serif)
 * - Proper HTML email structure
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => (
    <Html>
        <Tailwind>
            <Head />
            <Body className='bg-white font-sans text-zinc-800'>
                <Container className='container mx-auto p-6'>
                    <Section className='mx-auto p-6 bg-gray-50'>{children}</Section>
                    <Section className='container mx-auto p-6 text-center font-semibold'>
                        <Text>
                            Connect with us on social media!
                            <br />
                            <Link href={CONSTANTS.URLS.X}>X (formerly Twitter)</Link> | <Link href={CONSTANTS.URLS.DISCORD}>Discord</Link> |{' '}
                            <Link href={CONSTANTS.URLS.GITHUB}>GitHub</Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
)
