import { useQuery } from '@tanstack/react-query';
import { getProfileApi } from './auth.api';
import { useStore } from '@/store';

export const useProfile = () => {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const setUser = useStore(state => state.setUser);

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    enabled: isAuthenticated,
    onSuccess: data => {
      setUser(data);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
