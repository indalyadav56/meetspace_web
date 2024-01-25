import UserList from "../ChatContactList";
import useChatRoomStore from "@/store/chatRoomStore";

const SideBarContent: React.FC = () => {
  const { chatRoomContact } = useChatRoomStore();

  return <UserList data={chatRoomContact as ChatContactItem[]} />;
};

export default SideBarContent;
