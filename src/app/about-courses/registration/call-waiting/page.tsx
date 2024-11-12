'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import coach from '@/assets/images/calling-coach.jpg';

const CallWaiting = () => {
  const [counter, setCounter] = useState(30);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/video-call');
    }, 30000);

    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) {
          return prevCounter - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-[100px] px-[100px] max-w-[1440px] mx-auto relative">
      <div className="w-[306px] h-[22px] bg-orange-300 rounded-lg flex justify-center mb-[47px] ">
        breadcrumbs
      </div>
      <div className="max-w-[888px] mx-auto flex flex-col items-center">
        <p className="text-themetext font-extrabold text-[48px] leading-[65px] text-center mb-8">Your coach</p>

        <div className="bg-background-second p-12 rounded-2xl flex flex-col items-center mb-16">
          <Image
            src={coach}
            alt='coach avatar'
            width={200}
            className='mb-6'
          />
          <p className="text-themetext font-semibold text-[36px] leading-[49px] text-center mb-2">Cameron Williamson</p>
          <p className='text-neutral2 font-medium text-[20px]'>cwilliamson@gmail.com</p>
          <p className='text-neutral2 font-medium text-[20px]'>(704) 555-0127</p>
        </div>

        <p className='text-themetext font-semibold text-[16px] mb-2'>Wait for the connection...</p>
        <div className="w-full h-14">
          <div className=" h-full bg-light-gray rounded-lg overflow-hidden flex items-center relative">
            <p className='absolute left-[50%]'>{`00:${counter}`}</p>
            <div className="h-full bg-primary animate-loading-thirty-second rounded-lg"></div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CallWaiting;
