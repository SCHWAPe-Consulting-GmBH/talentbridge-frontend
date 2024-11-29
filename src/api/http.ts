import axios from 'axios';
import { accessTokenService } from '@/services/accessTokenService';

const instance = axios.create({
  baseURL: process.env.BASE_URL || '',
});

instance.interceptors.request.use(
  config => {
    const accessToken = accessTokenService.get()

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`
    }

    return config
  }
)

instance.interceptors.response.use(
  res => res.data,
  async error => {
    return Promise.reject(error);
  }
)

export const useHttp = instance