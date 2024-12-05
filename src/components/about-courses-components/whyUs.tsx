'use client'

import Image from 'next/image';
import { useState } from 'react';
import play from '@/assets/images/Play.png';
import video from '@/assets/images/video_banner.jpg';

export const WhyUs = () => {
  const [isVideoShown, setIsVideoShown] = useState(false);

  return (
    <section className="flex flex-col items-center mb-[100px]">
      <p className="text-primary border border-primary rounded-full font-bold text-[24px] px-4 py-2 mb-6">
        Why you should choose us?
      </p>
      <h3 className="text-themetext font-extrabold text-[48px] leading-[65px] mb-4">
        Lorem ipsum dolor sit amet
      </h3>
      <p className="font-medium text-neutral2 text-[24px] leading-[33px] mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>
      {isVideoShown ? (
        <iframe
          width="1040"
          height="511"
          className="rounded-2xl"
          src="https://www.youtube.com/embed/gfU1iZnjRZM"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <div className='relative w-[1040px] h-[511px] flex justify-center items-center'>
          <Image
            src={video}
            alt='video banner'
            width={1040}
            className='absolute top-0 left-0 z-0 rounded-3xl'
          />
          <button className='z-30' onClick={() => setIsVideoShown(true)}>
            <Image src={play} alt="play" width={124} className='btn_shadow rounded-full'/>
          </button>
        </div>
      )}
    </section>
  );
};
