"use client";

import React from "react";

import UserAvatar from "./UserAvatar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCheck, MoreHorizontal } from "lucide-react";

const ChatContactCard: React.FC<any> = (props) => {
  const { data, onUserClick } = props;

  return (
    <Card
      className="h-16 w-full cursor-pointer rounded-none border-none drop-shadow-none shadow-none bg-transparent hover:bg-slate-300 dark:hover:bg-stone-500"
      onClick={onUserClick}
    >
      <CardContent className="group relative p-0 h-full w-full">
        <div className="h-full flex justify-between p-1 group-hover:items-center">
          <div className="flex items-center space-x-4">
            <UserAvatar isOnline={data.is_active} size="sm" />
            <div>
              <p className="font-medium leading-none">
                {data.is_group
                  ? data.room_name
                  : data.first_name + " " + data.last_name}
              </p>
              <p className="text-sm mt-2 text-muted-foreground dark:text-white">
                {data.last_message}
              </p>
            </div>
          </div>
          <div className="visible group-hover:invisible flex flex-col items-center justify-between gap-1 p-1 text-xs">
            <span>10:00 am</span>
            <CheckCheck className="h-4 w-4" />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="hidden group-hover:block bg-transparent rounded-full shadow-none drop-shadow-none border-none"
          >
            <MoreHorizontal className="h-6 w-6 group-hover:m-auto " />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatContactCard;
