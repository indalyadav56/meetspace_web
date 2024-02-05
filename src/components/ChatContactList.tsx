"use client";

import useChatMessageStore from "@/store/chatMessageStore";
import ChatContactCard from "./ChatContactCard";

interface ChatContactListProps {
  data: ChatContactItem[];
}

const ChatContactList: React.FC<ChatContactListProps> = (props) => {
  const { data } = props;
  const { getChatMessageByRoomId } = useChatMessageStore();

  const onItemClick = (contact: ChatContactItem) => {
    console.log("contact", contact);
    if (contact.room_id) {
      getChatMessageByRoomId(contact?.room_id);
    }
  };

  return (
    <div className="h-[calc(100%-48px)] overflow-y-auto">
      {data?.map((item: ChatContactItem, index) => (
        <ChatContactCard
          key={index}
          data={item}
          onUserClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

export default ChatContactList;
