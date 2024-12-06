import { useHttp } from '@/api/http';

export const getHomeworkByCoachId = async (coachId) => {
  try {
    const data = await useHttp.get(`/coach/homework/${coachId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const getMeetingByCoachId = async (coachId) => {
  try {
    const data = await useHttp.get(`/coach/meeting/${coachId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const getStudentsByCoachId = async (coachId) => {
  try {
    const data = await useHttp.get(`/coach/students/${coachId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const getCourseByCoachId = async (coachId) => {
  try {
    const data = await useHttp.get(`/coach/course/${coachId}`);
    console.log('запит відправлено', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
coach / student / progress / { student_id };

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