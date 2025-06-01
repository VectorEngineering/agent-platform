'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SignedIn, UserButton } from '@clerk/nextjs'

import { AppSidebar } from '@/components/app-sidebar'
import { ModeToggle } from '@/components/ThemeModeToggle'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

function DynamicBreadcrumb() {
    const pathname = usePathname()
    const paths = pathname.split('/').filter(Boolean)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/' className='text-muted-foreground hover:text-foreground'>
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {paths.map((path, index) => (
                    <React.Fragment key={path}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {index === paths.length - 1 ? (
                                <BreadcrumbPage className='capitalize'>{path.replace(/-/g, ' ')}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink
                                    href={`/${paths.slice(0, index + 1).join('/')}`}
                                    className='text-muted-foreground hover:text-foreground capitalize'
                                >
                                    {path.replace(/-/g, ' ')}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-screen bg-background'>
            <SidebarProvider>
                <AppSidebar className='hidden md:flex' />
                <SidebarInset className='flex-1'>
                    <header className='sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                        <div className='flex items-center gap-2 px-4'>
                            {/* <SidebarTrigger className="-ml-1 hover:bg-accent/50" /> */}
                            <Separator orientation='vertical' className='h-4' />
                            <DynamicBreadcrumb />
                        </div>
                        <div className='flex items-center gap-2 px-4'>
                            <ModeToggle />
                            <Separator orientation='vertical' className='h-6 hidden md:block' />
                            <SignedIn>
                                <UserButton
                                    appearance={{
                                        elements: {
                                            userButtonBox: 'h-8 w-8 md:h-9 md:w-9',
                                            userButtonTrigger:
                                                'h-8 w-8 md:h-9 md:w-9 ring-enterprise-200 hover:ring-2 transition-all duration-200',
                                            userButtonPopoverCard: 'shadow-enterprise backdrop-blur-sm bg-background/95',
                                            userPreviewMainIdentifier: 'font-enterprise text-foreground',
                                            userPreviewSecondaryIdentifier: 'text-muted-foreground'
                                        }
                                    }}
                                />
                            </SignedIn>
                        </div>
                    </header>
                    <main className='flex-1 justify-center items-center p-4 md:p-6 lg:p-8 px-4 sm:px-6 lg:px-8'>{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default Layout
