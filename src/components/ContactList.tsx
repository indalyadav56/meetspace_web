"use client";

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
  const { getChatMessageByRoomId } = useChatMessageStore();
  const { updateChatRoomContact, getSingleContactData } = useChatRoomStore();
  const router = useRouter();

  const onItemClick = (contact: ChatContact) => {
    getSingleContactData(contact);
    if (contact.room_id) {
      router.push(`/?conversation=${contact.room_id}`);
      getChatMessageByRoomId(contact?.room_id);
    } else {
      router.push(`/?conversation=${contact.id}`);
      updateChatRoomContact(contact);
    }
    if (setIsFocused) setIsFocused(false);
  };

  return (
    <div className="h-[calc(100%-48px)] overflow-y-auto">
      {data?.map((item: ChatContact) => (
        <ChatContactItem
          key={item.id}
          data={item}
          onUserClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

export default ChatContactList;
