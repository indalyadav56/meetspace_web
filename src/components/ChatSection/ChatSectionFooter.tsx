"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import constants from "../../constants";
import useChatRoomStore from "@/store/chatRoomStore";

interface ChatSectionFooterProps {
  socket: WebSocket | null;
}

const ChatSectionFooter: React.FC<ChatSectionFooterProps> = ({ socket }) => {
  const [msgData, setMsgData] = useState("");
  const params = useSearchParams();
  const room_id = params.get("room");
  const { singleContactData } = useChatRoomStore();

  const sendMessage = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          event: constants.event.CHAT_MESSAGE_SENT,
          data: {
            id: uuidv4(),
            content: msgData,
            room_id: room_id,
            receiver_user: singleContactData,
          },
        })
      );
    }
  };

  return (
    <div className="flex w-3/4 ml-auto mr-auto p-4">
      <div className="flex-1 w-80 mr-4">
        <Input
          placeholder="chat..."
          onChange={(e) => setMsgData(e.currentTarget.value)}
          name={msgData}
          className="h-14 outline-none"
        />
      </div>
      <Button size="icon" onClick={sendMessage} className="h-14 w-14">
        <Send />
      </Button>
    </div>
  );
};

export default ChatSectionFooter;
