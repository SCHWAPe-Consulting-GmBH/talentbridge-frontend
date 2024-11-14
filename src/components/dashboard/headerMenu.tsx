import Image from 'next/image';

import notification from '@/assets/icons/notification.svg';
import documents from '@/assets/icons/documents.svg';
import settings from '@/assets/icons/settings.svg';
import avatar from '@/assets/images/avatar_dashboard.jpg';
import ThemeSwitch from '../themeSwitcher';

export const HeaderMenu = () => {
  return (
    <>
      <ThemeSwitch/>
      <button className='rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4'>
        <Image
          src={documents}
          alt=''
          width={20}
        />
      </button>
      <button className='rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4'>
        <Image
          src={notification}
          alt=''
          width={20}
        />
      </button>
      <button className='rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4'>
        <Image
          src={settings}
          alt=''
          width={20}
        />
      </button>
      <Image
        src={avatar}
        width={42}
        alt='avatar'
        className='rounded-full w-[42px] h-[42px] mr-2'
      />
      <div>
        <p className='font-bold text-neutral1'>Moni Roy</p>
        <p className='font-semibold text-dark-gray'>Student</p>
      </div>
    </>
  )
}