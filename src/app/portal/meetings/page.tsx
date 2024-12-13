'use client';

import { getMeetingForCoach } from '@/api/coachOperations';
import { createCallWithLink, getUserCalls } from '@/firebase/chat';
import { useAuth } from '@/firebase/context/authContext';
import { servers } from '@/utils/servers';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const PortalMeetings = () => {
  // const router = useRouter();
  // const { currentUser } = useAuth();
  // const [calls, setCalls] = useState([]);
  // useEffect(() => {
  //   if (currentUser?.uid) {
  //     const fetchUserCalls = async () => {
  //       const userCalls = await getUserCalls(currentUser.uid);
  //       setCalls(userCalls);
  //     };

  //     fetchUserCalls();
  //   }
  // }, [currentUser]);
  // const pc = useRef(new RTCPeerConnection(servers));

  // const callDate = '2024-12-15T15:00:00Z';
  // const participants = [currentUser.uid];
  // const nameCall = 'First call';

  // const handleClickCall = async () => {
  //   const callId = await createCallWithLink(
  //     pc.current,
  //     nameCall,
  //     callDate,
  //     participants
  //   );

  //   if (callId) {
  //     console.log('Call created successfully with ID:', callId);
  //   } else {
  //     console.log('Failed to create call.');
  //   }
  // };
  const [meetings, setMeetings] = useState(null);
  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const meetingData = await getMeetingForCoach();
        setMeetings(meetingData);
      } catch (error) {
        console.error('Error fetching homework:', error);
      }
    };

    fetchMeeting();
  }, []);
  console.log('meetings', meetings);
  
  return (
    <div className="mb-30px">
      <p>Meetings</p>
      {/* <button onClick={handleClickCall}>video call</button>
      {calls.length > 0 ? (
        calls.map((call) => (
          <div
            key={call.id}
            className="border cursor-pointer"
            onClick={() => router.push(`/video-call?callId=${call.id}`)}
          >
            <p>Call ID: {call.id}</p>
            <p>Date: {call.date}</p>
            <p>Participants: {call.participants.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No calls available</p>
      )} */}
    </div>
  );
};

export default PortalMeetings;
