import { create } from "zustand";

import { getAllUsers, getUserProfileApi, updateUserApi } from "../api/userApi";
import { AxiosError } from "axios";

type CurrentUser = {
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  theme: string;
};

type Store = {
  users: any;
  currentUser: CurrentUser;
  success: boolean;
  loading: boolean;
  message: string | null;
  error: Object[] | null;

  getAllUsers: () => Promise<any>;
  getUserProfile: () => Promise<any>;
  updateUser: (updateData: any) => Promise<any>;
};

const useUserStore = create<Store>()((set) => ({
  users: [],
  currentUser: {} as CurrentUser,
  success: false,
  loading: false,
  error: null,
  message: null,

  getAllUsers: async () => {
    const users = await getAllUsers();
    set({ users: users.data });
  },

  getSingleUser: async () => {
    const users = await getAllUsers();
    set({ users: users.data });
  },

  getUserProfile: async () => {
    getUserProfileApi()
      .then((response) => {
        set({ currentUser: response.data, loading: false, success: true });
      })
      .catch((err: any) => {
        const resp: any = err.response?.data;
        set({ error: resp?.error, message: resp?.message, loading: false });
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
        set({ error: resp?.error, message: resp?.message, loading: false });
      });
  },
}));

export default useUserStore;
