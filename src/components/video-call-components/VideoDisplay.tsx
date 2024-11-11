import React from 'react';

type VideoDisplayProps = {
  localStream: MediaStream;
  remoteStream: MediaStream;
};

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  localStream,
  remoteStream,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <video
        id="localVideo"
        autoPlay
        muted
        playsInline
        className="w-1/2 rounded-lg shadow-lg"
        ref={(video) => {
          if (video) video.srcObject = localStream;
        }}
      ></video>
      <video
        id="remoteVideo"
        autoPlay
        playsInline
        className="w-full max-w-2xl rounded-lg shadow-lg"
        ref={(video) => {
          if (video) video.srcObject = remoteStream;
        }}
      ></video>
    </div>
  );
};

export default VideoDisplay;
