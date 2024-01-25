import { useEffect } from "react";

import SideBarHeader from "./SideBarHeader";
import SideBarContent from "./SideBarContent";
import useChatRoomStore from "@/store/chatRoomStore";

const SideBar = () => {
  const { getChatRoomContactData } = useChatRoomStore();

  useEffect(() => {
    getChatRoomContactData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-96 flex flex-col border-r-2">
      <SideBarHeader />
      <SideBarContent />
    </div>
  );
};

export default SideBar;
