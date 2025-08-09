import { StateCreator } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface AuthSlice {
  sessionId: string | null;
  isSessionLoading: boolean;
  loadSessionId: () => Promise<void>;
  setSessionId: (id: string) => Promise<void>;
  clearSessionId: () => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  sessionId: null,
  isSessionLoading: true, // New flag

  loadSessionId: async () => {
    set({ isSessionLoading: true });
    const storedId = await AsyncStorage.getItem("session_id");
    set({ sessionId: storedId, isSessionLoading: false });
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

