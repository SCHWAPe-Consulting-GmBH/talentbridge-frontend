import { useEffect, useState } from 'react';
import { getCourseForCoach } from '@/api/coachOperations';

export const CoursePortalCoach = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await getCourseForCoach();
        setCourses(coursesData);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('courses', courses);
  return <section></section>;
};
