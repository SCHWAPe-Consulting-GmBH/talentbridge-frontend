'use client';

import Image from 'next/image';
import notification from '@/assets/icons/notification.svg';
import documents from '@/assets/icons/documents.svg';
import messages from '@/assets/icons/messages.svg';
import folder from '@/assets/icons/folder.svg';
import avatar from '@/assets/images/avatar_dashboard.jpg';
import ThemeSwitch from '../themeSwitcher';
import hasNotification from '@/assets/icons/hasNotification.svg';
import notifications from '@/dataJson/notificationData.json';
import { useRef, useState } from 'react';
import { DocumentsModal } from './documentsModal';
import { NotificationModal } from './notificationsModal';
import { MessagesModal } from './messagesModal';



export const HeaderMenu = () => {
  const [isMessagesModalShown, setIsMessagesModalShown] = useState(false);
  const [isDocumentsModalShown, setIsDocumentsModalShown] = useState(false);
  const [isNotificationsModalShown, setIsNotificationsModalShown] =
    useState(false);

  const buttonRef = useRef(null);
  const buttonNotificationRef = useRef(null);

  return (
    <>
      <button
        onClick={() => setIsMessagesModalShown(true)}
        className="rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4 dashboard_menu_header"
      >
        <Image src={messages} alt="settings icon" width={20} />
      </button>
      <button className="rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4 dashboard_menu_header">
        <Image src={folder} alt="settings icon" width={20} />
      </button>
      <button
        ref={buttonRef}
        onClick={() => setIsDocumentsModalShown((prev) => !prev)}
        className="rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4 dashboard_menu_header"
      >
        <Image src={documents} alt="documents icon" width={20} />
      </button>
      <button
        ref={buttonNotificationRef}
        onClick={() => setIsNotificationsModalShown((prev) => !prev)}
        className="rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4 relative dashboard_menu_header"
      >
        {notifications.length > 0 && (
          <Image
            src={hasNotification}
            alt=""
            width={7}
            className="absolute top-[10px] right-[11px]"
          />
        )}
        <Image src={notification} alt="notification icon" width={16} />
      </button>
      <ThemeSwitch />
      <Image
        src={avatar}
        width={42}
        alt="avatar icon"
        className="rounded-full w-[42px] h-[42px] mr-2"
      />
      <div>
        <p className="font-bold text-neutral1">Moni Roy</p>
        <p className="font-semibold text-dark-gray">Student</p>
      </div>
      <DocumentsModal
        isDocumentModalShown={isDocumentsModalShown}
        onClose={() => setIsDocumentsModalShown(false)}
        buttonRef={buttonRef}
      />
      <NotificationModal
        isNotificationsModalShown={isNotificationsModalShown}
        onClose={() => setIsNotificationsModalShown(false)}
        buttonRef={buttonNotificationRef}
      />
      <MessagesModal
        isMessagesModalShown={isMessagesModalShown}
        onClose={() => setIsMessagesModalShown(false)}
      />
    </>
  );
};
