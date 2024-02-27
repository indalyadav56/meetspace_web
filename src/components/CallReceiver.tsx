import React from "react";
import { Button } from "./ui/button";
import animationData from "../assets/chat.json";
import Lottie from "react-lottie";
import Link from "next/link";

const CallReceiver = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <main className="absolute bottom-8 right-8 rounded-md flex flex-col justify-between bg-slate-500 w-96 h-80">
      <div className="flex-1 bg-red-700 w-full rounded-md">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <div className="flex justify-between p-2 bg-red-400">
        <Button>Left</Button>
        <Link href="/meeting">
          <Button>Join Now</Button>
        </Link>
      </div>
    </main>
  );
};

export default CallReceiver;
