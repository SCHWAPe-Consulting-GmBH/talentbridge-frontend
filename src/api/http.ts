import { auth } from '@/firebase/config';
import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.BASE_URL || '',
  baseURL: 'https://api.talentbridge.io/api/v1/',
});


http: instance.interceptors.request.use((config) => {
  const { accessToken } = auth.currentUser;

  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    return Promise.reject(error);
  }
);

export const useHttp = instance;
