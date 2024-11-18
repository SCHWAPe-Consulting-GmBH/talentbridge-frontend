import Image from 'next/image';
import green_icon from '@/assets/icons/green_picture.svg';
import pink_icon from '@/assets/icons/pink_picture.svg';
import orange_icon from '@/assets/icons/orange_picture.svg';
import blue_icon from '@/assets/icons/blue_picture.svg';

export const CoachingProgress = () => {
  return (
    <div className="mt-[108px] flex flex-col items-center">
      <div className="flex flex-col items-center mb-[30px]">
        <p className="mb-[10px] font-bold text-[24px] text-themetext">
          Coaching progress
        </p>
        <p className="max-w-[465px] text-center font-bold text-[14px] text-themetext">
          Lorem ipsum dolor sit amet consectetur. Lectus gravida praesent
          pretium varius nulla arcu nunc elementum.{' '}
        </p>
      </div>
      <div className="bg-background-second rounded-2xl w-full px-[21px] py-[25px]">
        <p className="text-themetext font-bold text-[16px] mb-[17px]">
          Job Matching Process
        </p>
        <div className="h-5 rounded-full bg-background-third flex items-center px-[2px] mb-1">
          <div className="h-4 bg-progress-green1 rounded-l-full w-full mr-[1px]"></div>
          <div className="h-4 bg-progress-green2 w-full mr-[1px]"></div>
          <div className="h-4 bg-progress-green3 w-full mr-[1px]"></div>
          <div className="h-4 bg-progress-green4 w-full mr-[1px]"></div>
          <div className="h-4 bg-progress-green5 w-full mr-[1px]"></div>
          <div className="h-4 rounded-r-full w-full"></div>
        </div>
        <div className="flex justify-between mb-[46px]">
          <p className="font-bold text-[12px] text-neutral2">First-Talk</p>
          <p className="font-bold text-[12px] text-neutral2">Coaching Match</p>
          <p className="font-bold text-[12px] text-neutral2">AVGS-Redceived</p>
          <p className="font-bold text-[12px] text-neutral2">OAL Coaching</p>
          <p className="font-bold text-[12px] text-neutral2">
            Richtungsweisser
          </p>
          <p className="font-bold text-[12px] text-neutral2">Job Matching</p>
          <p className="font-bold text-[12px] text-neutral2">Back To Work</p>
        </div>
        <div className="flex justify-around">
          <div className="flex space-x-[15px]">
            <div className="rounded-2xl p-[14px] bg-opacity-green ">
              <Image src={green_icon} alt="" width={20} />
            </div>

            <div className="flex flex-col">
              <p className="text-themetext font-bold text-[18px]">
                Self-Awareness
              </p>
              <p className="font-bold text-neutral2 text-[14px]">
                Apr 12, 2024
              </p>
            </div>
          </div>
          <div className="flex space-x-[15px]">
            <div className="rounded-2xl p-[14px] bg-opacity-blue">
              <Image src={blue_icon} alt="" width={20} />
            </div>

            <div className="flex flex-col">
              <p className="text-themetext font-bold text-[18px]">
                Implementation
              </p>
              <p className="font-bold text-neutral2 text-[14px]">
                Apr 12, 2024
              </p>
            </div>
          </div>
          <div className="flex space-x-[15px]">
            <div className="rounded-2xl p-[14px] bg-opacity-pink">
              <Image src={pink_icon} alt="" width={20} />
            </div>

            <div className="flex flex-col">
              <p className="text-themetext font-bold text-[18px]">Mastery</p>
              <p className="font-bold text-neutral2 text-[14px]">
                Apr 12, 2024
              </p>
            </div>
          </div>
          <div className="flex space-x-[15px]">
            <div className="rounded-2xl p-[14px] bg-opacity-orange">
              <Image src={orange_icon} alt="" width={20} />
            </div>

            <div className="flex flex-col">
              <p className="text-themetext font-bold text-[18px]">Mastery</p>
              <p className="font-bold text-neutral2 text-[14px]">
                Apr 12, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
