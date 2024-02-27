"use client";

import React, { useEffect, useState } from "react";
import { MoreVertical, Phone, UserPlus, Video, X } from "lucide-react";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Command, CommandInput, CommandItem, CommandList } from "../ui/command";
import UserItem from "../UserItem";
import { User } from "@/utils/types";
import Link from "next/link";

const ChatSectionHeader = () => {
  const [open, setOpen] = useState(false);
  const [addGroupUser, setAddGroupUser] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const { singleRoomData, deleteChatGroup, deleteContactByRoomId } =
    useChatRoomStore();
  const { getChatGroupMembers, chatGroupMembers, updateChatGroup } =
    useChatGroupStore();
  const { users, removeUsersState, addUsersState } = useUserStore();

  function onUserClick(user: any) {
    setSelectedUsers((prev: any) => [...prev, user]);
    removeUsersState(user.id);
  }

  function handleSelectedRemoveUser(user: any) {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((item: any) => item.id !== user.id)
    );
    addUsersState(user);
  }

  return (
    <main>
      <div className="w-full flex h-16 justify-between p-4 border-b-2 items-center">
        <div className="flex items-center">
          <UserAvatar
            isOnline={true}
            onClick={() => {
              setOpen(true);
              if (singleRoomData?.is_group) {
                getChatGroupMembers(singleRoomData.id);
              }
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
          <Link href="/lobby">
            <Button variant="ghost" size="icon">
              <Video />
            </Button>
          </Link>
          <Link href="/lobby">
            <Button variant="ghost" size="icon">
              <Phone />
            </Button>
          </Link>
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
                <DropdownMenuItem onClick={() => setDeleteDialog(true)}>
                  Delete
                </DropdownMenuItem>
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
              {/* show users */}
              {selectedUsers.length > 0 && (
                <div className="flex flex-wrap max-h-44  gap-2 overflow-hidden overflow-y-auto items-center ">
                  {selectedUsers.map((user: any) => (
                    <div
                      className="bg-slate-400 flex items-center p-2 rounded-md"
                      key={user.email}
                    >
                      <span className="mr-2 font-semibold">{user.email}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-transparent"
                        onClick={() => handleSelectedRemoveUser(user)}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Command className="border-1">
                <span className="mt-2">Add User</span>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  {users.map((user: any) => (
                    <CommandItem key={user.id} value={user}>
                      <UserItem
                        key={user.id}
                        data={user}
                        onUserClick={() => onUserClick(user)}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </main>
          }
          footerContent={
            <main>
              <Button
                onClick={() =>
                  updateChatGroup({
                    room_id: "roomId",
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

      {/* deltee alert */}
      <AlertDialog open={deleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              are you sure you want to logout.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteContactByRoomId(singleRoomData.id);
                deleteChatGroup(singleRoomData.id);
                setDeleteDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default ChatSectionHeader;
