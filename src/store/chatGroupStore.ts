import { create } from "zustand";

import { createChatGroupApi } from "../api/chatGroupApi";

type Store = {
  chatGroupData: any;
  loading: boolean;
  createChatGroup: (data: any) => Promise<any>;
};

const useChatGroupStore = create<Store>()((set) => ({
  loading: false,
  chatGroupData: {},

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
}));

export default useChatGroupStore;
