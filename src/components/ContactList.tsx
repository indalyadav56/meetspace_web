"use client";

import useChatMessageStore from "@/store/chatMessageStore";
import ChatContactItem from "./ContactItem";
import useChatRoomStore from "@/store/chatRoomStore";
import { ChatContact } from "@/types/chat_room";
import { useEffect, useState } from "react";

interface ChatContactListProps {
  data: ChatContact[];
  setIsFocused?: any;
}

const ChatContactList: React.FC<ChatContactListProps> = (props) => {
  const { data, setIsFocused } = props;
  const [currentRoomId, setCurrentRoomId] = useState("");

  const { getChatMessageByRoomId } = useChatMessageStore();
  const { getSingleContactData, updateContactByRoomId } = useChatRoomStore();

  const onItemClick = (contact: ChatContact) => {
    setCurrentRoomId(contact.room_id);
    contact["message_unseen_count"] = 0;
    updateContactByRoomId(contact, false);
    getChatMessageByRoomId(contact.room_id);
    getSingleContactData(contact);

    useChatMessageStore.setState({ chatMessageData: [] });
    if (setIsFocused) setIsFocused(false);
  };

  return (
    <div className="h-[calc(100%-48px)] overflow-y-auto">
      {data?.map((item: ChatContact) => (
        <ChatContactItem
          key={item.room_id}
          data={item}
          onUserClick={() => onItemClick(item)}
          active={currentRoomId === item.room_id}
        />
      ))}
    </div>
  );
};

export default ChatContactList;
