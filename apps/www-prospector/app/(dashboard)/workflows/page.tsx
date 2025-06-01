import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, InboxIcon, Workflow } from 'lucide-react'
import React, { Suspense } from 'react'

import CreateWorkflowDialog from '@/app/(dashboard)/workflows/_components/CreateWorkflowDialog'
import { GetWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser'
import { Skeleton } from '@/components/ui/skeleton'
import WorkflowCard from '@/app/(dashboard)/workflows/_components/WorkflowCard'

function page() {
    return (
        <div className='flex-1 flex flex-col h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 border-b'>
                <div className='flex flex-col space-y-1'>
                    <h1 className='text-4xl font-bold tracking-tight'>Workflows</h1>
                    <p className='text-muted-foreground text-lg'>Create and manage your automation workflows</p>
                </div>
                <div className='mt-4 sm:mt-0'>
                    <CreateWorkflowDialog />
                </div>
            </div>

            <div className='flex-1 py-8'>
                <Suspense fallback={<UserWorkflowsSkeleton />}>
                    <UserWorkflows />
                </Suspense>
            </div>
        </div>
    )
}

function UserWorkflowsSkeleton() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className='h-[200px] w-full rounded-xl' />
            ))}
        </div>
    )
}

async function UserWorkflows() {
    const workflows = await GetWorkflowsForUser()

    if (!workflows) {
        return (
            <Alert variant={'destructive'} className='max-w-2xl mx-auto'>
                <AlertCircle className='w-5 h-5' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong while fetching your workflows. Please try again later.</AlertDescription>
            </Alert>
        )
    }

    if (workflows.length === 0) {
        return (
            <div className='flex flex-col gap-6 h-[400px] items-center justify-center bg-accent/10 rounded-2xl border-2 border-dashed border-accent'>
                <div className='rounded-full bg-accent/20 w-24 h-24 flex items-center justify-center backdrop-blur-sm'>
                    <Workflow className='w-12 h-12 text-primary' />
                </div>
                <div className='flex flex-col gap-2 text-center max-w-md'>
                    <h3 className='text-xl font-semibold'>No workflows yet</h3>
                    <p className='text-muted-foreground'>Create your first workflow to start automating your tasks and processes</p>
                </div>
                <CreateWorkflowDialog triggerText='Create your first workflow' />
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {workflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
        </div>
    )
}

export default page
