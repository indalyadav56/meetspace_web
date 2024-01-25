"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CallRoomHeader = () => {
  const router = useRouter();

  const leaveRoom = () => {
    router.back();
  };
  return (
    <div
      className="w-full h-14 flex items-center justify-between p-2 text-white"
      style={{ backgroundColor: "#232323" }}
    >
      <h1>0:00</h1>

      <div className="flex gap-2">
        <Button>Leave</Button>
        <Button>Leave</Button>
        <Button>Leave</Button>
        <Button className="bg-red-500" onClick={leaveRoom}>
          Leave
        </Button>
      </div>
    </div>
  );
};

export default CallRoomHeader;
