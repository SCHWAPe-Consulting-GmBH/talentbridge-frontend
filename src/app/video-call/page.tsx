'use client';

import React, { useState, useEffect } from 'react';
import VideoDisplay from '@/components/video-call-components/VideoDisplay';
import CallButton from '@/components/video-call-components/CallButton';
import Controls from '@/components/video-call-components/Controls';
import { setupPeerConnection } from '@/utils/peer';

export default function Home() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const callId = 'callId123';

  useEffect(() => {
    return () => {
      stopMediaStream(localStream);
      if (peer) {
        peer.destroy();
      }
    };
  }, [localStream, peer]);

  const handleStartCall = async () => {
    setIsCalling(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(mediaStream);

      const newPeer = setupPeerConnection(callId, true, mediaStream);
      setPeer(newPeer);

      newPeer.on('stream', (stream) => {
        setRemoteStream(stream);
      });
    } catch (error) {
      console.error('Failed to start call:', error);
      //   setIsCalling(false);
    }
  };

  const handleEndCall = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    stopMediaStream(localStream);
    setLocalStream(null);
    setRemoteStream(null);
    setIsCalling(false);
  };

  const handleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const stopMediaStream = (stream) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <main className="px-[100px] pt-[100px] bg4 background-style flex justify-center bg-background">
      <div className="p-4 space-y-4">
        <VideoDisplay localStream={localStream} remoteStream={remoteStream} />
        <CallButton
          isCalling={isCalling}
          handleCall={isCalling ? handleEndCall : handleStartCall}
        />
        <Controls isMuted={isMuted} handleMute={handleMute} />
      </div>
    </main>
  );
}
