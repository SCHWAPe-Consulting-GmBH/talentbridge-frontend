'use client';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import plus from '@/assets/icons/plus.svg';
import { useEffect, useState } from 'react';
import { getCoachForMod } from '@/api/modOperations';
import avatar from '@/assets/images/avatar_dashboard.jpg';
import { TiStarFullOutline } from 'react-icons/ti';
import { FaPeopleGroup } from 'react-icons/fa6';
import { PiChatTextFill } from 'react-icons/pi';
import { TfiCup } from 'react-icons/tfi';

export const CoachPortalMod = () => {
  const [coachs, setCoachs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coachData = await getCoachForMod();
        setCoachs(coachData);
      } catch (error) {
        console.error('Failed to fetch coachs data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('Coachs', coachs);

  return (
    <section className="max-w-[569px] w-[100%]">
      <div className="flex justify-between items-center mb-[10px] pr-23">
        <h2 className="text-themetext font-bold text-[20px]">Coachs</h2>

        <div className="flex space-x-1 items-center text-primary">
          <button>
            <Image src={plus} alt="add homework" width={11} />
          </button>
          <p className="font-semibold ">Add Coach</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-4">
        {/* {Array.isArray(coachs) && coachs.length > 0 ? ( */}
        {/* coachs.slice(0, 4).map((coach, index) => { */}
        {[0, 1, 2, 3].map((coach, index) => {
          return (
            <li
              key={uuidv4()}
              className="w-[276px] h-[160px] bg-background-second rounded-2xl p-[15px] truncate green_border_hover border-box border border-transparent cursor-pointer course_shadow"
            >
              <div className="flex items-center gap-[10px] pb-[10px] border-b relative">
                <Image
                  src={avatar}
                  alt="avatar"
                  className="rounded-full w-[64px] h-[64px]"
                />
                <div className="flex justify-between w-full">
                  <div>
                    <p className="text-themetext font-bold text-[16px] truncate mb-[6px]">
                      Jordan Seler
                    </p>
                    <p className="truncate text-[12px] text-themetext">
                      English teacher
                    </p>
                  </div>
                  <button className='bg-gray-300 p-[6px] absolute top-0 right-0 cursor-pointer border-none bg-zinc-200 rounded-full
                  '>
                    <PiChatTextFill size={18} color='black' />
                  </button>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-center">
                  Rate
                  <p className="flex items-center gap-1">
                    <TiStarFullOutline color="#FFD700" size={20} />
                    4.8
                  </p>
                </div>
                <div>
                  Students
                  <p className="flex items-center gap-1">
                    <FaPeopleGroup size={20} color="#007aff" /> 129
                  </p>
                </div>
                <div>
                  Awards
                  <p className="flex items-center gap-1">
                    <TfiCup size={20} color="#34c759" /> 34
                  </p>
                </div>
              </div>
            </li>
          );
        })}
        {/* ) : (
          <div>You don`t have homework!</div>
        )} */}
      </ul>
    </section>
  );
};
