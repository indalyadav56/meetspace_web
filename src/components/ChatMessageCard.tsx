import UserAvatar from "./UserAvatar";
import { getUserIdFromToken } from "@/lib/jwt";
import { Card } from "./ui/card";
import { CheckCheck } from "lucide-react";

const ChatMessageCard = ({ item }: any) => {
  let currentUserId = getUserIdFromToken();

  return (
    <div className="flex flex-col w-full">
      <div className="w-full my-2 flex justify-center items-center">
        <hr className="w-full my-4 " />
        <span className="px-2 text-sm">{item.timestamp}</span>
        <hr className="w-full " />
      </div>
      {item?.chat_message?.map((msg: any) => (
        <main
          key={msg.id}
          className={`flex flex-col my-2 flex-wrap max-w-[50%] gap-1 ${
            currentUserId === msg?.sender_user.id ? "self-end" : null
          }`}
        >
          <div className="flex gap-2">
            {currentUserId !== msg?.sender_user.id ? (
              <UserAvatar size="sm" isOnline={msg?.sender_user?.is_active} />
            ) : null}
            <div className="">
              <div className="flex gap-2 text-sm">
                {currentUserId !== msg?.sender_user.id ? (
                  <span>
                    {msg?.sender_user?.first_name}{" "}
                    {item?.sender_user?.last_name}
                  </span>
                ) : null}
                {/* <p>10:00 AM</p> */}
              </div>
              <Card>
                <div className="text-sm p-2 rounded-sm break-words my-1">
                  <div className="p-2">{msg?.content}</div>
                </div>
              </Card>
              {currentUserId === msg?.sender_user.id ? (
                <div className="flex justify-end text-xs">
                  <CheckCheck className="h-4 w-4" />
                </div>
              ) : null}
            </div>
          </div>
        </main>
      ))}
    </div>
  );
};

export default ChatMessageCard;
