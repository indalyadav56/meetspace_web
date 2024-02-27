import React, { useEffect, useRef, useState } from "react";
import useUserStore from "@/store/userStore";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import UserItem from "./UserItem";
import useChatRoomStore from "@/store/chatRoomStore";
import useChatMessageStore from "@/store/chatMessageStore";
import { ChatContact } from "@/types/chat_room";

const SearchContainer: React.FC = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { users } = useUserStore();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  const [commandInput, setCommandInput] = React.useState<string>("");
  const [userItem, setUserItem] = useState<any>();
  const {
    updateChatRoomContact,
    getChatRoomByUserId,
    chatRoomData,
    setChatPreview,
  } = useChatRoomStore();
  const { removeCurrentMsgDataState, getChatMessageByRoomId } =
    useChatMessageStore();

  const onUserClick = (userItem: any) => {
    setChatPreview(false);
    removeCurrentMsgDataState();
    getChatRoomByUserId(userItem.id);
    setUserItem(userItem);
  };

  useEffect(() => {
    if (chatRoomData && chatRoomData.length > 0) {
      const currentUtcTime = new Date().toUTCString();
      const contactData: ChatContact = {
        room_id: chatRoomData[0].chat_room_id,
        room_name: null,
        user_id: userItem.id,
        first_name: userItem.first_name,
        last_name: userItem.last_name,
        email: userItem.email,
        is_group: false,
        last_message: userItem.email,
        updated_at: currentUtcTime,
      };
      updateChatRoomContact(contactData);
      getChatMessageByRoomId(chatRoomData[0].chat_room_id);
      if (setIsFocused) setIsFocused(false);
      setUserItem(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomData]);
  React.useEffect(() => {
    // setResults(mockApiSearch(commandInput))
  }, [commandInput]);

  return (
    <div ref={ref} className="relative flex w-full my-2">
      <Command className="rounded-md border">
        <CommandInput
          placeholder="Type a command or search..."
          value={commandInput}
          onValueChange={setCommandInput}
          onFocus={() => setIsFocused(true)}
        />
        {isFocused && (
          <CommandList>
            <CommandEmpty>
              {commandInput === ""
                ? "Start typing to load results"
                : "No results found."}
            </CommandEmpty>
            <CommandGroup>
              {users.map((user: any) => (
                <CommandItem key={user.id} value={user}>
                  <UserItem
                    key={user.id}
                    data={user}
                    onUserClick={() => onUserClick(user)}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchContainer;
