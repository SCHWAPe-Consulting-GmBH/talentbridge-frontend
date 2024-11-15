import Image from 'next/image';
import React from 'react';
import micro from '@/assets/icons/micro.svg';
import camera from '@/assets/icons/camera.svg';
import send from '@/assets/icons/send.svg';
import startRecord from '@/assets/icons/start_recording.svg';
import sendMessage from '@/assets/icons/send_message.svg';
import more from '@/assets/icons/3dots.svg';

type ControlsProps = {
  isCalling: boolean;
  isMuted: boolean;
  handleMute: () => void;
  handleRecord: () => void;
  handleVideoToggle: () => void;
};

const Controls: React.FC<ControlsProps> = ({
  isCalling,
  isMuted,
  handleMute,
  handleRecord,
  handleVideoToggle,
}) => {
  return (
    <div className="flex space-x-4 py-6">
      <button onClick={handleMute}>
        <Image src={micro} alt="maximize" width={60} />
      </button>
      <button
        onClick={isCalling ? handleVideoToggle : undefined}
        disabled={!isCalling}
      >
        <Image src={camera} alt="camera" width={60} />
      </button>
      <button>
        <Image src={send} alt="send" width={60} />
      </button>
      <button
        onClick={isCalling ? handleRecord : undefined}
        disabled={!isCalling}
      >
        <Image src={startRecord} alt="start record" width={60} />
      </button>

      <button>
        <Image src={sendMessage} alt="send message" width={60} />
      </button>
      <button>
        <Image src={more} alt="more" width={60} />
      </button>
    </div>
  );
};

export default Controls;
