import { create } from "zustand";

type Store = {};

const useAuthStore = create<Store>()((set) => ({}));

export default useAuthStore;
