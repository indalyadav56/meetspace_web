"use client";

import React from "react";

import UserAvatar from "./UserAvatar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCheck, MoreHorizontal } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const ChatContactCard: React.FC<any> = (props) => {
  const { data, onUserClick } = props;

  function utcToGeneralTime(
    utcTimeString: string,
    desiredFormat: string = "YYYY-MM-DD HH:mm:ss"
  ) {
    try {
      // Parse UTC time string into a Date object
      const utcDate = new Date(utcTimeString);

      // Convert to local time zone
      const localDate = new Date(
        utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
      );

      // Format the local date as desired
      const formattedTime = localDate.toLocaleString(undefined, {
        timeZone: "UTC",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return formattedTime;
    } catch (error) {
      console.error("Error converting UTC time:", error);
      return "Invalid UTC time format"; // Handle invalid input gracefully
    }
  }

  return (
    <Card
      className="h-16 w-full cursor-pointer rounded-none border-none drop-shadow-none shadow-none bg-transparent hover:bg-slate-300 dark:hover:bg-stone-500"
      onClick={onUserClick}
    >
      <CardContent className="group p-0 h-full w-full">
        <div className="h-full flex justify-between p-1 group-hover:items-center">
          <div className="flex items-center space-x-4">
            <UserAvatar isOnline={data.is_active} size="sm" />
            <div>
              <p className="font-normal leading-none">
                {data.is_group
                  ? data.room_name
                  : data.first_name + " " + data.last_name}
              </p>
              {data.last_message ? (
                <p className="text-sm mt-2 text-muted-foreground dark:text-white">
                  {data.last_message}
                </p>
              ) : (
                <p className="text-sm mt-2 text-muted-foreground dark:text-white">
                  {data.email}
                </p>
              )}
            </div>
          </div>
          <div className="visible group-hover:invisible flex flex-col items-end justify-between gap-1 p-1 text-xs">
            <span>{utcToGeneralTime(data.updated_at)}</span>
            {data.message_unseen_count ? (
              <Badge>{data.message_unseen_count}</Badge>
            ) : (
              <CheckCheck className="h-4 w-4" />
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="hidden group-hover:block bg-transparent rounded-full shadow-none drop-shadow-none border-none"
              >
                <MoreHorizontal className="h-6 w-6 group-hover:m-auto " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="cursor-pointer w-56"
              align="end"
              forceMount
            >
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Create Group</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatContactCard;
