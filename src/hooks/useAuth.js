import { useEffect } from 'react';
import { useStore } from '@/store';

export const useAuth = () => {
  const { isAuthenticated, user, initAuth } = useStore(state => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    initAuth: state.initAuth,
  }));

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return { isAuthenticated, user };
};
