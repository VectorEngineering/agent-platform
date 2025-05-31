import { Text } from '@react-email/text'
// biome-ignore lint/style/useImportType: not just the type
import * as React from 'react'

/**
 * Props interface for the Signature component
 * @interface SignatureProps
 * @property {string} signedBy - The name of the person signing the email
 */
interface SignatureProps {
    signedBy: string
}

/**
 * Email signature component that provides a consistent signature format
 * This component renders a friendly closing signature for email templates.
 *
 * @component
 * @param {SignatureProps} props - Component props
 * @param {string} props.signedBy - The name to display in the signature
 *
 * @example
 * ```tsx
 * <Signature signedBy="John Doe" />
 * ```
 *
 * @returns {JSX.Element} A React Email component with formatted signature
 *
 * @remarks
 * The signature includes:
 * - A friendly "Cheers" closing
 * - The signer's name on a new line
 * - Consistent font styling (semi-bold)
 */
export const Signature: React.FC<SignatureProps> = ({ signedBy }) => (
    <Text className='font-semibold'>
        Cheers,
        <br />
        {signedBy}
    </Text>
)
