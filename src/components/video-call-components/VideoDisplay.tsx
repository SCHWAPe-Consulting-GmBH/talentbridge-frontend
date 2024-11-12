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
    <div className="relative rounded-t-2xl h-[643px]">
  
        <div className="flex items-center space-x-2 py-2 px-6 absolute top-6 left-6 bg-neutral2 bg-opacity-50  rounded-full">
          <Image src={record} alt="Record" width={32} height={32} />
          <span className="text-white font-medium">24:01:45</span>
        </div>
        <div className='absolute top-6 right-6 w-[60px] h-[60px] bg-neutral2 rounded-full flex bg-opacity-50  justify-center items-center'>
          <Image src={maximize} alt="Maximize" width={32} height={32} />
        </div>

      <video
        id="remoteVideo"
        autoPlay
        playsInline
        className="w-full h-full rounded-t-2xl bg-black"
        ref={(video) => video && (video.srcObject = remoteStream)}
      />

      <p className="absolute bottom-6 left-6 py-2 px-6 text-center text-white text-[20px] font-semibold bg-neutral2 bg-opacity-50 rounded-full">
        Cameron Williamson
      </p>

      <div className="absolute bottom-5 right-5 items-center bg-gray-800 p-1 rounded-2xl ">
        <video
          id="localVideo"
          autoPlay
          muted
          playsInline
          className=" lg:w-[300px] lg:h-[180px] rounded-2xl"
          ref={(video) => video && (video.srcObject = localStream)}
        />
        <p className="absolute bottom-4 left-4 py-2 px-6 text-center text-white text-[20px] font-semibold bg-neutral2 bg-opacity-50 rounded-full">
          Cassie Jung
        </p>
      </div>
    </div>
  );
};

export default VideoDisplay;
