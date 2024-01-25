"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const RoomSection = () => {
  return (
    <div className="flex-1 flex w-full h-full justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="h-40 w-40">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl">Waiting to join others...</h1>
      </div>
    </div>
  );
};

export default RoomSection;
