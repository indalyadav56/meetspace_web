"use client";

import { useParams } from "next/navigation";
import { NextPage } from "next";

export default function DynamicChatArea() {
  const param = useParams();
  return (
    <div>
      <h1>DynamicChatArea {param.roomid}</h1>
    </div>
  );
}
