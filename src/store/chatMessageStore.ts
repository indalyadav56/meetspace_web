import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

import { getChatMessageByRoomIdApi } from "@/api/chatMessageApi";

type Store = {
  chatMessageData: any;

  getChatMessageByRoomId: (roomId: string) => Promise<any>;
  addChatMessage: (data: any) => Promise<any>;
  removeCurrentMsgDataState: () => Promise<any>;
};

const useChatMessageStore = create<Store>()((set) => ({
  chatMessageData: [],

  addChatMessage: async (data: any) => {
    set((state) => {
      if (state.chatMessageData) {
        const chatMessageData = [...state.chatMessageData];
        let lastObject = chatMessageData[chatMessageData.length - 1];

        if (lastObject && Array.isArray(lastObject.chat_message)) {
          lastObject.chat_message.push({
            ...data,
            id: uuidv4(),
          });
        }
        return {
          chatMessageData: chatMessageData,
        };
      }
      return {
        chatMessageData: [
          {
            timestamp: "Today",
            chat_message: [
              {
                ...data,
                id: uuidv4(),
              },
            ],
          },
        ],
      };
    });
  },

  getChatMessageByRoomId: async (roomId: string) => {
    const res: any = await getChatMessageByRoomIdApi(roomId);
    set({ chatMessageData: res.data.data });
  },
  removeCurrentMsgDataState: async () => {
    set({ chatMessageData: [] });
  },
}));

export default useChatMessageStore;
