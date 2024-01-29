"use client";

import { Button } from "../ui/button";
import { PhoneCall, Users, Video } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHook";
import React, { useEffect, useState } from "react";
import Cookies from "../../../node_modules/@types/js-cookie";
import DrawerBox from "../DrawerBox";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { getChatGroupMember } from "@/redux/features/chatGroup/chatGroupApi";
import ChatContactList from "../ChatContactList";
import DialogBox from "../DialogBox";
import { useSocket } from "@/context/Socket";

const ChatSectionHeader = () => {
  const [open, setOpen] = useState(false);
  const receiverUser = useAppSelector(
    (state) => state.chatRoomReducer.receiverUser
  );
  const groupMembers = useAppSelector(
    (state) => state.chatGroupReducer.groupMembers
  );
  const dispatch = useAppDispatch();
  const socket = useSocket();

  useEffect(() => {
    if (receiverUser?.room_id)
      dispatch(getChatGroupMember(receiverUser?.room_id));
  }, [receiverUser]);

  const handleOnCall = () => {
    socket.send(
      JSON.stringify({
        event_type: "CALL_START",
        message: "calling in call room",
      })
    );
  };

  return (
    <>
      <div className="flex h-16 justify-between p-4 border-b-2 items-center">
        <div className="flex items-center">
          <UserAvatar
            isOnline={receiverUser?.is_active}
            onClick={() => setOpen(true)}
            size="sm"
          />
          <h1 className="ml-2 text-lg">
            {receiverUser?.is_group
              ? receiverUser?.room_name
              : receiverUser?.first_name + " " + receiverUser?.last_name}
          </h1>
        </div>

        <div className="flex gap-1">
          {/* <Button variant="outline" size="icon" onClick={handleOnCall}>
            <Link href="/call">
              <Video className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" onClick={handleOnCall}>
            <Link href="/call">
              <PhoneCall className="h-4 w-4" />
            </Link>
          </Button> */}
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
        </div>
      </div>

      <DialogBox
        headerTitle="User Profile"
        open={open}
        handleClose={() => setOpen(false)}
        middleContent={
          <div>
            <h1>{receiverUser?.email}</h1>
          </div>
        }
      />
    </>
  );
};

export default ChatSectionHeader;
