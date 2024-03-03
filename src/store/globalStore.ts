import { create } from "zustand";

type Store = {};

const useGlobalStore = create<Store>()((set) => {});

export default useGlobalStore;
