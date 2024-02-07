import { create } from "zustand";

import {
  createChatGroupApi,
  getChatGroupMembersApi,
} from "../api/chatGroupApi";

type Store = {
  chatGroupData: any;
  loading: boolean;
  chatGroupMembers: any;

  createChatGroup: (data: any) => Promise<any>;
  getChatGroupMembers: (data: any) => Promise<any>;
};

const useChatGroupStore = create<Store>()((set) => ({
  loading: false,
  chatGroupData: {},
  chatGroupMembers: [],

  createChatGroup: async (data: AddChatGroup) => {
    set({ loading: true });
    try {
      const resp = await createChatGroupApi(data);
      set((state) => ({
        loading: false,
        chatGroupData: resp.data,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
  getChatGroupMembers: async (room_id: string) => {
    set({ loading: true });
    getChatGroupMembersApi(room_id).then((resp) => {
      set((state) => ({
        chatGroupMembers: resp.data.data,
      }));
    });
  },
}));

export default useChatGroupStore;
