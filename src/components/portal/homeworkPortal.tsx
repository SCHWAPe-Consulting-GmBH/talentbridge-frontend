import cn from 'classnames';
import homework from '@/dataJson/dataHomework.json';
import time from '@/assets/icons/time-homework.svg';
import message from '@/assets/icons/message-homework.svg';
import Image from 'next/image';

export const HomeworkPortal = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {homework.slice(0, 3).map((work) => {
        return (
          <div className="bg-background-second rounded-2xl p-[15px] green_border_hover border-box border border-transparent cursor-pointer">
            <div className="truncate">
              <p
                className={cn(
                  'rounded-full text-[12px] font-bold px-3 py-1 leading-[20px] inline-flex mb-[3px]',
                  {
                    'bg-opacity-green text-primary': work.status === 'Complete',
                    'bg-opacity-info text-info': work.status === 'Pending',
                  }
                )}
              >
                {work.status}
              </p>
              <p className="font-bold text-[16px] text-themetext mb-[2px]">
                {work.title}
              </p>
              <p className="font-bold text-[12px] text-themetext mb-1 truncate">
                {work.description}
              </p>
              <div className="flex justify-between mt-3">
                <div className="flex items-center">
                  <Image
                    src={time}
                    alt="time icon"
                    width={14}
                    className="mr-[6px]"
                  />
                  <p className="font-bold text-[12px] text-neutral2 mt-[1px]">
                    {work.date}
                  </p>
                </div>
                <button className="ml-auto">
                  <Image src={message} alt="message icon" width={24} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
