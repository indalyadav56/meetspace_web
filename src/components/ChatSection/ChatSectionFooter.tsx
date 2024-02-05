"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import constants from "../../constants";
import { v4 as uuidv4 } from "uuid";

interface ChatSectionFooterProps {
  socket: WebSocket | null;
}

const ChatSectionFooter: React.FC<ChatSectionFooterProps> = ({ socket }) => {
  const [msgData, setMsgData] = useState("");
  const singleChatRoomData = null;

  const sendMessage = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          event: constants.event.CHAT_MESSAGE_SENT,
          data: {
            id: uuidv4(),
            content: msgData,
            room_id: "76399d99-d59b-469b-a149-66313cd7d9b6",
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
        />
      </div>
      <Button size="icon" onClick={sendMessage}>
        <Send />
      </Button>
    </div>
  );
};

export default ChatSectionFooter;
