import { create } from "zustand";
import { getChatRoomContact, getChatRoomByUserIdApi } from "../api/chatRoomApi";

type Store = {
  chatRoomContact: ChatContact[];
  singleContactData: any;
  chatRoomData: any;

  getChatRoomContactData: () => Promise<void>;
  updateChatRoomContact: (item: any) => Promise<any>;
  getSingleContactData: (item: any) => Promise<any>;
  getChatRoomByUserId: (user_id: string) => Promise<any>;
};

const useChatRoomStore = create<Store>()((set) => ({
  chatRoomContact: [],
  singleContactData: {},
  chatRoomData: [],

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
        const index = contacts.findIndex((c) => {
          if (!c.room_id && c.id === item.id) return c;
        });
        if (index) contacts.unshift(item);
      } else {
        contacts.unshift(item);
      }
      return {
        chatRoomContact: contacts,
      };
    }),

  getChatRoomByUserId: async (user_id: string) => {
    getChatRoomByUserIdApi(user_id)
      .then((resp) => {
        set((state) => ({ chatRoomData: resp.data.data }));
      })
      .catch((err) => {});
  },
}));

export default useChatRoomStore;
