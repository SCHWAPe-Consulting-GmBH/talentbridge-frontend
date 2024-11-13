'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import VideoDisplay from '@/components/video-call-components/VideoDisplay';
import { setupPeerConnection } from '@/utils/peer';

export default function JoinCall() {
  let callId = '';

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    const joinCall = async () => {
      if (!callId) return;
      try {
        const callDoc = await getDoc(doc(firestore, 'calls', callId));
        if (!callDoc.exists()) {
          console.error('Call does not exist');
          return;
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(mediaStream);

        const newPeer = setupPeerConnection(callId, false, mediaStream);
        setPeer(newPeer);

        newPeer.on('stream', (stream) => {
          setRemoteStream(stream);
        });
      } catch (error) {
        console.error('Failed to join call:', error);
      }
    };

    joinCall();
  }, [callId]);

  return <VideoDisplay localStream={localStream} remoteStream={remoteStream} />;
}
