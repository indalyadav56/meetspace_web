"use client";

import React from "react";

import UserAvatar from "./UserAvatar";
import { Card } from "./ui/card";

const ChatContactCard: React.FC<any> = (props) => {
  const userRef = React.useRef(null);
  const { data, onUserClick } = props;

  return (
    <Card
      ref={userRef}
      className="h-16 w-full flex gap-2 items-center "
      onClick={onUserClick}
    >
      <UserAvatar isOnline={data.is_active} size="sm" />
      <div className="flex-1 flex justify-between">
        <div>
          <h1>{data.is_group ? data.room_name : data.first_name}</h1>
          {/* last message */}
          {data.last_message ? (
            <h1 className="text-xs">{data.last_message}</h1>
          ) : (
            <h1 className="text-xs">{data.email}</h1>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ChatContactCard;
