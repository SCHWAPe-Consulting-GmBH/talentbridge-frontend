import Image from 'next/image';
import React from 'react';
import micro from '@/assets/icons/micro.svg';
import camera from '@/assets/icons/camera.svg';
import send from '@/assets/icons/send.svg';
import startRecord from '@/assets/icons/start_recording.svg';
import sendMessage from '@/assets/icons/send_message.svg';
import more from '@/assets/icons/3dots.svg';

type ControlsProps = {
  isMuted: boolean;
  handleMute: () => void;
};

const Controls: React.FC<ControlsProps> = ({ isMuted, handleMute }) => {
  return (
    <div className="flex space-x-2">
      <button onClick={handleMute}>
        <Image src={micro} alt="maximize" className="w-7 h-7 ml-4" />
      </button>
      <button onClick={handleMute}>
        <Image src={camera} alt="camera" className="w-7 h-7 ml-4" />
      </button>
      <button onClick={handleMute}>
        <Image src={send} alt="send" className="w-7 h-7 ml-4" />
      </button>
      <button onClick={handleMute}>
        <Image src={startRecord} alt="start record" className="w-8 h-8 ml-4" />
      </button>
      <button onClick={handleMute}>
        <Image src={sendMessage} alt="send message" className="w-7 h-7 ml-4" />
      </button>
      <button onClick={handleMute}>
        <Image src={more} alt="more" className="w-7 h-7 ml-4" />
      </button>
    </div>
  );
};

export default Controls;
