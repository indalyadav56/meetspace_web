"use client";

import React, { useEffect } from "react";

import ChatPreview from "@/components/ChatPreview";
import ChatSection from "@/components/ChatSection";
import SideBar from "@/components/SideBar";
import useChatRoomStore from "@/store/chatRoomStore";
import useUserStore from "@/store/userStore";
import { useSocket } from "@/context/Socket";
import constants from "@/constants";
import { ChatContact } from "@/types/chat_room";
import { getUserIdFromToken } from "@/lib/jwt";

export default function Root() {
  const { chatPreview, updateContactUserPresence } = useChatRoomStore();
  const { updateContactByRoomId } = useChatRoomStore();
  const {
    getUserProfile,
    getAllUsers,
    updateCurrentUserProfile,
    updateUserPresence,
  } = useUserStore();
  const socket = useSocket();
  const currentUserId = getUserIdFromToken();

  async function showNotification(title: string, message: string) {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
      return;
    }
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      const notification = new Notification(title, {
        body: message + JSON.stringify(navigator.userAgent),
      });
      setTimeout(() => {
        notification.close();
      }, 3000);
    }
  }

  const handleGlobalEvent = (data: string) => {
    try {
      const message = JSON.parse(data);
      if (
        message.event === constants.event.CHAT_NOTIFICATION_SENT &&
        message?.data?.receiver_user?.id === currentUserId
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
          updated_at: new Date().toUTCString(),
          is_group: message.data.content,
          room_name: message.data.room_name,
        };
        updateContactByRoomId(contactData);
      }
      if (message.event === constants.event.USER_CONNECTED) {
        updateCurrentUserProfile({ is_active: true });
        updateUserPresence(message.data, { is_active: true });
        updateContactUserPresence(message.data.id, { is_active: true });
      }
      if (message.event === constants.event.USER_DISCONNECTED) {
        updateCurrentUserProfile({ is_active: false });
        updateUserPresence(message.data.id, { is_active: false });
        updateContactUserPresence(message.data.id, { is_active: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Promise.all([getUserProfile(), getAllUsers()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        console.log("globalSocket:->", event.data);
        handleGlobalEvent(event.data);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <main className="w-screen h-screen flex overflow-hidden">
      <SideBar />
      {chatPreview ? <ChatPreview /> : <ChatSection />}
    </main>
  );
}
