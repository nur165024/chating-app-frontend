import { create } from 'zustand';
import { STORAGE_KEYS, storage } from '../utils/storage';

export const useAuthStore = create((set) => ({
  user: storage.get(STORAGE_KEYS.USER),
  token: storage.get(STORAGE_KEYS.TOKEN),
  isAuthenticated: !!storage.get(STORAGE_KEYS.TOKEN),

  setAuth: (user, token) => {
    storage.set(STORAGE_KEYS.USER, user);
    storage.set(STORAGE_KEYS.TOKEN, token);
    set({ user, token, isAuthenticated: true });
  },

  updateUser: (userData) => {
    storage.set(STORAGE_KEYS.USER, userData);
    set({ user: userData });
  },

  logout: () => {
    storage.clear();
    set({ user: null, token: null, isAuthenticated: false });
  }
}));
