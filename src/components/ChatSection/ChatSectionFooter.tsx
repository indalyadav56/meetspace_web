"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import constants from "../../constants";
import { getUserIdFromToken } from "../../lib/jwt";
import useChatRoomStore from "@/store/chatRoomStore";

type ChatSectionFooterProps = {
  socket: WebSocket | null;
};

const ChatSectionFooter: React.FC<ChatSectionFooterProps> = ({ socket }) => {
  const [msgData, setMsgData] = useState<string>("");
  const { singleContactData } = useChatRoomStore();

  let currentUserId = getUserIdFromToken();

  const sendMessage = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          event: constants.event.CHAT_MESSAGE_SENT,
          data: {
            content: msgData,
            receiver_user: {
              id: singleContactData.user_id,
              first_name: singleContactData.first_name,
              last_name: singleContactData.last_name,
              email: singleContactData.email,
            },
            sender_user: {
              id: currentUserId,
            },
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
