"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ClipLoader from "react-spinners/ClipLoader";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useChatGroupStore from "@/store/chatGroupStore";
import useUserStore from "@/store/userStore";
import { useTheme } from "next-themes";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import UserItem from "./UserItem";
import { X } from "lucide-react";

const AddGroupForm = () => {
  const { theme } = useTheme();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [onFocus, setOnFocus] = useState(false);

  const { createChatGroup, loading } = useChatGroupStore();
  const { users, removeUsersState, addUsersState } = useUserStore();

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "email must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: any) {
    const userIds = selectedUsers.map((item: any) => item.id);
    values["user_ids"] = userIds;
    createChatGroup(values);
  }

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
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
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

          <div>
            <FormLabel>Users</FormLabel>
            <Command className="border-1">
              <CommandInput
                placeholder="Type a command or search..."
                onFocus={(e) => {
                  setOnFocus(true);
                }}
              />
              {onFocus && (
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
              )}
            </Command>
          </div>

          {!loading && (
            <Button className="w-full h-12" type="submit">
              Add Group
            </Button>
          )}
          {loading && (
            <div className="flex justify-center">
              <ClipLoader
                loading={loading}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </form>
      </Form>
    </main>
  );
};

export default AddGroupForm;
