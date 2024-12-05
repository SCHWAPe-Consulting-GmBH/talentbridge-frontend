import axios from 'axios';
import { accessTokenService } from '@/services/accessTokenService';

const instance = axios.create({
  // baseURL: process.env.BASE_URL || '',
  baseURL: 'http://3.71.18.123:8000/api/v1',
});

instance.interceptors.request.use((config) => {
  const accessToken = accessTokenService.get();

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
