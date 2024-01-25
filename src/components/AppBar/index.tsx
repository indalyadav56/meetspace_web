"use client";

import { HelpCircle, MessageCircleIcon } from "lucide-react";
import AppBarItem from "./AppBarItem";

const AppBar = () => {
  return (
    <div className="w-16 h-full flex flex-col bg-gray-400 justify-between text-sm">
      <div>
        <AppBarItem Icon={<MessageCircleIcon />} title="Chat" />
      </div>
      <AppBarItem Icon={<HelpCircle />} title="Help" />
    </div>
  );
};

export default AppBar;
