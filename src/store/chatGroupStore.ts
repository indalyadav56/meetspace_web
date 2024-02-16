import { create } from "zustand";

import {
  createChatGroupApi,
  getChatGroupMembersApi,
  updateChatGroupApi,
} from "../api/chatGroupApi";

type Store = {
  chatGroupData: any;
  loading: boolean;
  error: string | null;
  success: boolean;
  chatGroupMembers: any;

  createChatGroup: (data: any) => Promise<any>;
  getChatGroupMembers: (room_id: string) => Promise<any>;
  updateChatGroup: (data: any) => Promise<any>;
  
};

const useChatGroupStore = create<Store>()((set) => ({
  error: null,
  loading: false,
  success: false,
  chatGroupData: {},
  chatGroupMembers: [],

  createChatGroup: async (data: AddChatGroup) => {
    set({ loading: true, success: false });
    createChatGroupApi(data)
      .then((resp: any) => {
        set((state) => ({
          loading: false,
          success: true,
          chatGroupData: resp.data.data,
        }));
      })
      .catch((error) => {
        set({ loading: false, success: false });
      });
  },

  updateChatGroup: async (data: any) => {
    set({ loading: true, success: false });
    updateChatGroupApi(data)
      .then((resp: any) => {
        set((state) => ({
          loading: false,
          success: true,
        }));
      })
      .catch((error) => {
        set({ loading: false, success: false });
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
