"use client";

import React, { useEffect } from "react";
import UserAvatar from "./UserAvatar";
import { Dot, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

interface UserAndGroupCardProps {
  data: {
    room_id?: string | null;
    room_name?: string | null;
    user_id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    is_active: boolean;
    is_group?: boolean;
    last_message: string;
    message_unseen_count?: number;
  };
  onUserClick?: () => void;
  className?: string;
}

const ChatContactCard: React.FC<UserAndGroupCardProps> = (props) => {
  const userRef = React.useRef(null);
  const { data, onUserClick, className } = props;

  const dispatch = null;

  const userProfilePath = null;
  //   process.env.NEXT_PUBLIC_API_BASE_URL +
  //   "/uploads/" +
  //   data?.id +
  //   "/profile/" +
  //   data?.profile_pic?.temp_name;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      alert("Enter key pressed!");
    }
  };

  useEffect(() => {
    if (data.message_unseen_count) {
      // dispatch(updateMessageUnseenCount(data.message_unseen_count));
    }
  }, [data]);

  return (
    <div
      ref={userRef}
      className={`"h-16 w-full flex gap-2 items-center p-4 hover:bg-blue-50 ${className} text-xs"`}
      onClick={onUserClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {data.message_unseen_count ? <Dot color="red" /> : null}
      <UserAvatar
        isOnline={data.is_active}
        // imgSrc={userProfilePath}
        size="sm"
      />
      <div className="flex-1 flex justify-between">
        <div>
          <h1>{data.is_group ? data.room_name : data.first_name}</h1>
          {data.last_message ? (
            <h1>{data.last_message}</h1>
          ) : (
            <h1>{data.email}</h1>
          )}
        </div>

        <Button size="icon" onClick={() => alert("hello")}>
          <MoreHorizontal />
        </Button>
        {/* {data.message_unseen_count ? (
          <Badge variant="destructive">{data.message_unseen_count}</Badge>
        ) : null} */}
      </div>
    </div>
  );
};

export default ChatContactCard;
