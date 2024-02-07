"use client";

import AppBar from "@/components/AppBar";
import ChatSection from "@/components/ChatSection";
import SideBar from "@/components/SideBar";
import { useEffect } from "react";
import { useSocket } from "@/context/Socket";
import Cookies from "js-cookie";
import NavBar from "@/components/NavBar";
import constants from "../../constants";
import useUserStore from "@/store/userStore";

export default function Home() {
  const socket = useSocket();
  const currentUserId = Cookies.get("currentUserId");
  const receiverUser = null;

  const { getAllUsers } = useUserStore();

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
      // dispatch(
      //   updateChatRoomContactIndex({
      //     user_id: message.data.sender_user.id,
      //     first_name: message.data.sender_user.first_name,
      //     last_name: message.data.sender_user.last_name,
      //     is_active: message.data.sender_user.is_active,
      //     is_group: message.data.is_group,
      //     last_message: message.data.content,
      //     message_unseen_count: 10,
      //     room_id: message.data.room_id,
      //     room_name: message.data.room_name,
      //   })
      // );
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
    <main className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex-1 h-[calc(100%-48px)] flex">
        <SideBar />
        <ChatSection />
      </div>
    </main>
  );
}
