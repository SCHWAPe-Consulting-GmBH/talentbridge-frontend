import React from 'react';
import Image from 'next/image';
import design from '@/assets/images/matching_graphic.png';
import architect from '@/assets/images/matching_architect.png';
import programmer from '@/assets/images/matching_programmer.png';
import arrow from '@/assets/icons/arrow_diagonal.svg';

  const courses = [
    {
      color: '#5DE85B',
      bgColor: '#E0F7E6',
      level: 'Beginner',
      title: 'Graphic Design',
      image: design,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
    {
      color: '#E88F1B',
      bgColor: '#FFF0D8',
      level: 'Advanced',
      title: 'Architect',
      image: architect,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
    {
      color: '#007AFF',
      bgColor: '#D9EBFF',
      level: 'Expert',
      title: 'Programmer',
      image: programmer,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
  ];

export const MatchingCourses: React.FC = () => {


  return (
    <div className='flex max-w-[1239] space-x-[24px] mb-[48px]'>
      {courses.map((course) => {
        const text_style = {
          color: course.color,
          border: `1px solid ${course.color}`,
          'background-color': course.bgColor,
        }

        return (
          <div className="bg-background-second rounded-lg relative p-5 flex flex-col justify-between w-[400px] h-[308px]">
            <div className='absolute top-2 right-2 w-[70%] h-[90%] p-4 flex justify-end'>
              <Image
                src={course.image}
                alt="background image"
                layout="contain"
                objectFit="none"
              />
            </div>
            
            <button className="rounded-full bg-background-revert flex items-center justify-center w-[38px] h-[38px]">
              <Image src={arrow} alt="move to course" width={20.27} />
            </button>

            <div>
              <p style={text_style} className='px-4 py-2 rounded-full inline'>
                {course.level}
              </p>
              <h2 className='font-extrabold text-[32px] leading-[44px] mt-4 text-themetext'>{course.title}</h2>
              <p className='text-neutral2 font-medium text-[16px]'>{course.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
