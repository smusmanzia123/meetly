"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Calendar, Copy, Video } from "lucide-react";
import { Card } from "./ui/card";

interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
    console.log(date)
    return (
        <Card className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] px-5 py-8 xl:max-w-full">
            <article className="flex flex-col gap-5">
                {icon && icon}
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-start items-center relative", {})}>

                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick} className="rounded px-6">
                            {buttonIcon1 && buttonIcon1}
                            {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast.success('Link copied to clipboard');
                            }}
                            variant="outline"
                            className=" px-6"
                        >
                            <Copy className="size-4" />
                            Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </Card>
    );
};

export default MeetingCard;