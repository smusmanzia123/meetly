"use client";

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

type Props = {
    setIsSetupComplete: (isSetupComplete: boolean) => void;
};

const MeetingSetup = (props: Props) => {
    const [isMicOff, setIsMicOff] = useState(false);
    const [isCamOff, setIsCamOff] = useState(false);

    const call = useCall();

    if (!call) {
        throw new Error("useCall must be used within a StreamCall component");
    }

    useEffect(() => {
        if (isMicOff) {
            call.microphone?.disable();
        } else {
            call.microphone?.enable();
        }
    }, [isMicOff, call?.microphone]);

    useEffect(() => {
        if (isCamOff) {
            call.camera?.disable();
        } else {
            call.camera?.enable();
        }
    }, [isCamOff, call?.camera]);

    return (
        <div className="flex h-screen w-full flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />

            <div className="flex items-center justify-center gap-4 mt-4">
                <Label className="flex items-center gap-2 font-medium">
                    <Checkbox
                        checked={isMicOff}
                        onCheckedChange={(checked) => setIsMicOff(checked as boolean)}
                    />
                    Join with Microphone Off
                </Label>

                <Label className="flex items-center gap-2 font-medium">
                    <Checkbox
                        checked={isCamOff}
                        onCheckedChange={(checked) => setIsCamOff(checked as boolean)}
                    />
                    Join with Camera Off
                </Label>
                <DeviceSettings />
            </div>
            <Button
                className="rounded-md px-4 py-2.5"
                onClick={() => {
                    call.join();
                    props.setIsSetupComplete(true);
                }}
            >
                Join Meeting
            </Button>
        </div>
    );
};

export default MeetingSetup;
