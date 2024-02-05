import ChatMessageList from "../ChatMessageList";

const ChatSectionContent = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-3/4  mr-auto ml-auto">
        <ChatMessageList messages={[]} />
      </div>
    </div>
  );
};

export default ChatSectionContent;
