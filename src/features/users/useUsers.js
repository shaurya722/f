import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  getUsersApi,
  getUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from './user.api';

export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsersApi(params),
  });
};

export const useUser = id => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserApi(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User created successfully!');
    },
    onError: () => {
      toast.error('Failed to create user');
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update user');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });
};
