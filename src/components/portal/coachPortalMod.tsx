'use client';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import plus from '@/assets/icons/plus.svg';
import { useEffect, useState } from 'react';
import { getCoachForMod } from '@/api/modOperations';

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
      <div className="flex justify-between items-center mb-[10px] ">
        <h2 className="text-themetext font-bold text-[20px]">Coachs</h2>

        <div className="flex space-x-1 items-center">
          <button>
            <Image src={plus} alt="add homework" width={11} />
          </button>
          <p className="font-semibold text-primary">Add Coach</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-4">
        {/* {Array.isArray(coachs) && coachs.length > 0 ? ( */}
              {/* coachs.slice(0, 4).map((coach, index) => { */}
              {[0,1,2,3].map((coach, index) => {

                  return (
                      <li
                          key={uuidv4()}
                          className="w-[276px] h-[146px] bg-background-second rounded-2xl p-[15px] truncate green_border_hover border-box border border-transparent cursor-pointer course_shadow"
                      >
                          <p className="text-themetext font-bold text-[16px] truncate">
                              Jordan Seler
                          </p>
                          <p className="truncate text-[12px] text-themetext">
                              English teacher
                          </p>
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
