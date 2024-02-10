"use client";

import React, { useState } from "react";

import UserAvatar from "../UserAvatar";
import DialogBox from "../DialogBox";
import useChatRoomStore from "@/store/chatRoomStore";

const ChatSectionHeader = () => {
  const [open, setOpen] = useState(false);
  const { singleContactData } = useChatRoomStore();

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
          {singleContactData?.is_group ? (
            <DialogBox
              title="Chat Group Details"
              open={open}
              handleClose={() => setOpen(false)}
              mainContent={
                <div>
                  <h1>{singleContactData?.room_name}</h1>
                </div>
              }
            />
          ) : (
            <DialogBox
              title="User"
              open={open}
              handleClose={() => setOpen(false)}
              mainContent={
                <div>
                  <h1>{singleContactData?.email}</h1>
                </div>
              }
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatSectionHeader;
