"use client";

import { useEffect, useState } from "react";

import useChatGroupStore from "@/store/chatGroupStore";
import useChatRoomStore from "@/store/chatRoomStore";
import SearchContainer from "../SearchContainer";
import NavBar from "../NavBar";

const SideBarHeader = () => {
  const { chatGroupData } = useChatGroupStore();
  const { updateChatRoomContact } = useChatRoomStore();

  useEffect(() => {
    if (chatGroupData?.data?.status_code === 200) {
      const groupData: ChatContactItem = {
        room_id: chatGroupData["data"]["id"],
        is_group: true,
        room_name: chatGroupData["data"]["room_name"],
      };
      updateChatRoomContact(groupData);
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatGroupData]);

  return (
    <div className="w-full flex flex-col justify-between border-b-2 items-center">
      <NavBar />
      <SearchContainer />
    </div>
  );
};

export default SideBarHeader;
