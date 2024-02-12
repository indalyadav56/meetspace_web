"use client";

import { useEffect, useState } from "react";

import ChatSectionContent from "./ChatSectionContent";
import ChatSectionFooter from "./ChatSectionFooter";
import ChatSectionHeader from "./ChatSectionHeader";
import constants from "@/constants";
import useChatMessageStore from "@/store/chatMessageStore";
import CookieService from "@/lib/cookies";

const ChatSection = ({ room_id }: { room_id: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const { getChatMessageByRoomId } = useChatMessageStore();
  const { addChatMessage } = useChatMessageStore();

  const token = CookieService.getCookie(constants.token.ACCESS_TOKEN);

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
    // console.log("connection open", event);
    // };

    // newSocket.onerror = (event) => {
    // console.log("connection err:=>", event);
    // };

    newSocket.onmessage = (event) => {
      console.log("on chat-messagge=>", event.data);
      handlEvent(event.data);
    };

    return () => newSocket.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSocket, url]);

  useEffect(() => {
    getChatMessageByRoomId(room_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room_id]);

  return (
    <div className="flex-1 flex flex-col">
      <ChatSectionHeader roomId={room_id} />
      <ChatSectionContent />
      <ChatSectionFooter socket={socket} />
    </div>
  );
};

export default ChatSection;
