import React from 'react';
import Image from 'next/image';
import record from '@/assets/icons/record.svg';
import maximize from '@/assets/icons/maximize.svg';

type VideoDisplayProps = {
  localStream: MediaStream;
  remoteStream: MediaStream;
};

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  localStream,
  remoteStream,
}) => {
  return (
    <div className="relative bg-black">
      <div className="absolute top-0 left-0 p-2 flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Image src={record} alt="Record" width={32} height={32} />
          <span className="text-white font-medium">24:01:45</span>
        </div>
        <Image src={maximize} alt="Maximize" width={32} height={32} />
      </div>
      <video
        id="remoteVideo"
        autoPlay
        playsInline
        className="w-full h-full rounded-lg shadow-lg"
        ref={(video) => video && (video.srcObject = remoteStream)}
      />
      <div className="absolute bottom-5 right-5 flex flex-col items-center bg-gray-800 p-1 rounded-lg shadow-lg">
        <video
          id="localVideo"
          autoPlay
          muted
          playsInline
          className="w-[18vw] h-full rounded-lg"
          ref={(video) => video && (video.srcObject = localStream)}
        />
        <span className="absolute bottom-0 left-0 w-full text-center text-white text-xs font-medium bg-gray-500 bg-opacity-75 py-1 rounded-b-lg">
          Cassie Jung
        </span>
      </div>
    </div>
  );
};

export default VideoDisplay;
