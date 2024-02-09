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
      className="h-16 w-full flex gap-2 items-center rounded-none border-none drop-shadow-none shadow-none hover:bg-slate-300 dark:hover:bg-stone-500"
      onClick={onUserClick}
    >
      <UserAvatar isOnline={data.is_active} size="sm" />
      <div className="flex-1 flex justify-between">
        <div className="font-medium leading-none">
          <h1>{data.is_group ? data.room_name : data.first_name}</h1>
          <h1 className="text-sm">{data.email}</h1>
        </div>
      </div>
    </Card>
  );
}
