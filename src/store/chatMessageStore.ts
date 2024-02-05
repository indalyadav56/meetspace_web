import { create } from "zustand";
import { getChatMessageByRoomIdApi } from "@/api/chatMessageApi";

type Store = {
  chatMessageData: any;
  getChatMessageByRoomId: (roomId: string) => Promise<any>;
};

const useChatMessageStore = create<Store>()((set) => ({
  chatMessageData: [],

  getChatMessageByRoomId: async (roomId: string) => {
    const res: any = await getChatMessageByRoomIdApi(roomId);
    set({ chatMessageData: res.data.data });
  },
}));

export default useChatMessageStore;
