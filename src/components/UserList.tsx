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
  const { updateChatRoomContact, getChatRoomByUserId, chatRoomData } =
    useChatRoomStore();
  const { removeCurrentMsgDataState, getChatMessageByRoomId } =
    useChatMessageStore();

  const onUserClick = async (userItem: any) => {
    console.log("userItem", userItem);
    removeCurrentMsgDataState();
    getChatRoomByUserId(userItem.id);
    setUserItem(userItem);
  };

  useEffect(() => {
    if (chatRoomData && chatRoomData.length > 0) {
      const contactData: ChatContact = {
        room_id: chatRoomData[0].chat_room_id,
        user_id: userItem.id,
        first_name: userItem.first_name,
        last_name: userItem.last_name,
        email: userItem.email,
      };
      updateChatRoomContact(contactData);
      getChatMessageByRoomId(chatRoomData[0].chat_room_id);
      if (setIsFocused) setIsFocused(false);
      setUserItem(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomData]);

  return (
    <div className="h-[calc(100%-48px)] overflow-y-auto p-1">
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
