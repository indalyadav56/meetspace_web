import { create } from "zustand";
import { getChatRoomContact } from "../api/chatRoomApi";

type Store = {
  chatRoomContact: ChatContactItem[];
  getChatRoomContactData: () => Promise<void>;
  updateChatRoomContact: (item: any) => Promise<any>;
};

const useChatRoomStore = create<Store>()((set) => ({
  chatRoomContact: [],

  getChatRoomContactData: async () => {
    const responseData = await getChatRoomContact();
    set((state: any) => ({
      chatRoomContact: responseData.data,
    }));
  },

  updateChatRoomContact: async (item: ChatContactItem) =>
    set((state) => {
      let contacts: ChatContactItem[] = [];
      if (state.chatRoomContact) {
        contacts = [...state.chatRoomContact];

        const userIndex = contacts.findIndex((c) => c.user_id === item?.id);

        const chatRoomIndex = contacts.findIndex(
          (c) => c.room_id === item?.room_id
        );

        console.log("state itemIndex: item", contacts);
        console.log("itemIndex: item", item);
        console.log("userIndex", userIndex);
        console.log("itemIndex", chatRoomIndex);
        if (userIndex) {
          contacts.unshift(item);
        }
        if (chatRoomIndex < 0) {
          contacts.unshift(item);
        }
      } else {
        contacts.unshift(item);
      }
      return {
        chatRoomContact: contacts,
      };
    }),
}));

export default useChatRoomStore;
