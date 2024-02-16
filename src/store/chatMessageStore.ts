import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

import { addChatMessageApi, getChatMessageByRoomIdApi } from "@/api/chatMessageApi";

type Store = {
  chatMessageData: any;
  success: boolean;
  loading: boolean;
  error: boolean;

  getChatMessageByRoomId: (roomId: string) => Promise<any>;
  addChatMessage: (data: any) => Promise<any>;
  addChatRoomMessage: (data: any) => Promise<any>;
  removeCurrentMsgDataState: () => Promise<any>;
};

const useChatMessageStore = create<Store>()((set) => ({
  chatMessageData: [],
  success: false,
  loading: false,
  error: false,

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

  addChatRoomMessage: async (data:any)=>{
    set({loading: true, success: false, error: false})
    
    addChatMessageApi(data).then((result) => {
      set({loading: false, success: true, error: false})
    }).catch((err) => {
      set({loading: false, success: false, error: true})
    });
  },

  getChatMessageByRoomId: async (roomId: string) => {
    getChatMessageByRoomIdApi(roomId)
      .then((resp: any) => {
        set({ chatMessageData: resp.data?.data, success: true });
      })
      .catch((err) => {
        set({ success: false });
      });
  },

  removeCurrentMsgDataState: async () => {
    set({ chatMessageData: [] });
  },
  
}));

export default useChatMessageStore;
