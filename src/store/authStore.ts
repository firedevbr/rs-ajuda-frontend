import { defineStore } from 'pinia';
import IUser from '@/models/entities/IUser';

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    token: null as string | null,
    user: null as any | null,
  }),
  actions: {
    setToken(token: string | null) {
      this.token = token;
    },
    setUser(user: any | null) {
      this.user = user;
    },
    clearToken() {
      this.token = null;
      this.user = null;
    },
  },
});