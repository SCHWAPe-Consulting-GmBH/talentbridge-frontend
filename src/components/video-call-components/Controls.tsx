import React from 'react';

type ControlsProps = {
  isMuted: boolean;
  handleMute: () => void;
};

const Controls: React.FC<ControlsProps> = ({ isMuted, handleMute }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        className="px-4 py-2 bg-blue-500 rounded shadow hover:bg-blue-700 text-white font-bold"
        onClick={handleMute}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
};

export default Controls;
