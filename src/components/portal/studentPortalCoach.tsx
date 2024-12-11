import { useEffect, useState } from 'react';
import { getStudentsForCoach } from '@/api/coachOperations';

export const StudentPortalCoach = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await getStudentsForCoach();
        setStudents(studentData);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('students', students);
  return <section></section>;
};
