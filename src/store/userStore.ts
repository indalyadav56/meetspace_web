import { create } from "zustand";

import {
  getAllUsers,
  getSingleUserApi,
  getUserProfileApi,
  updateUserApi,
} from "../api/userApi";
import { Users } from "lucide-react";

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  theme: string;
};

type Store = {
  users: any;
  currentUser: User;
  singleUser: User;
  success: boolean;
  loading: boolean;
  message: string | null;
  error: Object[] | null;

  getAllUsers: () => Promise<any>;
  getUserProfile: () => Promise<any>;
  updateUser: (updateData: any) => Promise<any>;
  getSingleUser: (user_id: string) => Promise<any>;
  addUsersState: (user: any) => Promise<any>;
  removeUsersState: (user_id: string) => Promise<any>;
  updateUserPresence: (user_id: string, update_data: Object) => void;
  updateCurrentUserProfile: (data: Object) => void;
};

const useUserStore = create<Store>()((set) => ({
  users: [],
  currentUser: {} as User,
  singleUser: {} as User,
  success: false,
  loading: false,
  error: null,
  message: null,

  getAllUsers: async () => {
    set({ loading: true, success: false });
    const users = await getAllUsers();
    set({ users: users.data, loading: false, success: false });
  },

  getSingleUser: async (userId: string) => {
    set({ loading: true, success: false });
    getSingleUserApi(userId)
      .then((resp) => {
        set({ singleUser: resp.data.data, loading: false, success: false });
      })
      .catch((err) => {
        set({ loading: false, success: false });
      });
  },

  getUserProfile: async () => {
    set({ loading: true, success: false });
    await getUserProfileApi()
      .then((response) => {
        set({ currentUser: response.data, loading: false, success: true });
      })
      .catch((err: any) => {
        const resp: any = err.response?.data;
        set({
          error: resp?.error,
          message: resp?.message,
          success: false,
          loading: false,
        });
      });
  },

  updateUser: async (updateData: any) => {
    set({ loading: true, success: false, error: null });
    updateUserApi(updateData)
      .then((response) => {
        set({ currentUser: response.data, loading: false, success: true });
      })
      .catch((err: any) => {
        const resp: any = err.response?.data;
        set({
          error: resp?.error,
          message: resp?.message,
          success: false,
          loading: false,
        });
      });
  },

  addUsersState: async (user: any) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },

  removeUsersState: async (user_id: string) => {
    set((state) => {
      if (state.users) {
        let users = state.users.filter((item: any) => item.id !== user_id);
        return {
          users: users,
        };
      }
      return {
        users: [],
      };
    });
  },

  updateUserPresence: (user_id, update_data) => {
    set((state) => ({
      users: state.users.map((item: any) => {
        if (item.id === user_id) {
          return { ...item, ...update_data };
        }
        return item;
      }),
    }));
  },

  updateCurrentUserProfile: (data) => {
    set((state) => ({
      currentUser: { ...state.currentUser, ...data },
    }));
  },
}));

export default useUserStore;
