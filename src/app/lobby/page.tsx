import { Button } from "@/components/ui/button";
import { Mic, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <div className="flex flex-col justify-between bg-gray-500 rounded-md">
        <video
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          controls
          className="max-h-96 min-w-full rounded-tl-md rounded-tr-md"
        />
        <div className="flex justify-between my-4 mx-2">
          <div className="flex gap-8">
            <Button variant="ghost" size="icon">
              <Video />
            </Button>
            <Button variant="ghost" size="icon">
              <Mic />
            </Button>
          </div>
          <Link href="/meeting">
            <Button>Join Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
