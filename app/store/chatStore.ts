import { create } from "zustand";

interface Message {
  role: string;
  content: string;
}

interface ChatStore {
  messages: Message[];
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
}));