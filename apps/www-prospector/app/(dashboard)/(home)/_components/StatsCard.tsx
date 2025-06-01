import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { LucideProps } from 'lucide-react'
import React from 'react'
import ReactCountUpWrapper from '@/components/ReactCountUpWrapper'

interface Props {
    title: string
    value: number
    icon: React.ElementType<LucideProps>
}

export default function StatsCard(props: Props) {
    const Icon = props.icon
    return (
        <Card className='relative overflow-hidden h-full'>
            <CardHeader className='flex pb-2'>
                <CardTitle>{props.title}</CardTitle>
                <Icon size={120} className='text-muted-foreground absolute -bottom-4 -right-8 stroke-primary opacity-10' />
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold text-primary'>
                    <ReactCountUpWrapper value={props.value} />
                </div>
            </CardContent>
        </Card>
    )
}
