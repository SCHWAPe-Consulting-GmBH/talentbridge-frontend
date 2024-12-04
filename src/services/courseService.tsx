import { useHttp } from "@/api/http";

const addNewCourse = async (courseData: ICourse): Promise<ICourse> => {
  return await useHttp.post<ICourse, ICourse>('/course', courseData);
}

const getCourse = async (): Promise<ICourse[]> => {
  return await useHttp.get('/course');
}
export const companiesService = { addNewCourse, getCourse };