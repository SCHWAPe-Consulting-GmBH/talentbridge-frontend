'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import selfPlaced from '@/assets/images/self-placed-path.png';
import hybrid from '@/assets/images/hybrid-path.png';
import coaching from '@/assets/images/coaching-path.png';
import paths from '@/dataJson/pathToSuccess.json';
import { v4 as uuidv4 } from 'uuid';

export const PathChoices = () => {
  const router = useRouter();
  const images = [selfPlaced, hybrid, coaching];

  return (
    <div className="grid grid-cols-3 gap-6">
      {paths.map((path, index) => {
        return (
          <div
            key={uuidv4()}
            className="bg-background-second rounded-2xl py-4 px-5 flex flex-col box-border border border-transparent green_border_hover course_shadow"
          >
            <div className='mb-8'>
              <p className="px-4 py-2 border border-primary rounded-full inline bg-opacity-primary text-[12px] font-medium leading-[16px] text-success">
                {path.type}
              </p>
            </div>

            <Image
              src={images[index]}
              alt="path icon"
              width={68}
              className="self-center mb-6"
            />
            <p className="font-extrabold text-[32px] text-themetext mb-1">
              {path.title}
            </p>

            <ul className="mb-4">
              {path.benefits.map((benefit) => (
                <li
                  key={uuidv4()}
                  className="list-disc ml-5 text-neutral2 font-medium text-[16px] mb-1"
                >
                  {benefit}
                </li>
              ))}
            </ul>

            <button
              className="mt-auto py-[11px] border border-themetext rounded-lg text-themetext btn_white_hover hover:border-white"
              onClick={() => router.push('/dashboard/recommendations')}
            >
              Get Started
            </button>
          </div>
        );
      })}
    </div>
  );
};
