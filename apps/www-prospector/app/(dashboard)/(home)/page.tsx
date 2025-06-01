import { CirclePlayIcon, CoinsIcon, LucideProps, WaypointsIcon } from 'lucide-react'
import React, { FC, Suspense } from 'react'

import CreditUsageChart from '@/app/(dashboard)/billing/_components/CreditUsageChart'
import ExecutionStatusChart from '@/app/(dashboard)/(home)/_components/ExecutionStatusChart'
import { GetCreditUsageInPeriod } from '@/actions/analytics/getCreditUsageInperiod'
import { GetPeriods } from '@/actions/analytics/getPeriods'
import { GetStatsCardsValues } from '@/actions/analytics/getStatsCardsValues'
import { GetWorkflowExecutionStats } from '@/actions/analytics/getWorkflowExecutionStats'
import { Period } from '@/types/analytics'
import PeriodSelector from '@/app/(dashboard)/(home)/_components/PeriodSelector'
import { Skeleton } from '@/components/ui/skeleton'
import StatsCard from '@/app/(dashboard)/(home)/_components/StatsCard'
import { waitFor } from '@/lib/helper/waitFor'

function HomePage({ searchParams }: { searchParams: { month?: string; year?: string } }) {
    const currentDate = new Date()
    const { month, year } = searchParams
    const period: Period = {
        month: month ? parseInt(month) : currentDate.getMonth(),
        year: year ? parseInt(year) : currentDate.getFullYear()
    }
    return (
        <div className='flex flex-1 flex-col h-full'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Home</h1>
                <Suspense fallback={<Skeleton className='w-[180px] h-[40px]' />}>
                    <PeriodSelectorWrapper selectedPeriod={period} />
                </Suspense>
            </div>
            <div className='h-full py-6 flex flex-col gap-4'>
                <Suspense fallback={<StatsCardSkeleton />}>
                    <StatsCards selectedPeriod={period} />
                </Suspense>
                <Suspense fallback={<Skeleton className='w-full h-[300px]' />}>
                    <StatsExecutionStatus selectedPeriod={period} />
                </Suspense>
                <Suspense fallback={<Skeleton className='w-full h-[300px]' />}>
                    <CreditsUsageInPeriod selectedPeriod={period} />
                </Suspense>
            </div>
        </div>
    )
}

async function PeriodSelectorWrapper({ selectedPeriod }: { selectedPeriod: Period }) {
    const periods = await GetPeriods()
    return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
    const data = await GetStatsCardsValues(selectedPeriod)
    return (
        <div className='grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]'>
            <StatsCard title='Workflow executions' value={data.workflowExecutions} icon={CirclePlayIcon as FC<LucideProps>} />
            <StatsCard title='Phase executions' value={data.phaseExecutions} icon={WaypointsIcon as FC<LucideProps>} />
            <StatsCard title='Credits consumed' value={data.creditsConsumed} icon={CoinsIcon as FC<LucideProps>} />
        </div>
    )
}

function StatsCardSkeleton() {
    return (
        <div className='grid gap-3 lg:gap-8 lg:grid-cols-3'>
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} className='w-full min-h-[120px]' />
            ))}
        </div>
    )
}

async function StatsExecutionStatus({ selectedPeriod }: { selectedPeriod: Period }) {
    const data = await GetWorkflowExecutionStats(selectedPeriod)
    return <ExecutionStatusChart data={data} />
}

async function CreditsUsageInPeriod({ selectedPeriod }: { selectedPeriod: Period }) {
    const data = await GetCreditUsageInPeriod(selectedPeriod)
    return <CreditUsageChart data={data} title='Daily credits spent' description='Daily credit consumed in selected period' />
}
export default HomePage
