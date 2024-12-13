import { useHttp } from '@/api/http';

export const registerStudent = async (data) => {
  try {
      const res = await useHttp.post(`/auth/register/student`, data);
      console.log("реєстрація успішна");
      
    return res;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
