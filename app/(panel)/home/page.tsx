import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'

type Props = {}

const HomePage = (props: Props) => {
    const now = new Date()
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now))
    return (
        <section className='flex flex-col gap-10'>
            <div className='h-[270px] w-full bg-accent/30 backdrop-blur-md rounded-3xl shadow-lg'>
                <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                    <h2 className='max-w-[270px] rounded py-2 text-center text-base font-normal bg-primary/10 text-primary'>Upcoming Meeting at: 12:30 PM</h2>
                    <div className='flex flex-col gap-2 '>
                        <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
                        <p className='text-lg font-medium lg:text-2xl'>{date}</p>
                    </div>
                </div>
            </div>
            <MeetingTypeList />
        </section>
    )
}

export default HomePage