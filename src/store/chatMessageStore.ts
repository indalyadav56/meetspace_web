import { create } from "zustand";

type Store = {};

const useChatMessageStore = create<Store>()((set) => ({}));

export default useChatMessageStore;
