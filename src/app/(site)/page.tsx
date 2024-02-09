"use client";

import { useEffect } from "react";

import ChatSection from "@/components/ChatSection";
import SideBar from "@/components/SideBar";
import { useSocket } from "@/context/Socket";
import constants from "../../constants";
import { getUserIdFromToken } from "../../lib/jwt";
import useUserStore from "@/store/userStore";
import ChatPreview from "@/components/ChatPreview";
import useChatRoomStore from "@/store/chatRoomStore";

export default function Home() {
  const socket = useSocket();

  const currentUserId = getUserIdFromToken();
  const receiverUser = null;

  const { getAllUsers } = useUserStore();
  const { chatPreview } = useChatRoomStore();

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

  return (
    <main className="w-screen h-screen flex  overflow-hidden">
      <SideBar />
      {chatPreview ? <ChatSection /> : <ChatPreview />}
    </main>
  );
}
