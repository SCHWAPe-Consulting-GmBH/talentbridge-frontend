'use client';

import Image from 'next/image';
import notification from '@/assets/icons/notification.svg';
import documents from '@/assets/icons/documents.svg';
import messages from '@/assets/icons/messages.svg';
import folder from '@/assets/icons/folder.svg';
import ThemeSwitch from '../themeSwitcher';
import hasNotification from '@/assets/icons/hasNotification.svg';
import notifications from '@/dataJson/notificationData.json';
import { useRef, useState } from 'react';
import { DocumentsModal } from './documentsModal';
import { NotificationModal } from './notificationsModal';
import { Loader } from '../loader';
import { useAuth } from '@/firebase/context/authContext';
import { FaAngleDown } from 'react-icons/fa';
import { logOut } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { MessagesModal } from './messagesModal';

export const HeaderMenu = () => {
  const router = useRouter();

  const [isMessagesModalShown, setIsMessagesModalShown] = useState(false);
  const [isDocumentsModalShown, setIsDocumentsModalShown] = useState(false);
  const [isNotificationsModalShown, setIsNotificationsModalShown] =
    useState(false);

  const buttonRef = useRef(null);
  const buttonNotificationRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useAuth();
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={20} height={20} border={3} />
      </div>
    );
  }
  const { email, displayName, photoURL } = currentUser;
  const customAttributes = currentUser.reloadUserInfo?.customAttributes;
  let attributes;
  if (!customAttributes) {
    attributes = { role: 'User' };
  } else attributes = JSON.parse(customAttributes);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

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
      {photoURL ? (
        <Image
          src={photoURL}
          width={42}
          height={42}
          alt="avatar"
          className="rounded-full w-[42px] h-[42px] mr-2"
        />
      ) : (
        <div
          className={
            'bg-[rgb(212,0,255)] rounded-full min-w-[40px] min-h-[40px] text-2xl flex justify-center items-center mr-2 leading-none'
          }
        >
          {displayName ? displayName[0] : email[0]}
        </div>
      )}
      <div className="relative cursor-pointer">
        <div onClick={handleToggle}>
          <p className="font-bold text-neutral1">
            {displayName ? displayName : email.split('@')[0]}
          </p>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-dark-gray">
              {attributes.role.charAt(0).toUpperCase() +
                attributes.role.slice(1)}
            </p>
            <FaAngleDown
              className={`text-dark-gray transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>

        <div
          className={`absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10 transition-all duration-300 ${
            isOpen
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <button
            onClick={async() => {
              await logOut();
              router.push('/login');
            }}
            className="text-dark-gray font-semibold hover:bg-red-100 px-4 py-2 w-full text-left rounded"
          >
            Logout
          </button>
        </div>
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
