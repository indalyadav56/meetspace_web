import ChatMessageCard from "./ChatMessageCard";

const ChatMessageList = ({ messages }: any) => {
  // const sortMsg = (a: any, b: any) => {
  //   return new Date(a.timestamp) - new Date(b.timestamp);
  // };

  return (
    <div>
      {messages?.map((item: any, index: number) => (
        <div key={index}>
          <ChatMessageCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList;
