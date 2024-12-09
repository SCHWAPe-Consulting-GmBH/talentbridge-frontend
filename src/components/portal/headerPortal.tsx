import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import icon from '@/assets/icons/search_dashboard.svg';
// import avatar from '@/assets/images/avatar_dashboard.jpg';
import { useAuth } from '@/firebase/context/authContext';
import { Loader } from '../loader';

export const HeaderPortal = () => {
  const [query, setQuery] = useState('');
  const { resolvedTheme } = useTheme();
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Loader width={20} height={20} border={3} />;
  }
  const { email, displayName, photoURL } = currentUser;
  console.log(currentUser);
  console.log(currentUser.reloadUserInfo.customAttributes);

  return (
    <div className="mr-6 flex justify-between items-center">
      <h1 className="text-[30px] text-themetext font-extrabold">
        Welcome, {displayName ? displayName : email}
      </h1>

      <div className="flex items-center">
        <div className="relative max-w-[405px] mr-4">
          <input
            placeholder="Search"
            className=" bg-background-second input_text h-[38px] rounded-full w-full py-[9px] pr-[22px] pl-[45px] text-themetext font-main font-bold text-[14px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Image
            src={icon}
            alt="search"
            width={15}
            className={cn('absolute top-[10px] left-[23px]', {
              graphic_white_search: resolvedTheme != 'dark',
            })}
          />
        </div>
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
              'bg-[rgb(212,0,255)] rounded-full min-w-[40px] min-h-[40px] text-2xl flex justify-center items-center mr-2'
            }
          >
            {displayName ? displayName[0] : email[0]}
          </div>
        )}
        <div>
          <p className="font-bold text-themetext">
            {displayName ? displayName : email}
          </p>
          <p className="font-semibold text-dark-gray">Student</p>
        </div>
      </div>
    </div>
  );
};
