import UserAvatar from "./UserAvatar";
import { getUserIdFromToken } from "@/lib/jwt";

const ChatMessageCard = ({ item }: any) => {
  let currentUserId = getUserIdFromToken();

  return (
    <div className="flex flex-col w-full">
      <div className="w-full my-2 flex justify-center items-center">
        <hr className="w-full my-4 bg-gray-500 " />
        <span className="px-2 text-sm">{item.timestamp}</span>
        <hr className="w-full bg-red-800" />
      </div>
      {item?.chat_message?.map((msg: any) => (
        <div
          key={msg.id}
          className={`flex flex-wrap max-w-[80%] gap-1 ${
            currentUserId === msg?.sender_user.id ? "self-end" : null
          }`}
        >
          {currentUserId !== msg?.sender_user.id ? (
            <UserAvatar size="sm" isOnline={false} />
          ) : null}
          <div className="text-sm bg-blue-500 text-white p-2 rounded-sm break-words my-1">
            {msg?.sender_user?.first_name} {item?.sender_user?.last_name}
            <div className="p-2">{msg?.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessageCard;
