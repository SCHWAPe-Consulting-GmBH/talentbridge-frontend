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

export const addDocumentForStudent = async (
  document,
  document_type_id,
  uploader_type = 'student'
) => {
  try {
    const data = await useHttp.post(
      `/student/document?document_type_id=${document_type_id}&uploader_type =${uploader_type}`,
      document
    );
    return data;
  } catch (error) {
    console.error('Error creating coach:', error);
  }
};

export const finishHomeworkForStudent = async (homework_id) => {
  try {
    const data = await useHttp.put(`/student/homework/complete/${homework_id}`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const startHomeworkForStudent = async (homework_id) => {
  try {
    const data = await useHttp.put(`/student/homework/start/${homework_id}`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};