"use client";

import { useEffect } from "react";

import ChatSection from "@/components/ChatSection";
import { useSocket } from "@/context/Socket";
import useUserStore from "@/store/userStore";
import ChatPreview from "@/components/ChatPreview";
import useChatRoomStore from "@/store/chatRoomStore";
import { ChatContact } from "@/types/chat_room";
import { getUserIdFromToken } from "@/lib/jwt";
import constants from "@/constants";

export default function ChatArea() {
  const socket = useSocket();

  const currentUserId = getUserIdFromToken();
  const receiverUser = null;

  const { getAllUsers } = useUserStore();
  const { chatPreview, updateChatRoomContact } = useChatRoomStore();

  async function showNotification(title: string, message: string) {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
      return;
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      new Notification(title, {
        body: message + JSON.stringify(navigator.userAgent),
      });
    }
    socket?.send(
      JSON.stringify({
        event: constants.event.CHAT_NOTIFICATION_RECEIVED,
        data: receiverUser,
      })
    );
  }
  const handleGlobalEvent = (data: string) => {
    const message = JSON.parse(data);
    console.log("globalSocket:->", message);
    if (
      message.event === constants.event.CHAT_NOTIFICATION_SENT &&
      message.data.receiver_user.id === currentUserId
    ) {
      showNotification("New Message", message.data.content);
      const contactData: ChatContact = {
        room_id: message.data.room_id,
        user_id: message.data.sender_user.id,
        first_name: message.data.sender_user.first_name,
        last_name: message.data.sender_user.last_name,
        email: message.data.sender_user.email,
        message_unseen_count: 1,
        last_message: message.data.content,
        updated_at: message.data.updated_at,
      };
      updateChatRoomContact(contactData);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        handleGlobalEvent(event.data);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <main>{chatPreview ? <ChatPreview /> : <ChatSection />}</main>;
}
