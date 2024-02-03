import { create } from "zustand";
import { register, login, logout } from "../api/authApi";
import { AxiosError } from "axios";

type Store = {
  success: boolean;
  loading: boolean;
  error: Object[] | null;
  message: string | null;
  authData: Object;

  registerUser: (reqData: any) => Promise<any>;
  loginUser: (reqData: any) => Promise<any>;
  logoutUser: () => Promise<any>;
  resetForm: () => void;
};

const useAuthStore = create<Store>()((set) => ({
  success: false,
  loading: false,
  error: null,
  message: null,
  authData: {},

  registerUser: async (reqData: any) => {
    set({ loading: true });
    register(reqData)
      .then((response) => {
        set({ authData: response.data, loading: false, success: true });
      })
      .catch((err: AxiosError) => {
        const resp = err.response?.data;
        set({ error: resp?.error, message: resp?.message, loading: false });
      });
  },

  loginUser: async (reqData: any) => {
    set({ loading: true });
    login(reqData)
      .then((response) => {
        set({ authData: response.data, loading: false, success: true });
      })
      .catch((err: AxiosError) => {
        const resp = err.response?.data;
        set({ error: resp?.error, message: resp?.message, loading: false });
      });
  },

  logoutUser: async (reqData: any) => {
    set({ loading: true });
    logout(reqData)
      .then((response) => {
        set({ authData: response.data, loading: false, success: true });
      })
      .catch((err: AxiosError) => {
        const resp = err.response?.data;
        set({ error: resp?.error, message: resp?.message, loading: false });
      });
  },

  resetForm: () => {
    set({ error: null, message: null });
  },
}));

export default useAuthStore;
