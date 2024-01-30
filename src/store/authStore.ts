import { create } from "zustand";
import { register } from "../api/authApi";
import { AxiosError } from "axios";

type Store = {
  success: boolean;
  loading: boolean;
  error: Object[] | null;
  message: string | null;
  authData: Object;

  registerUser: (reqData: any) => Promise<any>;
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
}));

export default useAuthStore;
