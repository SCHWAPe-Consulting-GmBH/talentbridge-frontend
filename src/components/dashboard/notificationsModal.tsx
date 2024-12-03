import React, { MutableRefObject } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import ClickOutside from '@/hooks/clickOutside';
import notifications from '@/dataJson/notificationData.json';
import info from '@/assets/icons/info_notification.svg';
import success from '@/assets/icons/success_notification.svg';
import warning from '@/assets/icons/warning_notification.svg';
import error from '@/assets/icons/error_notification.svg';

interface Props {
  isNotificationsModalShown: boolean;
  onClose: () => void;
  buttonRef: MutableRefObject<null | HTMLButtonElement>;
}

export const NotificationModal: React.FC<Props> = ({
  isNotificationsModalShown,
  onClose,
  buttonRef,
}) => {
  return (
    <ClickOutside onClick={onClose} exceptionRef={buttonRef} top={70}>
      <div
        className={cn(
          'p-[25px] bg-background-second rounded-2xl border border-shadow-revert',
          {
            hidden: !isNotificationsModalShown,
          }
        )}
      >
        <div className="top-[70px] h-[432px] overflow-auto flex flex-col space-y-2 custom-scrollbar">
          {notifications.map((notification) => {
            let currentSrc;

            switch (notification.status) {
              case 'info':
                currentSrc = info;
                break;
              case 'success':
                currentSrc = success;
                break;
              case 'warning':
                currentSrc = warning;
                break;
              case 'error':
                currentSrc = error;
                break;
            }

            return (
              <div
                key={notification.id}
                className="p-4 bg-background-third rounded-2xl mr-2 flex relative"
              >
                <button
                  className="absolute top-2 right-4 text-3xl text-gray-400 hover:text-gray-800"
                >
                  &times;
                </button>
                <Image
                  src={currentSrc}
                  alt="icon"
                  width={20}
                  className=" mr-[6px] h-fit mt-[5px]"
                />
                <div>
                  <p
                    className={cn('font-bold text-[20px] mb-1', {
                      'text-info': notification.status === 'info',
                      'text-warning': notification.status === 'warning',
                      'text-primary': notification.status === 'success',
                      'text-error': notification.status === 'error',
                    })}
                  >
                    {notification.title}
                  </p>
                  <p className="text-themetext text-[16px]">
                    {notification.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClickOutside>
  );
};
