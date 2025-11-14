import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, password: string) => Promise<void>;
  signup: (name: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (name: string, password: string) => {
        // Mock login
        await new Promise((resolve) => setTimeout(resolve, 500));
        const user: User = {
          id: '1',
          name,
        };
        set({ user, isAuthenticated: true });
      },
      signup: async (name: string, password: string) => {
        // Mock signup
        await new Promise((resolve) => setTimeout(resolve, 500));
        const user: User = {
          id: '1',
          name,
        };
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
