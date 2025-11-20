import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi } from './auth.api';
import { useStore } from '@/store';
import { constants } from '@/constants';

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useStore(state => state.login);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: data => {
      if (data.access_token) {
        login(data.access_token);
        toast.success('Login successful!');
        navigate(constants.routes.dashboard);
      }
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};
