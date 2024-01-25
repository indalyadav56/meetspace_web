"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppSelector } from "@/hooks/useStoreHook";
import constants from "../../constants";
import { v4 as uuidv4 } from "uuid";

interface ChatSectionFooterProps {
  socket: WebSocket | null;
}

const ChatSectionFooter: React.FC<ChatSectionFooterProps> = ({ socket }) => {
  const [msgData, setMsgData] = useState("");
  const receiverUser = useAppSelector(
    (state) => state.chatRoomReducer.receiverUser
  );
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  const singleChatRoomData = useAppSelector(
    (state) => state.chatRoomReducer.singleChatRoomData
  );

  const sendMessage = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          event: constants.event.CHAT_MESSAGE_SENT,
          data: {
            id: uuidv4(),
            content: msgData,
            sender: currentUser,
            room_id: singleChatRoomData?.id,
            receiver_user: receiverUser,
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
