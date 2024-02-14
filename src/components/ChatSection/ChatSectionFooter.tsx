"use client";

import React from "react";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import constants from "../../constants";
import { getUserIdFromToken } from "../../lib/jwt";
import useChatRoomStore from "@/store/chatRoomStore";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import useUserStore from "@/store/userStore";

type ChatSectionFooterProps = {
  socket: WebSocket | null;
};

const formSchema = z.object({
  content: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
});

const ChatSectionFooter: React.FC<ChatSectionFooterProps> = ({ socket }) => {
  const { currentUser } = useUserStore();
  const { singleRoomData } = useChatRoomStore();

  function getCurrentUtcTime() {
    const now = new Date();
    // Format the date and time according to UTC time zone
    const utcString = now.toISOString().replace("Z", "");
    return utcString;
  }

  const sendMessage = (content: string) => {
    if (socket) {
      if (singleRoomData?.is_group) {
        socket.send(
          JSON.stringify({
            event: constants.event.CHAT_MESSAGE_SENT,
            data: {
              content: content,
              is_group: singleRoomData?.is_group,
              room_id: singleRoomData.id,
              room_name: singleRoomData?.room_name,
              updated_at: getCurrentUtcTime(),
              sender_user: {
                ...currentUser,
              },
            },
          })
        );
      } else {
        socket.send(
          JSON.stringify({
            event: constants.event.CHAT_MESSAGE_SENT,
            data: {
              content: content,
              is_group: singleRoomData?.is_group,
              room_name: singleRoomData?.room_name,
              room_id: singleRoomData.id,
              updated_at: getCurrentUtcTime(),
              receiver_user: {
                id: singleRoomData?.room_users?.[0]?.id,
                first_name: singleRoomData?.room_users[0]?.first_name,
                last_name: singleRoomData?.room_users?.[0]?.last_name,
                email: singleRoomData?.room_users?.[0].email,
              },
              sender_user: {
                ...currentUser,
              },
            },
          })
        );
      }
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: any) {
    sendMessage(values.content);
    form.reset();
  }

  return (
    <div className="flex w-3/4 ml-auto mr-auto p-4">
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-2 "
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Enter message..."
                    className="h-14"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            variant="outline"
            className="h-14 w-14"
          >
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatSectionFooter;
