"use client";

import useChatMessageStore from "@/store/chatMessageStore";
import ChatContactItem from "./ContactItem";
import useChatRoomStore from "@/store/chatRoomStore";
import { ChatContact } from "@/types/chat_room";
import { useEffect } from "react";

interface ChatContactListProps {
  data: ChatContact[];
  setIsFocused?: any;
}

const ChatContactList: React.FC<ChatContactListProps> = (props) => {
  const { data, setIsFocused } = props;
  const { getChatMessageByRoomId } = useChatMessageStore();
  const { getSingleContactData } = useChatRoomStore();

  const onItemClick = (contact: ChatContact) => {
    getSingleContactData(contact);
    useChatMessageStore.setState({ chatMessageData: [] });
    if (contact.room_id) {
      getChatMessageByRoomId(contact?.room_id);
    }
    if (setIsFocused) setIsFocused(false);
  };

  return (
    <div className="h-[calc(100%-48px)] overflow-y-auto">
      {data?.map((item: ChatContact) => (
        <ChatContactItem
          key={item.room_id}
          data={item}
          onUserClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

export default ChatContactList;