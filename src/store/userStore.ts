import { create } from "zustand";

import { getAllUsers, getUserProfileApi, updateUserApi } from "../api/userApi";
import { AxiosError } from "axios";

type Store = {
  users: any;
  currentUser: any;
  success: boolean;
  loading: boolean;
  error: Object[] | null;
  getAllUsers: () => Promise<any>;
  getUserProfile: () => Promise<any>;
  updateUser: (updateData: any) => Promise<any>;
};

const useUserStore = create<Store>()((set) => ({
  users: [],
  currentUser: {},
  success: false,
  loading: false,
  error: null,

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
      .catch((err: AxiosError) => {
        const resp = err.response?.data;
        set({ error: resp?.error, message: resp?.message, loading: false });
      });
  },

  updateUser: async (updateData: any) => {
    set({ loading: true, success: false, error: null }); // Reset success and error states for updateUser
    updateUserApi(updateData)
      .then((response) => {
        set({ currentUser: response.data, loading: false, success: true });
      })
      .catch((err: AxiosError) => {
        const resp = err.response?.data;
        set({ error: resp?.error, message: resp?.message, loading: false });
      });
  },
}));

export default useUserStore;
