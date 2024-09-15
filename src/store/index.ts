import { create } from 'zustand';

interface UserData {
  username: string;
}

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  user: UserData | null;
  setToken: (token: string) => void;
  setUser: (user: UserData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoggedIn: false,
  user: null,
  setToken: (token) => set(() => ({ token, isLoggedIn: true })),
  setUser: (user) => set(() => ({ user })),
  logout: () => set(() => ({ token: null, isLoggedIn: false, user: null })),
}));
