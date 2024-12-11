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
    <section>
      <div className="flex justify-between mb-[10px]">
        <h2 className="mb-[10px] text-themetext font-bold text-[20px]">
          Homework
        </h2>

        <div className="flex space-x-1">
          <button>
            <Image src={plus} alt="add homework" width={11} />
          </button>
          <p className="font-semibold text-primary">Add Homework</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {homeworks.map((homework, index) => {
          return (
            <div
              key={uuidv4()}
              className="bg-background-second rounded-2xl p-[15px] truncate green_border_hover border-box border border-transparent cursor-pointer course_shadow"
            >
              <p className="text-themetext font-bold text-[16px] truncate">
                Homework {index + 1}
              </p>
              <p className="truncate text-[12px] text-themetext">
                {homework.homework_title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
