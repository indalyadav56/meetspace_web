import ContactList from "../ContactList";
import useChatRoomStore from "@/store/chatRoomStore";

const SideBarContent: React.FC = () => {
  const { chatRoomContact } = useChatRoomStore();

  return <ContactList data={chatRoomContact as ChatContact[]} />;
};

export default SideBarContent;
