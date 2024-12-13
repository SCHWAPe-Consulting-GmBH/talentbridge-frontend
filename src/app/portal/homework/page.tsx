'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/firebase/context/authContext';
import { getHomeworkForCoach } from '@/api/coachOperations';
const PortalHomework = () => {
  const { currentUser } = useAuth();
  const [homework, setHomework] = useState(null);
  useEffect(() => {
    async function fetchHomework() {
      try {
        const homeworkData = await getHomeworkForCoach();
        setHomework(homeworkData);
      } catch (error) {
        console.error('Error fetching homework:', error);
      }
    }

    fetchHomework();
  }, []);
  console.log(homework);

  return (
    <div className="mb-30px">
      <p>Homework</p>
    </div>
  );
};

export default PortalHomework;
