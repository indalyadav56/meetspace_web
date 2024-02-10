"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
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
import UserAvatar from "./UserAvatar";
import useChatRoomStore from "@/store/chatRoomStore";

const AddGroupForm = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { createChatGroup, loading } = useChatGroupStore();
  const { users } = useUserStore();

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
    values["user_ids"] = selectedUsers;
    createChatGroup(values);
  }

  const onChange = (selectedOpts: any) => {
    const userIds = selectedOpts.map((opt: any) => opt.id);
    setSelectedUsers(userIds);
  };

  const formatUserLabel = ({ first_name, last_name, email }: any) => (
    <div className="flex h-16 gap-2 w-full text-red-500 text-sm">
      <UserAvatar size="sm" />
      <div className="flex flex-col">
        <span>
          {first_name + " "}
          {last_name}
        </span>
        <span>{email}</span>
      </div>
    </div>
  );

  function CustomInput() {
    return <Input className="h-16 w-full" />;
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

          <div>
            <FormLabel>Users</FormLabel>
            <Select
              // components={{ Input: CustomInput }}
              options={users}
              closeMenuOnSelect={false}
              onChange={onChange}
              getOptionValue={(option: any) => option.id}
              getOptionLabel={(option) => option.email}
              formatOptionLabel={formatUserLabel}
              isMulti
            />
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
