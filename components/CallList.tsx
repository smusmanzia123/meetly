// @ts-nocheck
'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import { Calendar, Monitor, MonitorDown, MonitorOff, Video } from 'lucide-react'
import Loader from './Loader'

type Props = {
    type: 'ended' | 'upcoming' | 'recordings'
}

const CallList = (props: Props) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()
    const router = useRouter()
    const [recordings, setRecordings] = useState<CallRecording[]>([])


    const getCalls = () => {
        switch (props.type) {
            case 'ended':
                return endedCalls
            case 'upcoming':
                return upcomingCalls
            case 'recordings':
                return recordings
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (props.type) {
            case 'ended':
                return 'No ended calls found'
            case 'upcoming':
                return 'No upcoming calls found'
            case 'recordings':
                return 'No recordings found'
            default:
                return ''
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            const callData = await Promise.all(
                callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
            );

            const recordings = callData
                .filter((call) => call.recordings.length > 0)
                .flatMap((call) => call.recordings);

            setRecordings(recordings);
        };

        if (props.type === 'recordings') {
            fetchRecordings();
        }
    }, [props.type, callRecordings]);

    if (isLoading) return <Loader />;

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();
    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                    key={(meeting as Call).id}
                    title={
                        (meeting as Call).state?.custom?.description ||
                        (meeting as CallRecording).filename?.substring(0, 20) ||
                        'No Description'
                    }
                    date={
                        (meeting as Call).state?.startsAt?.toLocaleString() ||
                        (meeting as CallRecording).start_time?.toLocaleString()
                    }

                    icon={
                        props.type === 'ended' ? <MonitorOff size={50} />
                            : props.type === 'upcoming' ? <Calendar size={50} />
                                : <Video size={50} />
                    }
                    isPreviousMeeting={props.type === 'ended'}
                    buttonIcon1={props.type === 'recordings' ? <Video /> : <Monitor />}
                    handleClick={
                        props.type === 'recordings'
                            ? () => router.push(`${(meeting as CallRecording).url}`)
                            : () => router.push(`/meeting/${(meeting as Call).id}`)
                    }
                    link={
                        props.type === 'recordings'
                            ? (meeting as CallRecording).url
                            : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                    }
                    buttonText={props.type === 'recordings' ? 'Play' : 'Start'}
                />
            )) : (
                <div className='col-span-full flex h-full items-center justify-center'>
                    <p className='text-center text-sm text-muted-foreground'>{noCallsMessage}</p>
                </div>
            )}
        </div>
    )
}

export default CallList