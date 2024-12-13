import { useHttp } from '@/api/http';

export const getCoachForMod = async () => {
  try {
    const data = await useHttp.get(`/coach/`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const getCourseForMod = async () => {
  try {
    const data = await useHttp.get(`/course/`);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
export const getStudentsForMod = async (
  search = '',
  page = 1,
  page_size = 10
) => {
  try {
    const data = await useHttp.get(
      `/user/?search=${search}&page=${page}&page_size=${page_size}`
    );
    return data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students. Please try again.');
  }
};
export const createCourseForMod = async (courseData) => {
  try {
    const data = await useHttp.post(`/course/`, courseData);
    return data;
  } catch (error) {
    console.error('Error creating course:', error);
  }
};
export const enrollStudentInCourse = async (courseId) => {
  try {
    const data = await useHttp.post(`/user/enroll`, courseId);
    return data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students. Please try again.');
  }
};

export const addCoachToWorkspace = async (couchData) => {
  try {
    const data = await useHttp.post(
      `/moderator/add_coach_to_workspace`,
      couchData
    );
    return data;
  } catch (error) {
    console.error('Error creating coach:', error);
  }
};

export const addModeratorToWorkspace = async (moderatorData) => {
  try {
    const data = await useHttp.post(
      `/moderator/add_to_workspace`,
      moderatorData
    );
    return data;
  } catch (error) {
    console.error('Error creating coach:', error);
  }
};

export const createWorkspace = async (workspaceData) => {
  try {
    const data = await useHttp.post(
      `/moderator/create-workspace`,
      workspaceData
    );
    return data;
  } catch (error) {
    console.error('Error creating coach:', error);
  }
};

export const linkCoachToCourse = async () => {
  try {
    const data = await useHttp.post(`/moderator/link_coach_to_course`);
    return data;
  } catch (error) {
    console.error('Error creating coach:', error);
  }
};

export const uploadAndAssignDocument = async (
  document,
  document_type_id,
  student_id
) => {
  try {
    const data = await useHttp.post(
      `/moderator/upload_and_assign_document?document_type_id=${document_type_id}&student_id=${student_id}`,
      document
    );
    return data;
  } catch (error) {
    console.error('Error creating coach:', error);
  }
};
export const createHomework = async (homeworkData) => {
  try {
    const data = await useHttp.post(`/homework/`, homeworkData);
    return data;
  } catch (error) {
    console.error('Error creating coach:', error);
  }
};
