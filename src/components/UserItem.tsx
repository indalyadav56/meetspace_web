"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function UserItem(props: any) {
  const userRef = React.useRef(null);
  const { data, onUserClick } = props;

  return (
    <Card
      ref={userRef}
      className="h-16 w-full flex gap-2 items-center rounded-none border-none drop-shadow-none shadow-none hover:bg-slate-300"
      onClick={onUserClick}
    >
      <UserAvatar isOnline={data.is_active} size="sm" />
      <div className="flex-1 flex justify-between">
        <div>
          <h1>{data.is_group ? data.room_name : data.first_name}</h1>
          {data.last_message ? (
            <h1>{data.last_message}</h1>
          ) : (
            <h1>{data.email}</h1>
          )}
        </div>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full shadow-none drop-shadow-none border-none"
          onClick={() => alert("hello")}
        >
          <MoreHorizontal />
        </Button>
      </div>
    </Card>
  );
}
