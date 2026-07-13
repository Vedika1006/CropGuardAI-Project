import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/lib/config';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (name: string, password: string) => Promise<void>;
  signup: (name: string, password: string) => Promise<void>;
  logout: () => void;
}

const authRequest = async (path: string, name: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || 'Authentication failed');
  }
  return data as { user: User; token: string };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (name: string, password: string) => {
        const { user, token } = await authRequest('/api/auth/login', name, password);
        set({ user, token, isAuthenticated: true });
      },
      signup: async (name: string, password: string) => {
        const { user, token } = await authRequest('/api/auth/register', name, password);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
