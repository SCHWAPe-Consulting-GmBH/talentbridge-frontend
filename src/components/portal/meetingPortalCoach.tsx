import { useEffect, useState } from 'react';
import { getMeetingByForCoach } from '@/api/coachOperations';
import plus from '@/assets/icons/plus.svg';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import avatars from '@/assets/images/Avatars5.png';

export const MeetingPortalCoach = () => {
  const [meeting, setMeeting] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetingData = await getMeetingByForCoach();
        setMeeting(meetingData);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('meeting', meeting);
  return (
    <section>
      <div className="flex justify-between items-center mb-[10px] max-w-[280px] w-[100%]">
        <h2 className=" text-themetext font-bold text-[20px]">Meetings</h2>

        <div className="flex space-x-1 items-center">
          <button>
            <Image src={plus} alt="add homework" width={11} />
          </button>
          <p className="font-semibold text-primary">Create Meeting</p>
        </div>
      </div>
      <div className="max-h-[307px] h-[100%] overflow-y-auto custom-scrollbar">
        <ul className="flex flex-col gap-[8px]">
          {[1, 2, 3].map((course) => {
            return (
              <li
                key={uuidv4()}
                className="p-[15px] w-[280px] h-[97px] bg-background-second rounded-[20px]"
              >
                <div>
                  <div className='flex justify-between'>
                    <p className="text-themetext text-[16px] leading-[20px] font-bold mb-[2px] truncate">
                      Meeting
                    </p>
                    <p className="ml-[10px] text-[12px] ">
                      12.00 AM
                    </p>
                  </div>
                  <p className="font-bold text-[12px] leading-[20px] text-dark-gray mb-[2px] truncate">
                    Zoom call to discuss all for the day
                  </p>
                  <Image src={avatars} alt="people" width={78} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
