import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import DynamicChatArea from "./[roomid]/page";

export default function ChatPage() {
  return (
    <div className="h-screen w-screen flex bg-fuchsia-400">
      <div className="flex flex-col w-2/4">
        {Array.from({ length: 10 }, (_, index) => (
          <>
            <Link href={`/chats/custom_Room_id-${index}`}>
              <Button>Dynamic Chat area Go to</Button>
            </Link>
          </>
        ))}
      </div>

      <div className="w-2/4">
        <DynamicChatArea />
      </div>
    </div>
  );
}
