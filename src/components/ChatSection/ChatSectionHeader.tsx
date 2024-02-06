"use client";
import React, { useState } from "react";
import { Users } from "lucide-react";

import { Button } from "../ui/button";
import DrawerBox from "../DrawerBox";
import UserAvatar from "../UserAvatar";
import ContactList from "../ContactList";
import DialogBox from "../DialogBox";
import useChatRoomStore from "@/store/chatRoomStore";

const ChatSectionHeader = () => {
  const [open, setOpen] = useState(false);
  const { singleContactData } = useChatRoomStore();

  console.log("singleContactData", singleContactData);

  return (
    <main>
      <div className="flex h-16 justify-between p-4 border-b-2 items-center">
        <div className="flex items-center">
          <UserAvatar isOnline={true} onClick={() => setOpen(true)} size="sm" />
          <h1 className="ml-2 text-lg">
            {singleContactData?.is_group
              ? singleContactData?.room_name
              : singleContactData?.first_name +
                " " +
                singleContactData?.last_name}
          </h1>
        </div>

        <div className="flex gap-1">
          {singleContactData?.is_group && (
            <DrawerBox
              triggerContent={
                <Button variant="outline" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              }
              content={<ContactList data={[]} />}
            />
          )}
        </div>
      </div>

      <DialogBox
        title="User Profile"
        open={open}
        handleClose={() => setOpen(false)}
        mainContent={
          <div>
            <h1>{singleContactData?.email}</h1>
          </div>
        }
      />
    </main>
  );
};

export default ChatSectionHeader;
