import { useEffect, useState } from 'react';
import { getMeetingByForCoach } from '@/api/coachOperations';

export const MeetingPortalCoach = () => {
  const [meeting, setMeeting] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetingData = await getMeetingByForCoach();
        setMeeting(meetingData);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('meeting', meeting);
  return <section></section>;
};
