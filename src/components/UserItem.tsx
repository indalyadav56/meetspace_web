"use client";

import React, { useEffect } from "react";
import { Dot, MoreHorizontal } from "lucide-react";

import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";

export default function UserItem(props: any) {
  const userRef = React.useRef(null);
  const { data, onUserClick, className, isVisible } = props;

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
      className={`"h-16 w-full flex gap-2 items-center p-4 ${
        isVisible && "bg-red-500"
      }  hover:bg-blue-50 ${className} text-xs"`}
      onClick={onUserClick}
      onKeyDown={handleKeyPress}
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
}
