import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import theory from '@/assets/icons/homework-theory.svg';
import play from '@/assets/icons/homework-video.svg';

interface Props {
  isHomeworkShown: boolean;
  onChangeHomeworkShown: (value: boolean) => void;
}

export const HomeworkModal: React.FC<Props> = ({
  isHomeworkShown,
  onChangeHomeworkShown,
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 bg-gray-800 bg-opacity-30 flex justify-center items-center',
        {
          hidden: !isHomeworkShown,
        }
      )}
    >
      <div className="bg-background-second rounded-lg shadow-xl relative p-[32px] flex flex-col max-w-[1320px]">
        <button
          onClick={() => onChangeHomeworkShown(false)}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <div className="flex justify-between mt-6 items-center mb-4">
          <p className="text-[24px] font-bold text-themetext">Homework 1</p>
          <div className="w-[72px] h-[72px] border-[5px] border-light-gray border-r-primary rounded-full flex flex-col items-center justify-center">
            <p className="text-themetext font-semibold text-[8px] leading-[11px]">
              Completed:
            </p>
            <p className="text-themetext font-semibold text-[16px] leading-[22px]">
              5%
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <div>
            <div className="border border-neutral3 rounded-xl p-2 flex space-x-2 mb-4">
              <div className="rounded-full h-[44px] w-[44px] bg-neutral3 flex items-center justify-center">
                <Image src={theory} alt="theory icon" width={18} />
              </div>

              <div>
                <p className="text-themetext font-bold text-[16px]">Theory</p>
                <p className="text-themetext text-[12px]">Lorem ipsum </p>
              </div>
            </div>

            <p className="text-[24px] font-bold text-themetext mb-2">
              Homework 1
            </p>
            <p className="text-themetext text-[12px] mb-6">
              Lorem ipsum dolor sit amet consectetur. Sem viverra cras iaculis
              viverra risus pharetra ipsum duis. Mauris pulvinar placerat odio
              libero rutrum. Lorem ipsum dolor sit amet consectetur. Sem viverra
              cras iaculis viverra risus pharetra ipsum duis. Mauris pulvinar
              placerat odio libero rutrum. Lorem ipsum dolor sit amet
              consectetur. Sem viverra cras iaculis viverra risus pharetra ipsum
              duis. Mauris pulvinar placerat odio libero rutrum.Lorem ipsum
              dolor sit amet consectetur. Sem viverra cras iaculis viverra risus
              pharetra ipsum duis. Mauris pulvinar placerat odio libero rutrum.
            </p>
            <p className="text-[24px] font-bold text-themetext mb-2">Title</p>
            <p className="text-themetext text-[12px] mb-2">
              Lorem ipsum dolor sit amet consectetur. Sem viverra cras iaculis
              viverra risus pharetra ipsum duis. Mauris pulvinar placerat odio
              libero rutrum. Lorem ipsum dolor sit amet consectetur. Sem viverra
              cras iaculis viverra risus pharetra ipsum duis. Mauris pulvinar
              placerat odio libero rutrum. Lorem ipsum dolor sit amet
              consectetur. Sem viverra cras iaculis viverra risus pharetra ipsum
              duis. Mauris pulvinar placerat odio libero rutrum.Lorem ipsum
              dolor sit amet consectetur. Sem viverra cras iaculis viverra risus
              pharetra ipsum duis. Mauris pulvinar placerat odio libero rutrum.
            </p>
            <p className="text-themetext text-[12px] mb-[35px]">
              Lorem ipsum dolor sit amet consectetur. Sem viverra cras iaculis
              viverra risus pharetra ipsum duis. Mauris pulvinar placerat odio
              libero rutrum. Lorem ipsum dolor sit amet consectetur. Sem viverra
              cras iaculis viverra risus pharetra ipsum duis. Mauris pulvinar
              placerat odio libero rutrum. Lorem ipsum dolor sit amet
              consectetur. Sem viverra cras iaculis viverra risus pharetra ipsum
              duis. Mauris pulvinar placerat odio libero rutrum.Lorem ipsum
              dolor sit amet consectetur.
            </p>

            <p className="text-[16px] font-bold text-themetext mb-1">
              A link to your task
            </p>
            <input
              type="text"
              placeholder="Link"
              className="flex-grow py-4 rounded-lg pr-[50px] input_text border border-light-gray w-full"
            />
          </div>

          <div>
            <div className="border border-neutral3 rounded-xl p-2 flex space-x-2 mb-6 relative">
              <div className="rounded-full h-[44px] w-[44px] bg-neutral3 flex items-center justify-center">
                <Image src={play} alt="video icon" width={15} />
              </div>

              <div>
                <p className="text-themetext font-bold text-[16px]">Video</p>
                <p className="text-themetext text-[12px]">Lorem ipsum </p>
              </div>
              <p className="absolute bottom-2 right-4 text-neutral2 text-[14px]">10m</p>
            </div>

            <iframe
              width="597"
              height="379"
              className="rounded-2xl mb-[57px]"
              src="https://www.youtube.com/embed/gfU1iZnjRZM"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
            <div className='flex justify-end space-x-4'>
              <button className='w-[101px] py-[11px] btn_hover border border-background-revert text-themetext font-semibold text-[16px] leading-[22px]'>Finish later</button>
              <button className='w-[101px] py-[11px] btn_hover bg-primary font-semibold text-[16px] leading-[22px]'>Finish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
