import { create } from "zustand";
import { getChatRoomContact } from "../api/chatRoomApi";

type Store = {
  chatRoomContact: ChatContact[];
  singleContactData: any;

  getChatRoomContactData: () => Promise<void>;
  updateChatRoomContact: (item: any) => Promise<any>;
  getSingleContactData: (item: any) => Promise<any>;
};

const useChatRoomStore = create<Store>()((set) => ({
  chatRoomContact: [],
  singleContactData: {},

  getChatRoomContactData: async () => {
    const responseData = await getChatRoomContact();
    set((state: any) => ({
      chatRoomContact: responseData.data,
    }));
  },

  getSingleContactData: async (item: ChatContact) => {
    set((state) => ({ singleContactData: item }));
  },

  updateChatRoomContact: async (item: ChatContact) =>
    set((state) => {
      let contacts: ChatContact[] = [];
      if (state.chatRoomContact) {
        contacts = [...state.chatRoomContact];
        const index = contacts.findIndex((c) => c.id === item?.id);
        if (index) contacts.unshift(item);
      } else {
        contacts.unshift(item);
      }
      return {
        chatRoomContact: contacts,
      };
    }),
}));

export default useChatRoomStore;
