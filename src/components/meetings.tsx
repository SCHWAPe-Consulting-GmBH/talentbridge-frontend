'use client'
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import time from '@/assets/icons/meeting-time.svg';
import people from '@/assets/icons/meeting-people.svg';
import subject from '@/assets/icons/meeting-subject.svg';
import avatars from '@/assets/images/Avatars5.png';
import { useAuth } from '@/firebase/context/authContext';
import { useEffect, useState } from 'react';
import { getUserCalls } from '@/firebase/chat';
import { useRouter } from 'next/navigation';

interface Props {
  isShortVersion?: boolean;
}

export const Meetings: React.FC<Props> = ({ isShortVersion }) => {
   const router = useRouter();
   const { currentUser } = useAuth();
   const [calls, setCalls] = useState([]);
   useEffect(() => {
     if (currentUser?.uid) {
       const fetchUserCalls = async () => {
         const userCalls = await getUserCalls(currentUser.uid);
         setCalls(userCalls);
       };

       fetchUserCalls();
     }
   }, [currentUser]);
  
  return (
    <div
      className={`${isShortVersion ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-[15px]'}`}
    >
      {calls.map((call) => {
        return (
          <div
            onClick={() => router.push(`/video-call?callId=${call.id}`)}
            className={`bg-background-second rounded-2xl green_border_hover border-box border border-transparent cursor-pointer course_shadow ${isShortVersion ? 'p-[15px]' : 'px-[18px] py-[21px]'}`}
            key={uuidv4()}
          >
            {isShortVersion ? (
              <>
                <div className="flex justify-between truncate">
                  <div>
                    <p className="text-themetext text-[16px] leading-[20px] font-bold mb-[2px] truncate">
                      Meetings
                    </p>
                    <p className="font-bold text-[12px] leading-[20px] text-dark-gray mb-[2px] truncate">
                      Zoom call to discuss all for the day
                    </p>
                    <Image src={avatars} alt="people" width={78} />
                  </div>

                  <p className="ml-[10px] text-[12px] text-dark-gray">
                    {call.date}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-themetext text-[16px] leading-[20px] font-bold mb-1">
                  Meetings
                </p>
                <p className="font-bold text-[12px] leading-[17px] text-dark-gray mb-2">
                  Lorem ipsum dolor sit amet dolor consectetur. Lectus gravida
                </p>
                <div className="flex items-center mb-[9px]">
                  <div className="bg-opacity-warning rounded-lg p-1 inline-flex ">
                    <Image src={time} alt="" width={14} />
                  </div>
                  <p className="ml-[5px] font-bold text-[12px] text-dark-gray">
                    {call.date}
                  </p>
                </div>

                <div className="flex items-center mb-[9px]">
                  <div className="bg-opacity-primary rounded-lg p-1 inline-flex ">
                    <Image src={people} alt="" width={14} />
                  </div>
                  <p className="ml-[5px] font-bold text-[12px] text-dark-gray">
                    {call.participants.length} students
                  </p>
                </div>

                <div className="flex items-center mb-[9px]">
                  <div className="bg-opacity-info rounded-lg p-1 inline-flex ">
                    <Image src={subject} alt="" width={14} />
                  </div>
                  <p className="ml-[5px] font-bold text-[12px] text-dark-gray">
                    {call.nameCall}
                  </p>
                </div>
                <Image src={avatars} alt="people" width={78} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
