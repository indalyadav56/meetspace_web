"use client";

import React, { useEffect, useState } from "react";

import UserItem from "./UserItem";
import useChatRoomStore from "@/store/chatRoomStore";
import { ChatContact } from "@/types/chat_room";
import useChatMessageStore from "@/store/chatMessageStore";

interface UserListProps {
  data: any[];
  setIsFocused?: any;
}

export default function UserList({ data, setIsFocused }: UserListProps) {
  const [userItem, setUserItem] = useState<any>();
  const {
    updateChatRoomContact,
    getChatRoomByUserId,
    chatRoomData,
    setChatPreview,
  } = useChatRoomStore();
  const { removeCurrentMsgDataState, getChatMessageByRoomId } =
    useChatMessageStore();

  const onUserClick = (userItem: any) => {
    setChatPreview(false);
    removeCurrentMsgDataState();
    getChatRoomByUserId(userItem.id);
    setUserItem(userItem);
  };

  useEffect(() => {
    if (chatRoomData && chatRoomData.length > 0) {
      const currentUtcTime = new Date().toUTCString();
      const contactData: ChatContact = {
        room_id: chatRoomData[0].chat_room_id,
        room_name: null,
        user_id: userItem.id,
        first_name: userItem.first_name,
        last_name: userItem.last_name,
        email: userItem.email,
        is_group: false,
        last_message: userItem.email,
        updated_at: currentUtcTime,
      };
      updateChatRoomContact(contactData);
      getChatMessageByRoomId(chatRoomData[0].chat_room_id);
      if (setIsFocused) setIsFocused(false);
      setUserItem(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomData]);

  return (
    <div className="h-[calc(100%-48px)] overflow-y-auto">
      {data?.map((item: any) => (
        <UserItem
          key={item.id}
          data={item}
          onUserClick={() => onUserClick(item)}
        />
      ))}
    </div>
  );
}
