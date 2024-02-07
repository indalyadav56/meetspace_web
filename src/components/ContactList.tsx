"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useChatMessageStore from "@/store/chatMessageStore";
import ChatContactItem from "./ContactItem";
import useChatRoomStore from "@/store/chatRoomStore";

interface ChatContactListProps {
  data: ChatContact[];
  setIsFocused?: any;
}

const ChatContactList: React.FC<ChatContactListProps> = (props) => {
  const { data, setIsFocused } = props;
  const [isVisible, setIsVisible] = useState("");
  const { getChatMessageByRoomId } = useChatMessageStore();
  const {
    updateChatRoomContact,
    getSingleContactData,
    getChatRoomByUserId,
    chatRoomData,
  } = useChatRoomStore();
  const router = useRouter();

  const onItemClick = (contact: ChatContact) => {
    console.log("contact", contact);
    setIsVisible(contact.id);
    getSingleContactData(contact);
    useChatMessageStore.setState({ chatMessageData: [] });
    if (contact.room_id) {
      router.push(`/?conversation=${contact.room_id}`);
      getChatMessageByRoomId(contact?.room_id);
    } else {
      getChatRoomByUserId(contact.id);
      updateChatRoomContact(contact);
    }
    if (setIsFocused) setIsFocused(false);
  };

  useEffect(() => {
    if (chatRoomData && chatRoomData.length > 0) {
      router.push(`/?conversation=${chatRoomData[0].chat_room_id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomData]);

  return (
    <div className="h-[calc(100%-48px)] overflow-y-auto">
      {data?.map((item: ChatContact) => (
        <ChatContactItem
          key={item.room_id || item.id}
          data={item}
          onUserClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

export default ChatContactList;
