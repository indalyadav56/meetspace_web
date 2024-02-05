import { create } from "zustand";
import { AxiosError } from "axios";

import { register, login, logout } from "../api/authApi";
import CookieService from "@/lib/cookies";
import constants from "@/constants";

type Store = {
  success: boolean;
  loading: boolean;
  error: Object[] | null;
  message: string | null;
  authData: Object;
  actionType: "register" | "login" | "logout" | null;

  registerUser: (reqData: any) => Promise<any>;
  loginUser: (reqData: any) => Promise<any>;
  logoutUser: (data: any) => Promise<any>;
  resetForm: () => void;
};

const useAuthStore = create<Store>()((set) => ({
  success: false,
  loading: false,
  error: null,
  message: null,
  authData: {},
  actionType: null,

  registerUser: async (reqData: any) => {
    set({ loading: true });
    register(reqData)
      .then((response) => {
        set({
          authData: response.data,
          loading: false,
          success: true,
          actionType: "register",
        });
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
        set({
          authData: response.data,
          loading: false,
          success: true,
          actionType: "login",
        });
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
        CookieService.removeCookie(constants.token.ACCESS_TOKEN);
        set({
          authData: response.data,
          loading: false,
          success: true,
          actionType: "logout",
        });
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
