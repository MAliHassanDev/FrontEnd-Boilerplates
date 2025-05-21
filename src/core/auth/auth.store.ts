import { create } from "zustand";

interface Auth {
  accessToken: string;
  role: number;
}

interface AuthState {
  auth: Auth | null;
  setAuth: (auth: Auth) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(set => ({
  auth: null,
  setAuth: (auth: Auth) => {
    set({ auth });
  },
  clearAuth: () => {
    set({ auth: null });
  },
}));
