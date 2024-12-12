'use client';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import plus from '@/assets/icons/plus.svg';
import { useEffect, useState } from 'react';
import { getHomeworkForCoach } from '@/api/coachOperations';

export const HomeworkPortalCoach = () => {
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeworkData = await getHomeworkForCoach();
        setHomeworks(homeworkData);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('homeworks', homeworks);

  return (
    <section className="max-w-[570px] w-[100%]">
      <div className="flex justify-between items-center mb-[10px] ">
        <h2 className="text-themetext font-bold text-[20px]">Homework</h2>

        <div className="flex space-x-1 items-center">
          <button>
            <Image src={plus} alt="add homework" width={11} />
          </button>
          <p className="font-semibold text-primary">Add Homework</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-4">
        {Array.isArray(homeworks) && homeworks.length > 0 ? (
          homeworks.slice(0, 4).map((homework, index) => {
            return (
              <li
                key={uuidv4()}
                className="w-[276px] h-[146px] bg-background-second rounded-2xl p-[15px] truncate green_border_hover border-box border border-transparent cursor-pointer course_shadow"
              >
                <p className="text-themetext font-bold text-[16px] truncate">
                  Homework {index + 1}
                </p>
                <p className="truncate text-[12px] text-themetext">
                  {homework.homework_title}
                </p>
              </li>
            );
          })
        ) : (
          <div>You don`t have homework!</div>
        )}
      </ul>
    </section>
  );
};
