import CallList from '@/components/CallList'
import React from 'react'

type Props = {}

const PreviousPage = (props: Props) => {
    return (
        <section className='flex size-full flex-col gap-10'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
                Previous Meetings
            </h1>
            <CallList type='ended' />
        </section>
    )
}

export default PreviousPage