"use client";

import { useEffect, useState } from "react";
import ChatSectionContent from "./ChatSectionContent";
import ChatSectionFooter from "./ChatSectionFooter";
import ChatSectionHeader from "./ChatSectionHeader";
import Cookies from "js-cookie";
import { useSocket } from "@/context/Socket";
import constants from "@/constants";
import { useSearchParams } from "next/navigation";
import useChatMessageStore from "@/store/chatMessageStore";

const ChatSection = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { addChatMessage } = useChatMessageStore();
  const token = Cookies.get("meetspace_access_token");
  const globalSocket = useSocket();
  const param = useSearchParams();
  const room_id = param.get("room");

  const url = `${process.env.NEXT_PUBLIC_WS_API_BASE_URL}/v1/chat/${room_id}?token=${token}`;

  const handlEvent = async (data: string) => {
    try {
      const message = JSON.parse(data);
      if (message.event === constants.event.CHAT_MESSAGE_SENT) {
        addChatMessage(message.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);

    // newSocket.onopen = (event) => {
    //   console.log("connection open", event);
    // };

    // newSocket.onerror = (event) => {
    //   console.log("connection err:====>", event);
    // };

    newSocket.onmessage = (event) => {
      handlEvent(event.data);
    };

    return () => newSocket.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSocket]);

  return (
    <div className="flex-1 flex flex-col">
      <ChatSectionHeader />
      <ChatSectionContent />
      <ChatSectionFooter socket={socket} />
    </div>
  );
};

export default ChatSection;
