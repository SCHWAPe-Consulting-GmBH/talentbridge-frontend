import Image from 'next/image';
import { useState } from 'react';
import icon from '@/assets/icons/search_dashboard.svg';
import { HeaderMenu } from './headerMenu';

export const HeaderDashboard = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex items-center justify-between relative z-20">
      <p className="font-extrabold text-[30px] text-white">Logo</p>

      <div className='flex items-center relative'>
        <div className="relative max-w-[405px] mr-4">
          <input
            placeholder="Search"
            className=" bg-dark rounded-full w-full py-[9px] pr-[22px] pl-[45px] text-white font-main font-bold text-[14px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Image
            src={icon}
            alt="search"
            width={15}
            className="absolute top-[10px] left-[23px]"
          />
        </div>
        <HeaderMenu/>
      </div>
    </div>
  );
};
