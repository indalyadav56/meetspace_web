"use client";

import { useAppSelector } from "@/hooks/useStoreHook";
import ChatMessageList from "../ChatMessageList";

const ChatSectionContent = () => {
  const messages = useAppSelector((state) => state.chatMessageReducer.data);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-3/4  mr-auto ml-auto">
        <ChatMessageList messages={messages} />
      </div>
    </div>
  );
};

export default ChatSectionContent;
