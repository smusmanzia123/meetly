import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

type Props = {}

const EndCallButton = (props: Props) => {
    const call = useCall();
    const router = useRouter()

    const { useLocalParticipant } = useCallStateHooks()
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

    if (!isMeetingOwner) return null;

    return (
        <Button onClick={async () => {
            await call.endCall();
            router.push('/home');
        }} className='bg-red-500 hover:bg-red-800 text-white'>End call for everyone</Button>
    )
}

export default EndCallButton