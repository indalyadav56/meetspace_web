import { create } from "zustand";

import { getAllUsers } from "../api/userApi";

type Store = {
  users: any;
  getAllUsers: () => Promise<any>;
};

const useUserStore = create<Store>()((set) => ({
  users: [],

  getAllUsers: async () => {
    const users = await getAllUsers();
    set({ users: users.data });
  },
}));

export default useUserStore;
