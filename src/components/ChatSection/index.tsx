"use client";

import { useEffect, useState } from "react";
import ChatSectionContent from "./ChatSectionContent";
import ChatSectionFooter from "./ChatSectionFooter";
import ChatSectionHeader from "./ChatSectionHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHook";
import { addChatMessageData } from "@/redux/features/chatMessage/chatMessageSlice";
import Cookies from "js-cookie";
import { useSocket } from "@/context/Socket";
import constants from "@/constants";
import { updateChatRoomContactIndex } from "@/redux/features/chatRoom/chatRoomSlice";

const ChatSection = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const dispatch = useAppDispatch();
  const currentUserId = Cookies.get("currentUserId");
  const token = Cookies.get("meetspace_access_token");
  const globalSocket = useSocket();
  const chatRoomId = useAppSelector(
    (state) => state.chatMessageReducer.receiverUserId
  );
  const receiverUser = useAppSelector(
    (state) => state.chatRoomReducer.receiverUser
  );
  const web_socket_url = `${process.env.NEXT_PUBLIC_WS_API_BASE_URL}/v1/chat/${chatRoomId}?token=${token}`;

  const handlEvent = async (data: string) => {
    try {
      const message = JSON.parse(data);
      console.log("chat ws message:- ", message);
      if (message.event === constants.event.CHAT_MESSAGE_SENT) {
        dispatch(addChatMessageData(message.data));
        dispatch(updateChatRoomContactIndex(receiverUser));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const newSocket = new WebSocket(web_socket_url);
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      handlEvent(event.data);
    };

    return () => newSocket.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSocket, chatRoomId]);

  return (
    <div className="flex-1 flex flex-col">
      <ChatSectionHeader />
      <ChatSectionContent />
      <ChatSectionFooter socket={socket} />
    </div>
  );
};

export default ChatSection;
