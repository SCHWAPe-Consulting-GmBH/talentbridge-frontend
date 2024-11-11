'use client';

import React, { useState, useEffect } from 'react';
import VideoDisplay from '@/components/video-call-components/VideoDisplay';
import CallButton from '@/components/video-call-components/CallButton';
import Controls from '@/components/video-call-components/Controls';
import { setupPeerConnection } from '@/utils/peer';

import Header from '@/components/video-call-components/Header';
import ChatSection from '@/components/video-call-components/ChatSection';
import useRecordTimer from '@/hooks/useRecordTimer';

export default function Home() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [record, setRecord] = useState(false);
  const { recordTimer, startTimer, stopTimer, formattedTimer } =
    useRecordTimer();

  const callId = 'callId123';

  useEffect(() => {
    if (!isCalling) {
      stopTimer();
    }
  }, [isCalling]);

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

  const handleRecord = () => {
    setRecord(!record);
    if (!record) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  const handleVideoToggle = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0 && videoTracks[0].enabled) {
        videoTracks.forEach((track) => track.stop());
        localStream.removeTrack(videoTracks[0]);
      } else {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((newStream) => {
            const newVideoTrack = newStream.getVideoTracks()[0];
            localStream.addTrack(newVideoTrack);
            updateVideoSources(localStream);
          })
          .catch((error) => {
            console.error('Failed to restart video', error);
          });
      }
    }
  };

  function updateVideoSources(stream) {
    const videoElements = document.querySelectorAll('video[local]');
    videoElements.forEach((video) => {
      video.srcObject = stream;
    });
  }

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
              recordTimer={formattedTimer}
            />
            <div className="flex flex-row items-center justify-between bg-background-second">
              <Controls
                isCalling={isCalling}
                isMuted={isMuted}
                handleMute={handleMute}
                record={record}
                handleRecord={handleRecord}
                handleVideoToggle={handleVideoToggle}
              />

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
