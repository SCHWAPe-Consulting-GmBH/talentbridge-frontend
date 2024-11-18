import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import time from '@/assets/icons/meeting-time.svg';
import people from '@/assets/icons/meeting-people.svg';
import subject from '@/assets/icons/meeting-subject.svg';
import avatars from '@/assets/images/Avatars5.png';

export const Meetings = () => {
  return (
    <div>
      <p className="text-themetext text-[24px] font-bold mb-[10px]">Meetings</p>
      <p className="text-themetext text-[14px] mb-[15px] max-w-[377px]">
        Lorem ipsum dolor sit amet consectetur. Lectus gravida praesent pretium
        varius nulla arcu nunc elementum.{' '}
      </p>

      <div className="grid grid-cols-2 gap-[13px]">
        {[1, 2, 3, 4].map((value) => {
          return (
            <div
              className="bg-background-second rounded-2xl px-[18px] py-[21px] homework border-box border border-transparent"
              key={uuidv4()}
            >
              <p className="text-themetext text-[16px] leading-[20px] font-bold mb-1">
                Meetings
              </p>
              <p className="font-bold text-[12px] leading-[17px] text-dark-gray mb-2">
                Lorem ipsum dolor sit amet dolor consectetur. Lectus gravida{' '}
              </p>
              <div className="flex items-center mb-[9px]">
                <div className="bg-opacity-warning rounded-lg p-1 inline-flex ">
                  <Image src={time} alt="" width={14} />
                </div>
                <p className="ml-[5px] font-bold text-[12px] text-dark-gray">
                  12.00 AM
                </p>
              </div>

              <div className="flex items-center mb-[9px]">
                <div className="bg-opacity-primary rounded-lg p-1 inline-flex ">
                  <Image src={people} alt="" width={14} />
                </div>
                <p className="ml-[5px] font-bold text-[12px] text-dark-gray">
                  12 students
                </p>
              </div>

              <div className="flex items-center mb-[9px]">
                <div className="bg-opacity-info rounded-lg p-1 inline-flex ">
                  <Image src={subject} alt="" width={14} />
                </div>
                <p className="ml-[5px] font-bold text-[12px] text-dark-gray">
                  Mathematics
                </p>
              </div>
              <Image src={avatars} alt="people" width={78}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};
