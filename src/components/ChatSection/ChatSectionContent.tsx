"use client";

import { useEffect, useRef } from "react";
import useChatMessageStore from "@/store/chatMessageStore";
import ChatMessageList from "../ChatMessageList";

const ChatSectionContent = () => {
  const { chatMessageData } = useChatMessageStore();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTo(0, divRef.current.scrollHeight);
    }
  }, [chatMessageData]);

  return (
    <div className="flex-1 overflow-y-auto" ref={divRef}>
      <div className="w-3/4  mr-auto ml-auto">
        <ChatMessageList messages={chatMessageData} />
      </div>
    </div>
  );
};

export default ChatSectionContent;
