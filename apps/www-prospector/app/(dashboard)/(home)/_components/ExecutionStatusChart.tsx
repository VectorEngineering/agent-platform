'use client'

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegendContent, ChartTooltipContent } from '@/components/ui/chart'

import { GetWorkflowExecutionStats } from '@/actions/analytics/getWorkflowExecutionStats'
import { Layers2 } from 'lucide-react'
import React from 'react'

type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionStats>>
const chartConfig = {
    success: {
        label: 'Success',
        color: 'hsl(var(--chart-2))'
    },
    failed: {
        label: 'Failed',
        color: 'hsl(var(--chart-1))'
    }
}

const AreaChartComponent = AreaChart as unknown as React.FC<any>
const ResponsiveContainerComponent = ResponsiveContainer as unknown as React.FC<any>
const XAxisComponent = XAxis as unknown as React.FC<any>
const LegendComponent = Legend as unknown as React.FC<any>
const TooltipComponent = Tooltip as unknown as React.FC<any>
const AreaComponent = Area as unknown as React.FC<any>
const Layers2Component = Layers2 as unknown as React.FC<any>

export default function ExecutionStatusChart({ data }: { data: ChartData }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-bold flex items-center gap-2'>
                    <Layers2Component className='w-6 h-6 text-primary' />
                    Workflow execution status
                </CardTitle>
                <CardDescription>Daily number of successfull and failed workflow executions</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className='max-h-[200px] w-full'>
                    <ResponsiveContainerComponent width='100%' height={300}>
                        <AreaChartComponent data={data} margin={{ top: 20 }}>
                            <CartesianGrid vertical={false} />
                            <XAxisComponent
                                dataKey={'date'}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value: string) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })
                                }}
                            />
                            <LegendComponent content={<ChartLegendContent />} />
                            <TooltipComponent content={<ChartTooltipContent className='w-[250px]' />} />
                            <AreaComponent
                                min={0}
                                type={'bump'}
                                fillOpacity={0.6}
                                fill='var(--color-success)'
                                stroke='var(--color-success)'
                                dataKey={'success'}
                                stackId={'a'}
                            />
                            <AreaComponent
                                min={0}
                                type={'bump'}
                                fillOpacity={0.6}
                                fill='var(--color-failed)'
                                stroke='var(--color-failed)'
                                dataKey={'failed'}
                                stackId={'a'}
                            />
                        </AreaChartComponent>
                    </ResponsiveContainerComponent>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
