import { useHttp } from '@/api/http';

export const getHomeworkForCoach = async () => {
  try {
    const data = await useHttp.get(`/coach/homework`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const getMeetingByForCoach = async () => {
  try {
    const data = await useHttp.get(`/coach/meeting`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const getStudentsForCoach = async () => {
  try {
    const data = await useHttp.get(`/coach/students`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const getCourseForCoach = async () => {
  try {
    const data = await useHttp.get(`/coach/course`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const getStudentProgress = async (studentId) => {
  try {
    const data = await useHttp.get(`/coach/student/progress/${studentId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const getStudentDocument = async (studentId) => {
  try {
    const data = await useHttp.get(`/student/document/${studentId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const getStudentHomework = async (studentId) => {
  try {
    const data = await useHttp.get(`/student/homework/${studentId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
