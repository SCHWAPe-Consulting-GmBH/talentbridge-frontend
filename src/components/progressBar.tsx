'use client';

import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import data from '@/dataJson/progressBarDashboard.json';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ProgressBar = () => {
  const { colors, labels } = data;
  const pathname = usePathname();
  const [activeElement, setActiveElement] = useState('');
  const endElement = labels.indexOf(activeElement);


  useEffect(() => {
    const currentUrl = pathname.split('/').at(-1);

    switch (currentUrl) {
      case 'recommendations':
        setActiveElement('Course Selection');
        break;

      case 'dashboard':
        setActiveElement('Course Start');
        break;

      case 'financial-aid':
        setActiveElement('AVGS Process (If Assistance)');
        break;

      case 'payment-options':
        setActiveElement('Enrolled');
        break;
    }
  }, [pathname]);

  return (
    <div className="bg-background-second rounded-2xl w-full px-[21px] py-[25px]">
      <p className="text-themetext font-bold text-[16px] mb-[17px]">
        {labels[endElement]}
      </p>
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
                'bg-background-third': index >= endElement,
              })}
              style={{ backgroundColor: `${index < endElement ? color : ''}` }}
            />
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
    </div>
  );
};
