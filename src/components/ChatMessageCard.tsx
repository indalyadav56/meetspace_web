import UserAvatar from "./UserAvatar";
import CookieService from "@/lib/cookies";
import constants from "@/constants";

const ChatMessageCard = ({ item }: any) => {
  let currentUserId = "";
  const accessToken = CookieService.getCookie(constants.token.ACCESS_TOKEN);

  // if (accessToken) {
  //   const decoded = jwtDecode(accessToken);
  //   if (decoded?.user_id) {
  //     currentUserId = decoded?.user_id;
  //   }
  // }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full my-2 flex justify-center items-center">
        <hr className="w-full my-4 bg-gray-500 " />
        <span className="px-2 text-sm">{item.timestamp}</span>
        <hr className="w-full bg-red-800" />
      </div>
      {item?.chat_message?.map((msg: any, index: number) => (
        <div
          key={index}
          className={`flex flex-wrap max-w-[80%] gap-1 ${
            currentUserId === msg?.sender.id ? "self-end" : null
          }`}
        >
          {currentUserId !== msg?.sender.id ? (
            <UserAvatar isOnline={false} />
          ) : null}
          <div className="text-sm bg-blue-500 text-white p-2 rounded-sm break-words my-1">
            {msg?.sender?.first_name} {item?.sender?.last_name}
            <div className="p-2">{msg?.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessageCard;
