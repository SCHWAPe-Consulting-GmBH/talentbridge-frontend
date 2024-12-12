import { useHttp } from '@/api/http';

export const getHomeworkForStudent = async () => {
  try {
    const data = await useHttp.get(`/student/homework`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const getMeetingForStudent = async () => {
  try {
    const data = await useHttp.get(`/student/meeting`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const getDocumentForStudent = async () => {
  try {
    const data = await useHttp.get(`/student/document`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
