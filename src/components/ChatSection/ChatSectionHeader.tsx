"use client";

import React, { useEffect, useState } from "react";
import { MoreVertical, Phone, UserPlus, Video } from "lucide-react";
import Select from "react-select";
import { useTheme } from "next-themes";

import UserAvatar from "../UserAvatar";
import DialogBox from "../DialogBox";
import useChatRoomStore from "@/store/chatRoomStore";
import UserList from "../UserList";
import useChatGroupStore from "@/store/chatGroupStore";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useUserStore from "@/store/userStore";

const ChatSectionHeader = ({ roomId }: { roomId: string }) => {
  const [open, setOpen] = useState(false);
  const [addGroupUser, setAddGroupUser] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { singleRoomData } = useChatRoomStore();
  const { getChatGroupMembers, chatGroupMembers, updateChatGroup } =
    useChatGroupStore();
  const { getSingleContactData } = useChatRoomStore();
  const { users } = useUserStore();

  const { theme } = useTheme();

  useEffect(() => {
    console.log("room_id", roomId);
    getSingleContactData(roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "black" : "#fff",
    }),

    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      borderColor: "#000064",
      outline: state.isFocus ? "1px solid #000064" : null,
      backgroundColor: "dark",
      borderRadius: 4,
      minHeight: 40,
    }),

    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const onChange = (selectedOpts: any) => {
    const userIds = selectedOpts.map((opt: any) => opt.id);
    setSelectedUsers(userIds);
  };

  return (
    <main>
      <div className="w-full flex h-16 justify-between p-4 border-b-2 items-center">
        <div className="flex items-center">
          <UserAvatar
            isOnline={true}
            onClick={() => {
              setOpen(true);
              getChatGroupMembers(singleRoomData.id);
            }}
            size="sm"
          />
          {singleRoomData && ( // Check if singleRoomData exists
            <h1 className="ml-2 text-lg">
              {singleRoomData.is_group
                ? singleRoomData.room_name
                : singleRoomData.room_users &&
                  singleRoomData.room_users.length > 0
                ? singleRoomData.room_users[0].first_name +
                  " " +
                  singleRoomData.room_users[0].last_name
                : null}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Button variant="ghost" size="icon">
            <Video />
          </Button>
          <Button variant="ghost" size="icon">
            <Phone />
          </Button>
          {singleRoomData?.is_group ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAddGroupUser(true)}
            >
              <UserPlus />
            </Button>
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="cursor-pointer w-56"
              align="end"
              forceMount
            >
              <DropdownMenuGroup>
                <DropdownMenuItem>Create Group</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* dialog*/}
        {singleRoomData?.is_group ? (
          <DialogBox
            title={
              singleRoomData?.room_name
                ? singleRoomData?.room_name
                : "Chat Group Details"
            }
            open={open}
            handleClose={() => setOpen(false)}
            mainContent={
              <div className="h-96">
                <UserList data={chatGroupMembers} />
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
                <h1>{singleRoomData?.room_users?.[0].email}</h1>
              </div>
            }
          />
        )}

        {/* add group user dialog */}
        <DialogBox
          title="Add Group User"
          open={addGroupUser}
          handleClose={() => setAddGroupUser(false)}
          mainContent={
            <main>
              <Select
                options={users}
                closeMenuOnSelect={false}
                styles={customStyles}
                getOptionValue={(option: any) => option.id}
                getOptionLabel={(option) => option.email}
                isMulti
                isSearchable={true}
                onChange={onChange}
              />
            </main>
          }
          footerContent={
            <main>
              <Button
                onClick={() =>
                  updateChatGroup({
                    room_id: roomId,
                    user_ids: selectedUsers,
                  })
                }
              >
                Add
              </Button>
            </main>
          }
        />
      </div>
    </main>
  );
};

export default ChatSectionHeader;
