import React, { useEffect } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { useSocket } from "@/context/Socket";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";

const Call = () => {
  const globalSocket = useSocket();
  const router = useRouter();

  const { currentUser } = useUserStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-evenly items-center align-middle bg-gray-200">
      <div className=" w-64 h-64 rounded-full shadow-xl animate-pulse">
        <UserAvatar size="2xl" />
      </div>
      <Button
        className="absolute top-8 right-8"
        onClick={() => {
          router.back();
        }}
      >
        Reject
      </Button>
      <audio
        src="https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3"
        controls
        autoPlay
        hidden
      />
    </div>
  );
};

export default Call;
