import { useHttp } from '@/api/http';

export const searchUsers = async (searchQuery) => {
  try {
    const data = await useHttp.get(
      `/user/?page_size=10&page=1&search=${searchQuery}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
