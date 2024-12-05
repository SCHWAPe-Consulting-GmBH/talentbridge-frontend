'use client'

import Image from 'next/image';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import green_icon from '@/assets/icons/green_picture.svg';
import pink_icon from '@/assets/icons/pink_picture.svg';
import orange_icon from '@/assets/icons/orange_picture.svg';
import blue_icon from '@/assets/icons/blue_picture.svg';
import { DataForProgressBar } from '@/types/dataForProgressBar';

interface Props {
  data: DataForProgressBar;
}

export const ProgressBar: React.FC<Props> = ({ data }) => {
  const { title, colors, bgColors, times, labels, subtitles, images } = data;

  const imagesForBar = [green_icon, blue_icon, pink_icon, orange_icon];

  return (
    <div className="bg-background-second rounded-2xl w-full px-[21px] py-[25px]">
      <p className="text-themetext font-bold text-[16px] mb-[17px]">{title}</p>
      <div className="h-5 rounded-full bg-background-third flex items-center px-[2px] mb-1">
        {colors.map((color, index) => {
          const lastElement = colors.length - 1;

          return (
            <div
              key={uuidv4()}
              className={cn('h-4 bg-progress-green2 w-full mr-[1px]', {
                'mr-[1px]': index != lastElement,
                'rounded-l-full': index === 0,
                'rounded-r-full': index === lastElement,
                'bg-background-third': color === 'none',
              })}
              style={{ backgroundColor: `${color != 'none' ? color : ''}` }}
            ></div>
          );
        })}
      </div>
      <div className="flex justify-between mb-[46px]">
        {labels.map((label) => (
          <p key={uuidv4()} className="font-bold text-[12px] text-neutral2">
            {label}
          </p>
        ))}
      </div>
      <div className="flex justify-around">
        {subtitles.map((subtitle, index) => {
          return (
            <div key={uuidv4()} className="flex space-x-[15px]">
              {images ? (
                <div
                  className="rounded-2xl p-[14px]"
                  style={{ backgroundColor: `${bgColors[index]}` }}
                >
                  <Image src={imagesForBar[index]} alt="" width={20} />
                </div>
              ) : (
                <div
                  className="w-[30px] h-1 rounded-full mt-[7px]"
                  style={{ backgroundColor: `${bgColors[index]}` }}
                ></div>
              )}

              <div className="flex flex-col">
                <p className="text-themetext font-bold text-[18px]">
                  {subtitle}
                </p>
                <p className="font-bold text-neutral2 text-[14px]">
                  {times[index]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
