import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Video } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from './mode-toggle'

type Props = {}

const TopNav = (props: Props) => {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 hidden md:flex" />
                <div className="flex md:hidden items-center gap-2">
                    <Video className="h-6 w-6" />
                    <span className="font-semibold">Meetly</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <UserButton afterSignOutUrl="/sign-in" />
                    <ModeToggle />
                    <div className="block md:hidden">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopNav