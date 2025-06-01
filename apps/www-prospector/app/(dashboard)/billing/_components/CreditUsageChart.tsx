'use client'

import * as React from 'react'

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { ChartColumnStackedIcon } from 'lucide-react'
import { ChartContainer } from '@/components/ui/chart'
import { GetCreditUsageInPeriod } from '@/actions/analytics/getCreditUsageInperiod'

type ChartData = Awaited<ReturnType<typeof GetCreditUsageInPeriod>>

const chartConfig = {
    success: {
        label: 'Successfull Phases Credits',
        color: 'hsl(var(--chart-2))'
    },
    failed: {
        label: 'Failed Phases Credits',
        color: 'hsl(var(--chart-1))'
    }
}

const CreditUsageChart: React.FC<{ data: ChartData; title: string; description: string }> = ({ data, title, description }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl font-bold flex items-center gap-2'>
                    <ChartColumnStackedIcon className='w-6 h-6 text-primary' />
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className='max-h-[200px] w-full'>
                    <BarChart data={data} height={200} accessibilityLayer margin={{ top: 20 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={'date'}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })
                            }}
                        />
                        <Legend />
                        <Tooltip />
                        <Bar
                            fillOpacity={0.8}
                            radius={[0, 0, 4, 4]}
                            fill='var(--color-success)'
                            stroke='var(--color-success)'
                            dataKey={'success'}
                            stackId={'a'}
                        />
                        <Bar
                            fillOpacity={0.8}
                            radius={[4, 4, 0, 0]}
                            fill='var(--color-failed)'
                            stroke='var(--color-failed)'
                            dataKey={'failed'}
                            stackId={'a'}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
export default CreditUsageChart
