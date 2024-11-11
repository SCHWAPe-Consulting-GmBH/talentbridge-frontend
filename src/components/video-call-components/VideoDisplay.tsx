import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import record from '@/assets/icons/record.svg';
import maximize from '@/assets/icons/maximize.svg';

type VideoDisplayProps = {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  recordTimer: string;
};

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  localStream,
  remoteStream,
  recordTimer,
}) => {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const handleFullScreen = () => {
    console.log('Fullscreen toggled');

    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
      if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  return (
    <div className="relative bg-black" id="video-container">
      <div className="absolute top-0 left-0 p-2 flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Image src={record} alt="Record" width={32} height={32} />
          <span className="text-white font-medium">{recordTimer}</span>
        </div>
        <button onClick={handleFullScreen} className="z-[1]">
          <Image src={maximize} alt="Maximize" width={32} height={32} />
        </button>
      </div>
      <video
        ref={remoteVideoRef}
        controls={false}
        autoPlay
        playsInline
        className="w-full h-full rounded-lg shadow-lg"
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute bottom-5 right-5 flex flex-col items-center bg-gray-800 p-1 rounded-lg shadow-lg">
        <video
          ref={localVideoRef}
          controls={false}
          autoPlay
          muted
          playsInline
          className="w-[18vw] h-full rounded-lg"
          style={{ objectFit: 'cover' }}
        />
        <span className="absolute bottom-0 left-0 w-full text-center text-white text-xs font-medium bg-gray-500 bg-opacity-75 py-1 rounded-b-lg">
          Cassie Jung
        </span>
      </div>
    </div>
  );
};

export default VideoDisplay;
