import ChatMessageCard from "./ChatMessageCard";

const ChatMessageList = ({ messages }: any) => {
  return (
    <div>
      {messages?.map((item: any, index: any) => (
        <div key={index}>
          <ChatMessageCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList;
