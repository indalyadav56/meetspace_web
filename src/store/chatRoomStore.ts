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
  chatRoomData: any;
  chatPreview: boolean;

  singleRoomData: any;

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
  chatRoomData: [],
  chatPreview: true,
  singleRoomData: {},

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
        set({
          singleRoomData: res.data.data,
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
        };
      }
      return {
        chatRoomContact: [item],
        chatRoomData: [],
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
