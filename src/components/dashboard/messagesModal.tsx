import React, { MutableRefObject } from 'react';
import cn from 'classnames';
import { ChatsComponent } from '@/components/chatsComponent';

interface Props {
  isMessagesModalShown: boolean;
  onClose: () => void;
}

export const MessagesModal: React.FC<Props> = ({
  isMessagesModalShown,
  onClose,
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 bg-opacity-modal flex justify-center items-center z-40 px-8',
        {
          hidden: !isMessagesModalShown,
        }
      )}
    >
      <div className="p-[25px] relative max-w-[1320px] h-[85%] max-h-[970px] min-h-[500px] w-full bg-background bg-messages rounded-2xl border border-shadow-revert">
        <button
          onClick={onClose}
          className="absolute top-[25px] right-8 text-4xl text-gray-500 hover:text-gray-800 btn_scale"
        >
          &times;
        </button>
        
        <ChatsComponent />
      </div>
    </div>
  );
};
