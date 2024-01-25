"use client";

import React, { useEffect } from "react";
import CallRoomHeader from "./CallRoomHeader";
import RoomSection from "./RoomSection";
import { useSocket } from "@/context/Socket";

const CallRoom = () => {
  const socket = useSocket();

  // useEffect(() => {
  //   console.log("socket", socket);
  //   if (socket && socket.readyState === 1) {
  //   }
  // }, [socket]);
  return (
    <div className="flex-1">
      <CallRoomHeader />
      <RoomSection />
    </div>
  );
};

export default CallRoom;
