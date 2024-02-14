"use client";

import { useEffect, useState } from "react";

import ChatSectionContent from "./ChatSectionContent";
import ChatSectionFooter from "./ChatSectionFooter";
import ChatSectionHeader from "./ChatSectionHeader";
import constants from "@/constants";
import useChatMessageStore from "@/store/chatMessageStore";
import CookieService from "@/lib/cookies";
import useChatRoomStore from "@/store/chatRoomStore";
import { ChatContact } from "@/types/chat_room";

const ChatSection = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const { getChatMessageByRoomId } = useChatMessageStore();
  const { addChatMessage } = useChatMessageStore();
  const { updateChatRoomContact, singleRoomData } = useChatRoomStore();

  const token = CookieService.getCookie(constants.token.ACCESS_TOKEN);

  const url = `${process.env.NEXT_PUBLIC_WS_API_BASE_URL}/v1/chat/${singleRoomData.id}?token=${token}`;

  const handlEvent = async (data: string) => {
    try {
      const message = JSON.parse(data);
      if (message.event === constants.event.CHAT_MESSAGE_SENT) {
        addChatMessage(message.data);
        let contactData: ChatContact = {
          room_id: message.data.room_id,
          room_name: message.data.room_name,
          is_group: message.data.is_group,
          updated_at: message.data.updated_at,
        };
        if (!message.data.is_group) {
          contactData["user_id"] = message.data.receiver_user.id;
          contactData["first_name"] = message.data.receiver_user.first_name;
          contactData["last_name"] = message.data.receiver_user.last_name;
          contactData["email"] = message.data.receiver_user.email;
          updateChatRoomContact(contactData);
        } else {
          updateChatRoomContact(contactData);
        }
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
    getChatMessageByRoomId(singleRoomData.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleRoomData]);

  return (
    <div className="flex-1 flex flex-col">
      <ChatSectionHeader />
      <ChatSectionContent />
      <ChatSectionFooter socket={socket} />
    </div>
  );
};

export default ChatSection;
