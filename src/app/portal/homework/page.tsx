'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/firebase/context/authContext';
import { getHomeworkForCoach } from '@/api/coachOperations';
import { CiClock2 } from 'react-icons/ci';
import { PiChatTeardropTextFill } from 'react-icons/pi';
const PortalHomework = () => {
  const { attributes } = useAuth();
  const [homeworks, setHomeworks] = useState([]);
  // enum Status {
  //   Complete = 'complete',
  //   Incomplete = 'incomplete ',
  //   Pending = 'pending',
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeworkData = await getHomeworkForCoach();
        setHomeworks(homeworkData);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };
    if (attributes.role === 'coach') {
      fetchData();
    }
  }, []);
  console.log('homeworks', homeworks);
  // const labelByStatus = {
  //   [Status.Complete]: 'Complete',
  //   [Status.Incomplete]: 'Incomplete ',
  //   [Status.Pending]: 'Pending',
  // };
  // const status = Status.Complete;
  return (
    <div className="mb-30px mr-6 p-[15px] bg-background-second rounded-[20px] mt-[30px]">
      <div>
        <h2 className="mb-6 font-bold text-2xl">Homework</h2>
        <ul className="list-none p-0 m-0 flex flex-col gap-6">
          {homeworks && homeworks.map((homework, index) => {
            return (
              <li
                key={index}
                className="p-[15px] flex flex-col transition-all duration-200 rounded-lg ease-in-out green_border_hover border border-transparent course_shadow"
              >
                {/* <div
                  className={clsx(
                    'inline-flex items-center py-1 px-3.5 rounded-3xl text-sm font-medium mb-[6px]',
                    status === Status.Complete && 'text-green-700 bg-green-100',
                    status === Status.Incomplete && 'text-red-700 bg-red-100',

                    status === Status.Pending && 'text-blue-700 bg-blue-100'
                  )}
                >
                  <div className="w-1 h-1 mr-2 rounded-full bg-current" />
                  {labelByStatus[status]}
                </div> */}
                <p className="rounded-[12px] px-[12px] py-[4px] w-[80px] mb-[6px] inline-flex text-blue-700 bg-blue-200">
                  Pending
                </p>
                <p className="mb-[2px] font-bold text-base">
                  Homework {index + 1}
                </p>
                <p className="mb-[10px] font-normal text-xs">
                  {homework.homework_title}
                </p>
                <div className="flex justify-between">
                  <p className="flex items-center gap-2 font-normal text-xs ">
                    <CiClock2 className="w-4 h-4" />
                    {homework.homework_submission_date}
                  </p>
                  <button className="border-none bg-none cursor-pointer">
                    <PiChatTeardropTextFill className="w-6 h-6" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PortalHomework;
