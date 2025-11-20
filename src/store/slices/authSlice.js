import { tokenStore } from '@/utils/tokenStore';

export const createAuthSlice = set => ({
  isAuthenticated: false,
  token: null,
  user: null,

  login: token => {
    tokenStore.set(token);
    set({ isAuthenticated: true, token }, false, 'auth/login');
  },

  setUser: user => {
    set({ user }, false, 'auth/setUser');
  },

  logout: () => {
    tokenStore.delete();
    set(
      { isAuthenticated: false, token: null, user: null },
      false,
      'auth/logout'
    );
  },

  initAuth: () => {
    const token = tokenStore.get();
    if (token) {
      set({ isAuthenticated: true, token }, false, 'auth/initAuth');
    }
  },
});
