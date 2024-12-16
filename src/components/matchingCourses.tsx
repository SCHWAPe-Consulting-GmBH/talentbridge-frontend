'use client'

import React from 'react';
import Image from 'next/image';
import design from '@/assets/images/matching_graphic.png';
import architect from '@/assets/images/matching_architect.png';
import programmer from '@/assets/images/matching_programmer.png';
import not_sure from '@/assets/images/matching_not_sure.png';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { RoundLinkButton } from './roundLinkButton';

const courses = [
  {
    color: '#5DE85B',
    bgColor: 'rgba(93, 232, 91, 0.1)',
    level: 'Beginner',
    title: 'Graphic Design',
    image: design,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
  {
    color: '#E88F1B',
    bgColor: 'rgba(232, 143, 27, 0.1)',
    level: 'Advanced',
    title: 'Architect',
    image: architect,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
  {
    color: '#007AFF',
    bgColor: 'rgba(0, 122, 255, 0.1)',
    level: 'Expert',
    title: 'Programmer',
    image: programmer,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
  {
    level: 'Expert',
    title: 'I`m not sure',
    image: not_sure,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
  },
];

export const MatchingCourses: React.FC = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[1239] gap-[24px] mb-[48px]">
      {courses.map((course) => {
        const text_style = {
          color: course.color,
          border: `1px solid ${course.color}`,
          backgroundColor: course.bgColor,
        };

        return (
          <div
            key={uuidv4()}
            className="bg-background-second rounded-2xl relative p-5 flex flex-col justify-between cursor-pointer
            w-full overflow-hidden border border-transparent green_border_hover course_shadow z-20"
            onClick={() => router.push('/financial-assistance')}
          >
            {
              <div className="absolute top-[-98px] right-[-13px] z-[-1]">
                <Image
                  src={course.image}
                  alt="background image"
                  className='ml-[80px] h-auto'
                />
              </div>
            }

            <RoundLinkButton />

            <div>
              {course.color && (
                <p style={text_style} className="px-4 py-2 rounded-full inline">
                  {course.level}
                </p>
              )}
              <h2 className="font-extrabold text-[32px] leading-[44px] mt-4 text-themetext">
                {course.title}
              </h2>
              <p className="text-neutral2 font-medium text-[16px]">
                {course.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
