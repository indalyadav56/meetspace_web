import { create } from "zustand";

import { getChatRoomContact, getChatRoomByUserIdApi } from "../api/chatRoomApi";
import { ChatContact } from "@/types/chat_room";

type Store = {
  chatRoomContact: ChatContact[];
  singleContactData: ChatContact;
  chatRoomData: any;
  chatPreview: boolean;

  getChatRoomContactData: () => Promise<void>;
  updateChatRoomContact: (item: any) => Promise<any>;
  getSingleContactData: (item: any) => Promise<any>;
  getChatRoomByUserId: (user_id: string) => Promise<any>;
};

const useChatRoomStore = create<Store>()((set) => ({
  chatRoomContact: [],
  singleContactData: {
    room_id: "",
    user_id: "",
    email: "",
  },
  chatRoomData: [],
  chatPreview: false,

  getChatRoomContactData: async () => {
    const responseData = await getChatRoomContact();
    set((state: any) => ({
      chatRoomContact: responseData.data,
    }));
  },

  getSingleContactData: async (item: ChatContact) => {
    set((state) => ({ singleContactData: item, chatPreview: true }));
  },

  updateChatRoomContact: async (item: ChatContact) => {
    set((state) => {
      if (state.chatRoomContact) {
        return {
          chatRoomContact: [
            item,
            ...state.chatRoomContact.filter((i) => i.user_id !== item.user_id),
          ],
          chatRoomData: [],
          singleContactData: item,
        };
      }
      return {
        chatRoomContact: [item],
        chatRoomData: [],
        singleContactData: item,
      };
    });
  },

  getChatRoomByUserId: async (user_id: string) => {
    getChatRoomByUserIdApi(user_id)
      .then((resp) => {
        set((state) => ({ chatRoomData: resp.data.data }));
        return resp.data.data;
      })
      .catch((err) => {
        return err;
      });
  },
}));

export default useChatRoomStore;
