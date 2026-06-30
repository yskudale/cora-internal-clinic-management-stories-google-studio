import { create } from 'zustand';
import { Staff } from '../api/types';

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: Staff | null;
  setSession: (staff: Staff) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  currentUser: null,
  setSession: (staff) => set({ isAuthenticated: true, currentUser: staff }),
  clearSession: () => set({ isAuthenticated: false, currentUser: null }),
}));

export const authStore = {
  clearSession: () => {
    useAuthStore.getState().clearSession();
  },
};
