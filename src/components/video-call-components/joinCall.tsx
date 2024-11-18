import React from 'react';
import cn from 'classnames';

interface Props {
  callId: string;
  onAnswerCall: () => void;
  onChangeCallId: (value: string) => void;
  onChangeIsJoin: (value: boolean) => void;
  onChangeIsCalling: (value: boolean) => void;
}

export const JoinCallLayout: React.FC<Props> = ({
  callId,
  onChangeCallId,
  onAnswerCall,
  onChangeIsCalling,
  onChangeIsJoin
}) => {

  const handleAnswering = () => {
    onChangeIsCalling(true);
    onChangeIsJoin(false);
    onAnswerCall();
  }

  return (
    <div className='flex space-x-2'>
      <input
        value={callId}
        onChange={(e) => onChangeCallId(e.target.value)}
        placeholder="Enter Call ID"
        className="input_text text-secondary w-full bg-white border border-light-gray"
      />
      <button
        onClick={handleAnswering}
        disabled={!callId}
        className={cn("font-bold text-white rounded-lg shadow py-[14px] px-[20px] right-4 bg-primary btn_green_hover4", {
          'bg-gray-400': !callId
        })}
      >
        ENTER
      </button>
    </div>
  );
};
