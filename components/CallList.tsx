//@ts-nocheck

"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import { useToast } from "./ui/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming " | "recordings" }) => {
  const { toast } = useToast();

  const { endedCalls, upcomigCalls, CallRecordings, isLoading } = useGetCalls();

  const router = useRouter();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming ":
        return upcomigCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Call";
      case "recordings":
        return "No Recordings";
      case "upcoming ":
        return "No UpComing Call";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          CallRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        console.log("callData",callData)
        
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        console.log("recordings", recordings)


        setRecordings(recordings);
      } catch (error) {
        toast({ title: "try again later" });
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, CallRecordings]);

  const calls = getCalls();
  const NoCallMessage = getNoCallsMessage();
console.log('calls', calls)
  // if(isLoading)return<Loader/>;

  return (
    <div className=" grid grid-cols-1 gap-5 xl:grid-cols-2  ">
      {calls && calls.length > 0 ?
       (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/photos/Group6.svg"
                : type === "upcoming "
                ? "/photos/upcom.svg"
                : "/photos/Video.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 26) ||
              meeting.filename?.substring(0, 20) ||
              "No description"
            }
            date={
              meeting.state?.startsAt.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon1={
              type === "recordings" ? "/photos/ph_play-bold.svg" : undefined
            }
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) 
      :
       (
        <h1>{NoCallMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
