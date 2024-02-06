import { create } from "zustand";
import { getChatMessageByRoomIdApi } from "@/api/chatMessageApi";

type Store = {
  chatMessageData: any;

  getChatMessageByRoomId: (roomId: string) => Promise<any>;
  addChatMessage: (data: any) => Promise<any>;
};

const useChatMessageStore = create<Store>()((set) => ({
  chatMessageData: [],

  addChatMessage: async (data: any) => {
    set((state) => {
      const chatMessageData = [...state.chatMessageData];

      let lastObject = chatMessageData[chatMessageData.length - 1];

      if (lastObject && Array.isArray(lastObject.chat_message)) {
        lastObject.chat_message.push({
          ...data,
          sender: {
            id: "test",
            first_name: "test",
            last_name: "test",
          },
        });
      }

      return {
        chatMessageData: chatMessageData,
      };
    });
  },

  getChatMessageByRoomId: async (roomId: string) => {
    const res: any = await getChatMessageByRoomIdApi(roomId);
    set({ chatMessageData: res.data.data });
  },
}));

export default useChatMessageStore;
