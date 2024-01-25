"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import DialogBox from "../DialogBox";
import AddGroupForm from "../AddGroupForm";
import useChatGroupStore from "@/store/chatGroupStore";
import useChatRoomStore from "@/store/chatRoomStore";

const SideBarHeader = () => {
  const [open, setOpen] = useState(false);
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
    <div className="w-full h-16 flex justify-between border-b-2 items-center p-2">
      <h1 className="text-xl">Chat</h1>

      <div className="flex gap-1">
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <DialogBox
        open={open}
        handleClose={() => setOpen(false)}
        title="Add Group"
        mainContent={<AddGroupForm />}
      />
    </div>
  );
};

export default SideBarHeader;
