import { useHttp } from '@/api/http';

export const getHomeworkForCoach = async () => {
  try {
    const data = await useHttp.get(`/coach/homework`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const getMeetingForCoach = async () => {
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

export const getStudentProgress = async () => {
  try {
    const data = await useHttp.get(`/coach/student/progress`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const assignHomework = async (homework) => {
  try {
    const data = await useHttp.post(`/coach/assign_homework`, homework);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
// {
//   "student_id": 0,
//   "homework_id": 0
// }
// export const getStudentDocument = async (studentId) => {
//   try {
//     const data = await useHttp.get(`/student/document/${studentId}`);
//     console.log('запит відправлено', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// };

// export const getStudentHomework = async (studentId) => {
//   try {
//     const data = await useHttp.get(`/student/homework/${studentId}`);
//     console.log('запит відправлено', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// };
