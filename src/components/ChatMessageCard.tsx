import UserAvatar from "./UserAvatar";
import { getUserIdFromToken } from "@/lib/jwt";
import { Card } from "./ui/card";
import { CheckCheck } from "lucide-react";
import moment from "moment";

const ChatMessageCard = ({ item }: any) => {
  let currentUserId = getUserIdFromToken();

  const time = moment(item.created_at).format("YYYY-MM-DD HH:MM A");

  return (
    <div className="flex flex-col w-full">
      <div className="w-full my-2 flex justify-center items-center">
        <hr className="w-full" />
        <p className="text-sm min-w-fit">{item.timestamp}</p>
        <hr className="w-full" />
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
              {currentUserId !== msg?.sender_user.id ? (
                <div className="flex gap-2 text-sm my-1">
                  <span>
                    {msg?.sender_user?.first_name}{" "}
                    {item?.sender_user?.last_name}
                  </span>
                  <p className="text-end text-xs my-1">{time}</p>
                </div>
              ) : null}
              {currentUserId === msg?.sender_user.id ? (
                <p className="text-end text-xs my-1">{time}</p>
              ) : null}
              <Card className="p-1">
                <div className="text-sm p-2 rounded-sm break-words my-1">
                  <div className="p-2 w-auto max-w-md">{msg?.content}</div>
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
