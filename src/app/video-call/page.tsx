'use client';

import React, { useState, useEffect } from 'react';
import VideoDisplay from '@/components/video-call-components/VideoDisplay';
import CallButton from '@/components/video-call-components/CallButton';
import Controls from '@/components/video-call-components/Controls';
import { setupPeerConnection } from '@/utils/peer';

import Header from '@/components/video-call-components/Header';
import ChatSection from '@/components/video-call-components/ChatSection';

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
    <main className="px-24 pt-24 bg4 background-style flex flex-col min-h-screen">
      <div>
        <Header />
        <div className="flex row-auto">
          <div className="relative w-full max-w-4xl">
            <VideoDisplay
              localStream={localStream}
              remoteStream={remoteStream}
            />
            <div className="flex flex-row items-center justify-between bg-background-second">
              <Controls isMuted={isMuted} handleMute={handleMute} />
              <CallButton
                isCalling={isCalling}
                handleCall={isCalling ? handleEndCall : handleStartCall}
              />
            </div>
          </div>
          <ChatSection />
        </div>
      </div>
    </main>
  );
}
