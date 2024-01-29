import { create } from "zustand";
import { register } from "../api/authApi";

type Store = {
  authData: any;
  registerUser: (reqData: any) => Promise<any>;
};

const useAuthStore = create<Store>()((set) => ({
  authData: {},

  registerUser: async (reqData: any) => {
    const resp = await register(reqData);
    set({ authData: resp });
  },
}));

export default useAuthStore;
