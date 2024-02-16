import { create } from "zustand";

import {
  getAllUsers,
  getSingleUserApi,
  getUserProfileApi,
  updateUserApi,
} from "../api/userApi";

type User = {
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
}));

export default useUserStore;
