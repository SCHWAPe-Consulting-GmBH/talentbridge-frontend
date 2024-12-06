'use client';

import { getMeetingByStudentId } from '@/api/studentOperations';
import { useAuth } from '@/firebase/context/authContext';
import { useEffect, useState } from 'react';

const PortalMeetings = () => {
  const { currentUser } = useAuth();
  const [meetings, setMeetings] = useState(null);
  useEffect(() => {
    const fetchMeeting = async (id) => {
      try {
        const meetingData = await getMeetingByStudentId(id);
        setMeetings(meetingData);
      } catch (error) {
        console.error('Error fetching homework:', error);
      }
    };

    if (currentUser) fetchMeeting(currentUser.uid);
  }, [currentUser]);
  return (
    <div className="mb-30px">
      <p>Meetings</p>
    </div>
  );
};

export default PortalMeetings;
