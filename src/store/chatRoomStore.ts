import { create } from "zustand";

import {
  getChatRoomContact,
  getChatRoomByUserIdApi,
  getSingleChatRoomApi,
} from "../api/chatRoomApi";
import { ChatContact } from "@/types/chat_room";

type Store = {
  loading: boolean;
  success: boolean;
  error: [] | null;

  chatRoomContact: ChatContact[];
  singleContactData: ChatContact;
  chatRoomData: any;
  chatPreview: boolean;

  getChatRoomContactData: () => Promise<void>;
  updateChatRoomContact: (item: any) => Promise<any>;
  getSingleContactData: (item: any) => Promise<any>;
  getChatRoomByUserId: (user_id: string) => Promise<any>;
  setChatPreview: (flag: boolean) => void;
};

const useChatRoomStore = create<Store>()((set) => ({
  loading: false,
  success: false,
  error: null,
  chatRoomContact: [],
  singleContactData: {} as ChatContact,
  chatRoomData: [],
  chatPreview: true,

  getChatRoomContactData: async () => {
    set({ success: false, loading: true });
    const responseData = await getChatRoomContact();
    set((state: any) => ({
      chatRoomContact: responseData.data,
    }));
  },

  getSingleContactData: async (room_id: string) => {
    set({ success: false, loading: true });
    getSingleChatRoomApi(room_id)
      .then((res) => {
        console.log("getSingleContactData", res.data.data);
        set({
          singleContactData: {
            room_id: res.data.data.id,
            room_name: res.data.data.room_name,
            first_name: res.data.data.room_users[0].first_name,
            last_name: res.data.data.room_users[0].last_name,
            is_group: res.data.data.is_group,
          },
          chatPreview: false,
        });
      })
      .catch((err) => {
        set({ loading: false, chatPreview: false });
      });
  },

  updateChatRoomContact: async (item: ChatContact) => {
    set({ success: false, loading: true });
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
    set({ success: false, loading: true });
    getChatRoomByUserIdApi(user_id)
      .then((resp) => {
        set((state) => ({ chatRoomData: resp.data.data }));
        return resp.data.data;
      })
      .catch((err) => {
        return err;
      });
  },

  setChatPreview: (flag) => {
    set({ chatPreview: flag });
  },
}));

export default useChatRoomStore;
