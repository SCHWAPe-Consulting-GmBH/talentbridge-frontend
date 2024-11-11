import React from 'react';

interface CallButtonProps {
  isCalling: boolean;
  handleCall: () => void;
}

const CallButton: React.FC<CallButtonProps> = ({ isCalling, handleCall }) => {
  return (
    <button
      className={`font-bold text-white rounded shadow ${isCalling ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
      onClick={handleCall}
    >
      {isCalling ? 'End Call' : 'Start Call'}
    </button>
  );
};

export default CallButton;
