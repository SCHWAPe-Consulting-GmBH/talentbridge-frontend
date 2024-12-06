'use client';

import { getHomeworkByStudentId } from '@/api/studentOperations.js';
import { useEffect, useState } from 'react';
import { useAuth } from '@/firebase/context/authContext';
const PortalHomework = () => {
  const { currentUser } = useAuth();
  const [homework, setHomework] = useState(null);
  useEffect(() => {
    async function fetchHomework(id) {
      try {
        const homeworkData = await getHomeworkByStudentId(id);
        setHomework(homeworkData);
      } catch (error) {
        console.error('Error fetching homework:', error);
      }
    }

    if (currentUser) fetchHomework(currentUser.uid);
  }, [currentUser]);

  return (
    <div className="mb-30px">
      <p>Homework</p>
    </div>
  );
};

export default PortalHomework;
