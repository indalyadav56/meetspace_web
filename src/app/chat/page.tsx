"use client";

import SideBar from "@/components/SideBar";
import React from "react";
import ChatArea from "./[roomid]/page";

export default function page() {
  return (
    <main className="w-screen h-screen flex overflow-hidden">
      <SideBar />
      <ChatArea />
    </main>
  );
}
