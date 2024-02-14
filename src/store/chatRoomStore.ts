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
  updateContactByRoomId: (item: any) => Promise<any>;
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
    set({ success: false, loading: true, error: null });
    const responseData = await getChatRoomContact();
    set((state: any) => ({
      chatRoomContact: responseData.data,
    }));
  },

  getSingleContactData: async (room_data: ChatContact) => {
    set({
      success: false,
      loading: true,
      error: null,
    });
    getSingleChatRoomApi(room_data.room_id)
      .then((res) => {
        set({
          success: true,
          singleRoomData: res.data.data,
          chatPreview: false,
        });
      })
      .catch((err) => {
        set({
          success: false,
          loading: false,
          error: [],
          chatPreview: false,
          singleRoomData: {
            id: room_data.room_id,
            room_name: room_data.room_name,
            is_group: room_data.is_group,
            room_users: [
              {
                id: room_data.user_id,
                first_name: room_data.first_name,
                last_name: room_data.last_name,
                email: room_data.email,
              },
            ],
          },
        });
      });
  },

  updateChatRoomContact: async (item: ChatContact) => {
    set({
      success: false,
      loading: true,
    });
    set((state) => {
      if (state.chatRoomContact) {
        if (!item.is_group) {
          console.log("currentuser item in contactlist", item);
          return {
            singleRoomData: {
              id: item.room_id,
              room_name: item.room_name,
              room_users: [
                {
                  id: item.user_id,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  email: item.email,
                },
              ],
            },
            chatRoomContact: [
              item,
              ...state.chatRoomContact.filter(
                (i) => i.user_id !== item.user_id
              ),
            ],
            chatRoomData: [],
          };
        } else {
          return {
            chatRoomContact: [
              item,
              ...state.chatRoomContact.filter(
                (i) => i.room_id !== item.room_id
              ),
            ],
            chatRoomData: [],
          };
        }
      }
      return {
        singleRoomData: {
          id: item.room_id,
          room_name: item.room_name,
          room_users: [
            {
              id: item.user_id,
              first_name: item.first_name,
              last_name: item.last_name,
              email: item.email,
            },
          ],
        },
        chatRoomContact: [item],
        chatRoomData: [],
      };
    });
  },

  updateContactByRoomId: async (item: ChatContact) => {
    set({ success: false, loading: true });
    set((state) => {
      if (state.chatRoomContact) {
        return {
          chatRoomContact: [
            item,
            ...state.chatRoomContact.filter((i) => i.room_id !== item.room_id),
          ],
          chatRoomData: [],
          chatPreview: false,
          singleRoomData: {
            id: item.room_id,
            room_name: item.room_name,
            is_group: true,
          },
        };
      }
      return {
        chatRoomContact: [item],
        chatRoomData: [],
        chatPreview: false,
        singleRoomData: {
          id: item.room_id,
          room_name: item.room_name,
          is_group: true,
        },
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
