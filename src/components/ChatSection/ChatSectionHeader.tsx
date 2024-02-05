"use client";
import React, { useState } from "react";
import { Users } from "lucide-react";

import { Button } from "../ui/button";
import DrawerBox from "../DrawerBox";
import UserAvatar from "../UserAvatar";
import ChatContactList from "../ChatContactList";
import DialogBox from "../DialogBox";
import { useSocket } from "@/context/Socket";

const ChatSectionHeader = () => {
  const [open, setOpen] = useState(false);
  const socket = useSocket();

  return (
    <main>
      <div className="flex h-16 justify-between p-4 border-b-2 items-center">
        <div className="flex items-center">
          <UserAvatar isOnline={true} onClick={() => setOpen(true)} size="sm" />
          {/* <h1 className="ml-2 text-lg">
            {receiverUser?.is_group
              ? receiverUser?.room_name
              : receiverUser?.first_name + " " + receiverUser?.last_name}
          </h1> */}
        </div>

        {/* <div className="flex gap-1">
          {receiverUser?.is_group && (
            <DrawerBox
              triggerContent={
                <Button variant="outline" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              }
              content={<ChatContactList data={groupMembers} />}
            />
          )}
        </div> */}
      </div>

      {/* <DialogBox
        headerTitle="User Profile"
        open={open}
        handleClose={() => setOpen(false)}
        middleContent={
          <div>
            <h1>{receiverUser?.email}</h1>
          </div>
        }
      /> */}
    </main>
  );
};

export default ChatSectionHeader;
