'use client';
import { PiChatTextFill } from 'react-icons/pi';
import { HiPlus } from 'react-icons/hi2';
import { HiMiniQuestionMarkCircle } from 'react-icons/hi2';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import edit from '@/assets/icons/edit.svg';
import deleteCourse from '@/assets/icons/deleteCourse.svg';
import { useTheme } from 'next-themes';
import cn from 'classnames';


export default function GlobalSetting() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex gap-4 text-themetext">
      <div className="w-[352px]">
        <h2 className="mb-2 font-bold text-[20px]">Global Setting</h2>
        <div className="p-4 bg-background-second rounded-[20px]">
          <div className="max-h-[40px] mb-[10px] pb-5 flex justify-between items-start border-b border-[rgba(93,232,91,0.3)] ">
            <p className="flex gap-[5px] font-semibold text-[16px]">
              <HiMiniQuestionMarkCircle
                color={resolvedTheme === 'dark' ? '#007aff' : '#000'}
                size={20}
              />
              Questions
            </p>
            <p className="font-extrabold text-[24px] leading-[0.8]">10</p>
          </div>
          <ul className="flex flex-col gap-[15px]">
            {[1, 2, 3, 4].map(() => {
              return (
                <li
                  key={uuidv4()}
                  className="flex gap-[10px] items-center text-themetext"
                >
                  <button className="bg-background-third w-[40px] h-10 rounded-[11px] flex justify-center items-center">
                    <PiChatTextFill
                      size={24}
                    />
                  </button>
                  <div className="max-h-10">
                    <p>Questions 1</p>
                    <p>02.03.2024</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <button className="max-h-[37px] flex gap-[6px] items-center justify-center bg-green-500 w-full rounded-[6px] p-[9px] mt-[15px]">
            <HiPlus />
            Post Meeting Questions
          </button>
        </div>
      </div>
      <div>
        <div className="max-w-[569px] w-[100%]">
          <div className="flex justify-between mb-[15px]">
            <h2 className="font-bold text-[20px] mb-2">Courses</h2>
            <button
              onClick={() => toast.success('Successfully created course')}
              className="flex gap-1 items-center text-primary"
            >
              <HiPlus /> <p>Add Courses</p>
            </button>
          </div>
          <div className="max-h-[324px] h-[100%] overflow-y-auto custom-scrollbar">
            <ul className="grid grid-cols-2 gap-[15px]">
              {[1, 2, 3, 4, 5, 6].map((course) => {
                return (
                  <li
                    key={uuidv4()}
                    className="p-[15px] max-w-[280px] h-[98px] bg-background-second rounded-[20px]"
                  >
                    <div className="flex gap-1 items-start">
                      <div>
                        <p className="text-themetext text-[16px] leading-[20px] font-bold mb-[2px] truncate">
                          Name of course
                        </p>
                        <p className="font-bold text-[12px] leading-[1.25] text-dark-gray mb-[2px]  w-[194px]">
                          Lorem ipsum dolor sit amet consectetur. Ut tincidunt
                          nunc vestibulum diam senectus
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Image
                          src={edit}
                          alt="add homework"
                          width={24}
                          className="cursor-pointer"
                        />
                        <Image
                          src={deleteCourse}
                          alt="deleteCourse"
                          width={24}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
