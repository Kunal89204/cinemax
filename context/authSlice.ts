import { StateCreator } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthSlice {
  sessionId: string | null;
  loadSessionId: () => Promise<void>;
  setSessionId: (id: string) => Promise<void>;
  clearSessionId: () => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  sessionId: null,

  loadSessionId: async () => {
    const storedId = await AsyncStorage.getItem("session_id");
    set({ sessionId: storedId });
  },

  setSessionId: async (id) => {
    await AsyncStorage.setItem("session_id", id);
    set({ sessionId: id });
  },

  clearSessionId: async () => {
    await AsyncStorage.removeItem("session_id");
    set({ sessionId: null });
  },
});
