import { api, endpoints } from '@/api';

export const loginApi = async credentials => {
  return api.post(endpoints.login, credentials);
};

export const registerApi = async userData => {
  return api.post(endpoints.register, userData);
};

export const getProfileApi = async () => {
  return api.get(endpoints.profile);
};
