import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import icon from '@/assets/icons/search_dashboard.svg';
import avatar from '@/assets/images/avatar_dashboard.jpg';

export const HeaderPortal = () => {
  const [query, setQuery] = useState('');
  const { resolvedTheme } = useTheme();

  return (
    <div className="mr-6 flex justify-between items-center">
      <h1 className='text-[30px] text-themetext font-extrabold'>Welcome, Jeremy Pelster</h1>

      <div className='flex items-center'>
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
            className={cn("absolute top-[10px] left-[23px]", {
              'graphic_white_search': resolvedTheme != 'dark'
            })}
          />
        </div>
        <Image
          src={avatar}
          width={42}
          alt="avatar icon"
          className="rounded-full w-[42px] h-[42px] mr-2"
        />
        <div>
          <p className="font-bold text-themetext">Moni Roy</p>
          <p className="font-semibold text-dark-gray">Student</p>
        </div>
      </div>
    </div>
  );
};
