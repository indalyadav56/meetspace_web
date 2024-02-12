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
  authData: any;
  actionType: "register" | "login" | "logout" | null;

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
  actionType: null,

  registerUser: async (reqData: any) => {
    set({ loading: true, success: false });
    register(reqData)
      .then((response) => {
        set({
          authData: response.data,
          loading: false,
          success: true,
          actionType: "register",
        });
      })
      .catch((err: any) => {
        const resp = err.response?.data;
        set({
          error: resp?.error,
          message: resp?.message,
          loading: false,
          success: false,
        });
      });
  },

  loginUser: async (reqData: any) => {
    set({ loading: true, success: false });
    login(reqData)
      .then((response) => {
        set({
          authData: response.data,
          loading: false,
          success: true,
          actionType: "login",
        });
      })
      .catch((err: any) => {
        const resp = err.response?.data;
        set({
          error: resp?.error,
          message: resp?.message,
          loading: false,
          success: false,
        });
      });
  },

  logoutUser: async () => {
    set({ loading: true });
    logout({
      refresh_token: CookieService.getCookie(constants.token.REFRESH_TOKEN),
    })
      .then((response) => {
        CookieService.removeCookie(constants.token.ACCESS_TOKEN);
        set({
          authData: response.data,
          loading: false,
          success: true,
          actionType: "logout",
        });
      })
      .catch((err: any) => {
        const resp = err.response?.data;
        set({ error: resp?.error, message: resp?.message, loading: false });
      });
  },

  resetForm: () => {
    set({ error: null, message: null });
  },
}));

export default useAuthStore;
