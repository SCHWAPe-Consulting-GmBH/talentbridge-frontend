import Image from 'next/image';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import dashboard from '@/assets/icons/menu_portal_dashboard.svg';
import homework from '@/assets/icons/menu_portal_homework.svg';
import meetings from '@/assets/icons/menu_portal_meetings.svg';
import documents from '@/assets/icons/menu_portal_documents.svg';
import chat from '@/assets/icons/menu_portal_chat.svg';
import support from '@/assets/icons/menu_portal_support.svg';
import settings from '@/assets/icons/menu_portal_settings.svg';
import logout from '@/assets/icons/menu_portal_logout.svg';

export const AsideMenu = () => {
  const upperButtons = [
    {
      name: 'dashboard',
      imgSrc: dashboard,
    },
    {
      name: 'homework',
      imgSrc: homework,
    },
    {
      name: 'meetings',
      imgSrc: meetings,
    },
    {
      name: 'documents',
      imgSrc: documents,
    },
    {
      name: 'chat',
      imgSrc: chat,
    },
  ];

  const bottomButtons = [
    {
      name: 'support',
      imgSrc: support,
    },
    {
      name: 'settings',
      imgSrc: settings,
    },
    {
      name: 'logout',
      imgSrc: logout,
    },
  ];

  return (
    <div className="h-[100vh] max-w-[236px] pt-[31px] pr-[20px] pl-[24px] pb-[80px] bg-background-second">
      <p className="font-extrabold text-neutral1 text-[20px] mb-5">Logo</p>
        <div className="flex flex-col justify-between h-full">
          <div>
            {upperButtons.map((btn) => {
              return (
                <button 
                  key={uuidv4()}
                  className={cn("h-12 flex items-center aside_menu w-[192px] px-[14px] pl-[16px] rounded-xl box-border", {
                    'aside_menu_active': btn.name === 'dashboard'
                  })}
                >
                  <Image
                    src={btn.imgSrc}
                    alt={`${btn.name} icon`}
                    width={20}
                    className="mr-[14px]"
                  />
                  <p className="font-semibold text-[14px] upper_first_letter">
                    {btn.name}
                  </p>
                </button>
              );
            })}
          </div>

          <div>
            {bottomButtons.map((btn) => {
              return (
                <button
                key={uuidv4()}
                  className="h-12 flex items-center aside_menu  w-[192px] px-[14px] pl-[16px] rounded-xl box-border"
                >
                  <Image
                    src={btn.imgSrc}
                    alt={`${btn.name} icon`}
                    width={20}
                    className="mr-[14px]"
                  />
                  <p className="font-semibold text-[14px] upper_first_letter">
                    {btn.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
    </div>
  );
};
