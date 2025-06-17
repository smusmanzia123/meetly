"use client"
import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { LayoutList, MoreHorizontalIcon, User } from 'lucide-react'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'

type Props = {}

type CallLayoutType = 'speaker-left' | 'speaker-right' | 'grid'


const MeetingRoom = (props: Props) => {
    const searchParams = useSearchParams()
    const isPersonalRoom = !!searchParams.get('personal')
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false)
    const { useCallCallingState } = useCallStateHooks()
    const callingState = useCallCallingState()

    if (callingState !== CallingState.JOINED) return <Loader />

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />

            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />

            default:
                return <SpeakerLayout participantsBarPosition="right" />


        }
    }
    return (
        <section className='relative h-screen w-full overflow-hidden pt-4'>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout />
                </div>
                <div className={cn('h-[calc(100vh-86px)] ml-2 transition-all duration-300 ease-in-out', {
                    'block': showParticipants,
                    'hidden': !showParticipants,
                })}>

                    <CallParticipantsList onClose={() => setShowParticipants(false)} /></div>
            </div>
            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
                <CallControls />

                <DropdownMenu>

                    <DropdownMenuTrigger asChild className='cursor-pointer'>
                        <Button className="flex items-center rounded-2xl p-2 px-4 bg-primary  transition-all duration-300">
                            <LayoutList size={20} className="text-white" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}>
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <Button size={'icon'} onClick={() => setShowParticipants((prev) => !prev)}>
                    <User size={20} />
                </Button>
                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    )
}

export default MeetingRoom