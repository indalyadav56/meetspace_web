"use client";

import { useEffect, useState } from "react";

import ChatSectionContent from "./ChatSectionContent";
import ChatSectionFooter from "./ChatSectionFooter";
import ChatSectionHeader from "./ChatSectionHeader";
import constants from "@/constants";
import useChatMessageStore from "@/store/chatMessageStore";
import useChatRoomStore from "@/store/chatRoomStore";
import CookieService from "@/lib/cookies";

const ChatSection = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const { addChatMessage } = useChatMessageStore();
  const { singleContactData } = useChatRoomStore();

  const token = CookieService.getCookie(constants.token.ACCESS_TOKEN);

  const url = `${process.env.NEXT_PUBLIC_WS_API_BASE_URL}/v1/chat/${singleContactData.room_id}?token=${token}`;

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
    console.log("ws url:->", url);
    const newSocket = new WebSocket(url);
    setSocket(newSocket);

    newSocket.onopen = (event) => {
      console.log("connection open", event);
    };

    newSocket.onerror = (event) => {
      console.log("connection err:=>", event);
    };

    newSocket.onmessage = (event) => {
      console.log("on chat-messagge=>", event.data);
      handlEvent(event.data);
    };

    return () => newSocket.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSocket, url]);

  return (
    <div className="flex-1 flex flex-col">
      <ChatSectionHeader />
      <ChatSectionContent />
      <ChatSectionFooter socket={socket} />
    </div>
  );
};

export default ChatSection;
