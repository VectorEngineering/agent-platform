import Link from 'next/link'
import React from 'react'
import { SquareDashedMousePointer } from 'lucide-react'
import { cn } from '@/lib/utils'

function Logo({ fontSize = 'text-lg', iconSize = 10 }: { fontSize?: string; iconSize?: number }) {
    return (
        <Link href='/' className={cn('text-2xl font-extrabold flex items-center gap-2', fontSize)}>
            <div className='rounded-xl bg-primary p-2'>
                <SquareDashedMousePointer size={iconSize} className='stroke-white' />
            </div>
        </Link>
    )
}

export default Logo
