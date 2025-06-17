'use client'
import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Plus } from 'lucide-react'

type Props = {
    icon: React.ReactNode
    title: string
    description: string
    handleClick: () => void
}

const HomeCard = ({ icon, title, description, handleClick }: Props) => {
    return (
        <Card className='min-h-[270px] cursor-pointer hover:bg-accent/30 transition-all duration-300 bg-accent/20 backdrop-blur-md border border-white/10 shadow-lg' onClick={handleClick}>
            <CardHeader className='flex-1 flex items-start justify-start'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    {icon}
                </div>
            </CardHeader>
            <CardFooter className='flex flex-col items-start gap-2'>
                <CardTitle className='text-2xl font-bold'>
                    {title}
                </CardTitle>
                <CardDescription className='text-base'>
                    {description}
                </CardDescription>
            </CardFooter>
        </Card>
    )
}

export default HomeCard