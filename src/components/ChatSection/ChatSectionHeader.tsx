"use client";

import React, { useEffect, useState } from "react";
import { MoreVertical, Phone, UserPlus, Video } from "lucide-react";
import { cn } from "@/lib/utils";

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { CheckIcon } from "@radix-ui/react-icons";

const ChatSectionHeader = ({ roomId }: { roomId: string }) => {
  const [open, setOpen] = useState(false);
  const [addGroupUser, setAddGroupUser] = useState(false);

  const { singleRoomData } = useChatRoomStore();
  const { getChatGroupMembers, chatGroupMembers } = useChatGroupStore();
  const { getSingleContactData } = useChatRoomStore();

  const options = [
    {
      label: "test",
      value: "test",
    },
    {
      label: "test",
      value: "test",
    },
    {
      label: "test",
      value: "test",
    },
  ];
  const selectedValues = new Set();

  useEffect(() => {
    getSingleContactData(roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

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
              <Command>
                <CommandInput placeholder={"title"} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => {
                      const isSelected = selectedValues.has(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            if (isSelected) {
                              selectedValues.delete(option.value);
                            } else {
                              selectedValues.add(option.value);
                            }
                            const filterValues = Array.from(selectedValues);
                          }}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <CheckIcon className={cn("h-4 w-4")} />
                          </div>

                          <span>{option.label}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  {/* {selectedValues.size > 0 && (
                    <>
                      <CommandSeparator />
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => column?.setFilterValue(undefined)}
                          className="justify-center text-center"
                        >
                          Clear filters
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )} */}
                </CommandList>
              </Command>
            </main>
          }
        />
      </div>
    </main>
  );
};

export default ChatSectionHeader;
