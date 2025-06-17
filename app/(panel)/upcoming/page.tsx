import CallList from '@/components/CallList'
import React from 'react'

type Props = {}

const UpcomingPage = (props: Props) => {
    return (
        <section className='flex size-full flex-col gap-10'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
                Upcoming Meetings
            </h1>
            <CallList type='upcoming' />
        </section>
    )
}

export default UpcomingPage