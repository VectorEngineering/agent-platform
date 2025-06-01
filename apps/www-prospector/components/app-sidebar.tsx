'use client'

import * as React from 'react'

import {
    BellIcon,
    Building2Icon,
    CoinsIcon,
    Command,
    CreditCardIcon,
    HomeIcon,
    KeyIcon,
    Layers2Icon,
    Settings2,
    ShieldCheckIcon,
    UserIcon,
    UsersIcon
} from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarRail } from '@/components/ui/sidebar'

import Logo from '@/components/Logo'
import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { NavUser } from '@/components/nav-user'
import { Separator } from '@/components/ui/separator'
import { TeamSwitcher } from '@/components/team-switcher'
import UserAvailableCreditsBadge from '@/components/UserAvailableCreditsBadge'
import { cn } from '@/lib/utils'

const navItems = [
    {
        title: 'Home',
        url: '/',
        icon: HomeIcon,
        isActive: true,
        items: [
            {
                title: 'Home',
                url: '/'
            }
        ]
    },
    {
        title: 'Workflows',
        url: '/workflows',
        icon: Layers2Icon,
        items: [
            {
                title: 'All Workflows',
                url: '/workflows'
            }
        ]
    },
    {
        title: 'Credentials',
        url: '/credentials',
        icon: ShieldCheckIcon,
        items: [
            {
                title: 'OAuth',
                url: '/credentials'
            },
            {
                title: 'API Keys',
                url: '/credentials/api-keys'
            }
        ]
    },
    {
        title: 'Billing',
        url: '/billing',
        icon: CoinsIcon,
        items: [
            {
                title: 'Usage',
                url: '/billing'
            },
            {
                title: 'Invoices',
                url: '/billing/invoices'
            },
            {
                title: 'Plans',
                url: '/billing/plans'
            }
        ]
    }
]

const teams = [
    {
        name: 'Personal',
        logo: Command,
        plan: 'Pro'
    },
    {
        name: 'Team',
        logo: Layers2Icon,
        plan: 'Enterprise'
    }
]

const workspaceSettings = [
    {
        title: 'Workspace',
        url: '/workspace',
        icon: Building2Icon,
        items: [
            {
                title: 'General',
                url: '/workspace/settings'
            },
            {
                title: 'Members',
                url: '/workspace/members'
            },
            {
                title: 'Billing',
                url: '/workspace/billing'
            },
            {
                title: 'API Keys',
                url: '/workspace/api-keys'
            }
        ]
    }
]

const userSettings = [
    {
        title: 'User Settings',
        url: '/settings',
        icon: UserIcon,
        items: [
            {
                title: 'Profile',
                url: '/settings/profile'
            },
            {
                title: 'Security',
                url: '/settings/security'
            },
            {
                title: 'Notifications',
                url: '/settings/notifications'
            },
            {
                title: 'Billing',
                url: '/settings/billing'
            },
            {
                title: 'Teams',
                url: '/settings/teams'
            }
        ]
    }
]

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar
            collapsible='icon'
            className={cn('border-r bg-sidebar', 'transition-all duration-300 ease-enterprise', className)}
            {...props}
        >
            <SidebarHeader className='px-4 py-3'>
                <div className='flex items-center gap-2'>
                    <Logo />
                </div>
                <div className='mt-3'>
                    <UserAvailableCreditsBadge />
                </div>
            </SidebarHeader>

            <SidebarContent className='px-2'>
                <NavMain items={navItems} />
                <div className='my-2 border-sidebar-border/50' />
            </SidebarContent>

            <SidebarFooter>
                <div className='px-2 py-2'>
                    <TeamSwitcher teams={teams} />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
