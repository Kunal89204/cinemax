import { create } from "zustand";
import { createAuthSlice, AuthSlice } from "./authSlice";

type AppState = AuthSlice;

export const useStore = create<AppState>()((...a) => ({
  ...createAuthSlice(...a),
}));
