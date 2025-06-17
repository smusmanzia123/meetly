import React from 'react'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

type Props = {
    isOpen: boolean
    onClose: () => void
    title: string
    className?: string
    buttonText?: string
    handleClick?: () => void
    children?: React.ReactNode
    icon?: React.ReactNode
    buttonIcon?: React.ReactNode
}

const MeetingModal = (props: Props) => {
    return (
        <Dialog open={props.isOpen} onOpenChange={props.onClose}>
            <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none px-6 py-9'>
                <div className='flex flex-col gap-6'>
                    {props.icon && (
                        <div className='flex justify-center'>
                            {props.icon}
                        </div>
                    )}
                    <DialogTitle className={cn('text-3xl font-bold leading-[42px]', props.className)}>{props.title}</DialogTitle>
                    {props.children}
                    <Button className='bg-primary focus-visible:ring-0 focus-visible:ring-offset-0' onClick={props.handleClick}>
                        {props.buttonIcon && props.buttonIcon} &nbsp;
                        {props.buttonText || 'Schedule Meeting'}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MeetingModal