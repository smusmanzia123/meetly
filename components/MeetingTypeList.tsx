'use client'
import React, { useState } from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Calendar, CheckCircle, Copy, Plus, User, Video } from 'lucide-react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from 'sonner'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'

type Props = {}



const MeetingTypeList = (props: Props) => {
    const router = useRouter();
    const [meetingType, setMeetingType] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
        title: '',
    })

    const [callDetails, setCallDetails] = useState<Call>()

    const { user } = useUser();

    const client = useStreamVideoClient();

    const createMeeting = async () => {
        if (!client || !user) {
            toast.error('Stream client or user not initialized');
            return;
        }

        try {
            if (!values.dateTime) {
                toast.error('Please select a date and time');
                return;
            }

            const id = crypto.randomUUID();
            console.log('Creating call with ID:', id);

            const call = client.call('default', id);
            if (!call) {
                throw new Error('Failed to create call instance');
            }

            const startsAt = values.dateTime.toISOString() || new Date().toISOString();
            const description = values.description || 'Instant Meeting';

            console.log('Creating call with data:', {
                startsAt,
                description,
                userId: user.id
            });

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    }
                }
            });

            console.log('Call created successfully');
            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }

        } catch (error) {
            console.error('Failed to create meeting:', error);
            toast.error('Failed to create meeting. Please try again.');
        }
    }
    const meetingLink = `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${callDetails?.id}`
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard icon={<Plus />} title='New Meeting' description='Start an instant meeting' handleClick={() => setMeetingType('isInstantMeeting')} />
            <HomeCard icon={<Calendar />} title='Schedule Meeting' description='Plan a meetig' handleClick={() => setMeetingType('isScheduleMeeting')} />
            <HomeCard icon={<Video />} title='View Recordings' description='Check out your recordings' handleClick={() => {
                router.push('/recordings')
            }} />
            <HomeCard icon={<User />} title='Join Meeting' description='via invitation link' handleClick={() => setMeetingType('isJoiningMeeting')} />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingType === 'isScheduleMeeting'}
                    onClose={() => setMeetingType(undefined)}
                    title="Create Meeting"
                    className="text-center"
                    handleClick={createMeeting}>
                    <div className='flex flex-col gap-2.5'>
                        <Label>Add a description</Label>
                        <Textarea onChange={(e) => setValues({ ...values, description: e.target.value })} />
                    </div>
                    <div className='flex w-full flex-col gap-2.5'>
                        <Label>Select Date and Time</Label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeIntervals={15}
                            timeFormat='HH:mm'
                            timeCaption='Time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                            className='w-full rounded p-2 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingType === 'isScheduleMeeting'}
                    onClose={() => setMeetingType(undefined)}
                    title="Meeting Created"
                    className="text-center"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast.success('Meeting Link Copied to Clipboard')
                    }}
                    icon={<CheckCircle size={72} className='text-primary' />}
                    buttonIcon={<Copy size={20} />}
                    buttonText='Copy Meeting Link'
                />
            )
            }
            <MeetingModal
                isOpen={meetingType === 'isInstantMeeting'}
                onClose={() => setMeetingType(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingType === 'isJoiningMeeting'}
                onClose={() => setMeetingType(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
                <Input placeholder='Meeting link' onChange={(e) => setValues({ ...values, link: e.target.value })} />
            </MeetingModal>
        </section >
    )
}

export default MeetingTypeList