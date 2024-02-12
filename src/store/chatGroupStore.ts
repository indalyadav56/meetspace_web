import { create } from "zustand";

import {
  createChatGroupApi,
  getChatGroupMembersApi,
} from "../api/chatGroupApi";

type Store = {
  chatGroupData: any;
  loading: boolean;
  error: string | null;
  success: boolean;
  chatGroupMembers: any;

  createChatGroup: (data: any) => Promise<any>;
  getChatGroupMembers: (room_id: string) => Promise<any>;
};

const useChatGroupStore = create<Store>()((set) => ({
  error: null,
  loading: false,
  success: false,
  chatGroupData: {},
  chatGroupMembers: [],

  createChatGroup: async (data: AddChatGroup) => {
    set({ loading: true });
    createChatGroupApi(data)
      .then((resp: any) => {
        set((state) => ({
          loading: false,
          chatGroupData: resp.data.data,
        }));
      })
      .catch((error) => {
        set({ loading: false });
      });
  },
  getChatGroupMembers: async (room_id: string) => {
    set({ loading: true });
    getChatGroupMembersApi(room_id).then((resp) => {
      set((state) => ({
        chatGroupMembers: resp.data.data,
      }));
    });
    set({ loading: false });
  },
}));

export default useChatGroupStore;
