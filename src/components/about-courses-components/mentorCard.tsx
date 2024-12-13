'use client';
import { Mentor } from '@/types/mentors';
import Image from 'next/image';
import React from 'react';
import star from '@/assets/icons/star_rating.svg';

interface Props {
  mentor: Mentor;
}

export const MentorCard: React.FC<Props> = ({ mentor }) => {
  const { name, specialty, rating, img } = mentor;

  return (
    <div className="bg-background-second rounded-3xl px-[12px] py-[15px] w-[292px] truncate">
      <Image
        src={img}
        width={268}
        height={274}
        alt="mentor`s avatar"
        className="rounded-xl h-[274px] object-cover mb-[12px]"
      />
      <p className="text-themetext font-extrabold text-[32px] leading-[44px] truncate">
        {name}
      </p>
      <div className="flex justify-between mb-2">
        <p className="text-themetext font-medium text-[16px] truncate">{specialty}</p>
        <div className="flex space-x-[5px] items-center">
          <Image src={star} alt="star" width={24} />
          <p className="text-themetext font-medium text-[16px]">{rating}</p>
        </div>
      </div>
      <button className="border border-second text-themetext w-full py-[11px] rounded-lg btn_white_hover">
        Follow
      </button>
    </div>
  );
};
