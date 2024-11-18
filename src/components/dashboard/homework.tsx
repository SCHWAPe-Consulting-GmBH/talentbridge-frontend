'use client'

import Image from 'next/image';
import cn from 'classnames';
import homeworkData from '@/dataJson/dataHomework.json';
import time from '@/assets/icons/time-homework.svg';
import message from '@/assets/icons/message-homework.svg';
import pic1 from '@/assets/images/picture1_homework.png';
import pic2 from '@/assets/images/picture2_homework.png';
import pic3 from '@/assets/images/picture3_homework.png';
import pic4 from '@/assets/images/picture4_homework.png';
import pic5 from '@/assets/images/picture5_homework.png';
import { useState } from 'react';
import { HomeworkModal } from './homeworkModal';

export const HomeworkDashboard = () => {
  const [activeHomeworkId, setActiveHomeworkId] = useState(0);
  const [isHomeworkModalShown, setIsHomeworkModalShown] = useState(false);

  function getRandomNumber() {
    return Math.floor(Math.random() * 5);
  }

  const randomPictures = [
    { src: pic1, style: 'rgba(115, 58, 145, 0.2)' },
    { src: pic2, style: 'rgba(228, 47, 8, 0.2)' },
    { src: pic3, style: 'rgba(204, 253, 68, 0.2)' },
    { src: pic4, style: 'rgba(255, 6, 0, 0.2)' },
    { src: pic5, style: 'rgb(0, 214, 118, 0.2)' },
  ];

  const handleHomeworkClick = (homeworkId: number) => {
    setActiveHomeworkId(homeworkId);
    setIsHomeworkModalShown(true);
  }

  return (
    <div className="mt-[30px]">
      <p className="text-themetext text-[24px] font-bold mb-[10px]">Homework</p>
      <p className="text-themetext text-[14px] mb-[15px] max-w-[377px]">
        Lorem ipsum dolor sit amet consectetur. Lectus gravida praesent pretium
        varius nulla arcu nunc elementum.
      </p>

      <div className="grid grid-cols-3 gap-x-[16px] gap-y-[15px]">
        {homeworkData.map((homework) => {
          const picture = randomPictures[getRandomNumber()];

          return (
            <div
              key={homework.id}
              onClick={() => handleHomeworkClick(homework.id)}
              className={cn("bg-background-second rounded-2xl p-[15px] flex space-x-[10px] green_border_hover border-box border border-transparent cursor-pointer", 
                {'homework_active': activeHomeworkId === homework.id}
              )}
            >
              <div
                className="rounded-2xl p-[7px] w-[66px]"
                style={{ backgroundColor: picture.style }}
              >
                <Image src={picture.src} alt="abstraction" width={50} />
              </div>

              <div className="flex justify-between w-[80%]">
                <div className='truncate'>
                  <p className="font-bold text-[16px] text-themetext mb-[2px]">
                    {homework.title}
                  </p>
                  <p className="font-bold text-[12px] text-themetext mb-1 truncate">
                    {homework.description}
                  </p>
                  <div className="flex items-center">
                    <Image
                      src={time}
                      alt="time icon"
                      width={14}
                      className="mr-[6px]"
                    />
                    <p className="font-bold text-[12px] text-neutral2 mt-[1px]">
                      {homework.date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <p
                    className={cn(
                      'rounded-full text-[12px] font-bold px-3 py-1 leading-[20px]',
                      {
                        'bg-opacity-green text-primary':
                          homework.status === 'Complete',
                        'bg-opacity-info text-info':
                          homework.status === 'Pending',
                      }
                    )}
                  >
                    {homework.status}
                  </p>
                  <button className="ml-auto">
                    <Image src={message} alt="message icon" width={24} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <HomeworkModal isHomeworkShown={isHomeworkModalShown} onChangeHomeworkShown={setIsHomeworkModalShown}/>
    </div>
  );
};
