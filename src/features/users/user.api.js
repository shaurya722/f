import { api, endpoints } from '@/api';

export const getUsersApi = async params => {
  return api.get(endpoints.users, { params });
};

export const getUserApi = async id => {
  return api.get(endpoints.user(id));
};

export const createUserApi = async userData => {
  return api.post(endpoints.users, userData);
};

export const updateUserApi = async ({ id, ...userData }) => {
  return api.put(endpoints.user(id), userData);
};

export const deleteUserApi = async id => {
  return api.delete(endpoints.user(id));
};
