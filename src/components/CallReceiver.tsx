import React from "react";
import { Button } from "./ui/button";
import animationData from "../assets/chat.json";
import Lottie from "react-lottie";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/Socket";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

const CallReceiver = ({ data }: { data: any }) => {
  console.log("data", data);
  const router = useRouter();
  const globalSocket = useSocket();

  const handleAcceptCall = () => {
    router.push(`/meeting/${data.room_id}`);
    globalSocket?.send(
      JSON.stringify({
        event: "CALL_ACCEPT",
        data: data,
      })
    );
  };

  return (
    <main className="absolute bottom-8 right-8 rounded-md flex flex-col justify-between bg-slate-500 w-96 h-80">
      <div className="flex-1 bg-red-700 w-full rounded-md">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <div className="flex justify-between p-2 bg-red-400">
        <Button>Reject</Button>
        <Button onClick={handleAcceptCall}>Accecpt</Button>
      </div>
      <audio
        src="https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3"
        controls
        autoPlay
        hidden
      />
    </main>
  );
};

export default CallReceiver;
