import useChatMessageStore from "@/store/chatMessageStore";
import ChatMessageList from "../ChatMessageList";

const ChatSectionContent = () => {
  const { chatMessageData } = useChatMessageStore();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-3/4  mr-auto ml-auto">
        <ChatMessageList messages={chatMessageData} />
      </div>
    </div>
  );
};

export default ChatSectionContent;
