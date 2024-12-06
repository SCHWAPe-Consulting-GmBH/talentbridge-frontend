import { useHttp } from '@/api/http';

export const getHomeworkByStudentId = async (studentId) => {
  try {
    const data = await useHttp.get(`/student/homework/${studentId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const getMeetingByStudentId = async (studentId) => {
  try {
    const data = await useHttp.get(`/student/meeting/${studentId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const getDocumentByStudentId = async (studentId) => {
  try {
    const data = await useHttp.get(`/student/document/${studentId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
