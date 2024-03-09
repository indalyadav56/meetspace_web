import { create } from "zustand";

import {
  getChatRoomContact,
  getChatRoomByUserIdApi,
  getSingleChatRoomApi,
  deleteChatRoomApi,
  startCallApi,
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
  callAccept: boolean;
  callReceiver: boolean;

  startAudioVideoCall: (data: any) => void;
  getChatRoomContactData: () => Promise<void>;
  updateChatRoomContact: (item: any) => Promise<any>;
  updateContactByRoomId: (item: any, reOrder?: boolean) => Promise<any>;
  getSingleContactData: (item: any) => Promise<any>;
  getChatRoomByUserId: (user_id: string) => Promise<any>;
  setChatPreview: (flag: boolean) => void;
  deleteChatGroup: (roomID: string) => Promise<any>;
  deleteContactByRoomId: (roomID: string) => Promise<any>;
  updateContactUserPresence: (user_id: string, update_data: Object) => void;
  setCallAccept: (flag: boolean) => void;
  setCallReceiver: (flag: boolean) => void;
};

const useChatRoomStore = create<Store>()((set) => ({
  loading: false,
  success: false,
  error: null,

  chatRoomContact: [],
  chatRoomData: [],
  chatPreview: true,
  callAccept: false,
  callReceiver: false,
  singleRoomData: {},

  getChatRoomContactData: async () => {
    set({ success: false, loading: true, error: null });
    const responseData = await getChatRoomContact();
    set((state: any) => ({
      chatRoomContact: responseData.data,
    }));
  },

  deleteChatGroup: async (roomID: string) => {
    set({ loading: true, success: false, error: null });
    deleteChatRoomApi(roomID)
      .then((resp: any) => {
        set((state) => ({
          loading: false,
          success: true,
        }));
      })
      .catch((error) => {
        set({ loading: false, success: false, error: [] });
      });
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
          return {
            singleRoomData: {
              id: item.room_id,
              room_name: item.room_name,
              is_group: false,
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
        }
      }
      return {
        singleRoomData: {
          id: item.room_id,
          room_name: item.room_name,
          is_group: false,
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

  updateContactByRoomId: async (item: ChatContact, reOrder = true) => {
    if (reOrder) {
      set((state) => {
        if (state.chatRoomContact) {
          return {
            singleRoomData: {
              id: item.room_id,
              room_name: item.room_name,
              is_group: item.is_group,
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
                (i) => i.room_id !== item.room_id
              ),
            ],
            chatRoomData: [],
            chatPreview: false,
          };
        }
        return {
          singleRoomData: {
            id: item.room_id,
            room_name: item.room_name,
            is_group: item.is_group,
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
          chatPreview: false,
        };
      });
    } else {
      set((state) => {
        const updatedChatRoomContact = state.chatRoomContact.map((contact) => {
          return contact.room_id === item.room_id ? item : contact;
        });
        return {
          chatRoomContact: updatedChatRoomContact,
        };
      });
    }
  },

  deleteContactByRoomId: async (roomId: string) => {
    set((state) => {
      const contactData = state.chatRoomContact.filter(
        (item: ChatContact) => item.room_id !== roomId
      );
      return {
        chatRoomContact: contactData,
        chatPreview: true,
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

  updateContactUserPresence: (user_id, update_data) => {
    set((state) => ({
      chatRoomContact: state.chatRoomContact.map((item) => {
        if (item.user_id === user_id) {
          return { ...item, ...update_data };
        }
        return item;
      }),
    }));
  },

  startAudioVideoCall: (data: any) => {
    startCallApi(data);
  },

  setCallAccept: (flag: boolean) => {
    if (flag) {
      set((state) => ({
        callAccept: true,
      }));
    } else {
      set((state) => ({
        callAccept: false,
      }));
    }
  },

  setCallReceiver: (flag: boolean) => {
    if (flag) {
      set((state) => ({
        callReceiver: true,
      }));
    } else {
      set((state) => ({
        callReceiver: false,
      }));
    }
  },
}));

export default useChatRoomStore;
