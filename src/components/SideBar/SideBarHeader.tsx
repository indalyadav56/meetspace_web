"use client";

import { useEffect } from "react";

import useChatGroupStore from "@/store/chatGroupStore";
import useChatRoomStore from "@/store/chatRoomStore";
import SearchContainer from "../SearchContainer";
import NavBar from "../NavBar";
import { ChatContact } from "@/types/chat_room";

const SideBarHeader = () => {
  const { success, chatGroupData } = useChatGroupStore();
  const { updateChatRoomContact } = useChatRoomStore();

  useEffect(() => {
    if (success) {
      const groupData: ChatContact = {
        room_id: chatGroupData["data"]["id"],
        is_group: true,
        room_name: chatGroupData["data"]["room_name"],
      };
      updateChatRoomContact(groupData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div className="w-full flex flex-col justify-between items-center">
      <NavBar />
      <SearchContainer />
    </div>
  );
};

export default SideBarHeader;
