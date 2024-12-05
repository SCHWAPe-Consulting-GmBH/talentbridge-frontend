'use client';

import Image from 'next/image';
import cn from 'classnames';
import { useTheme } from 'next-themes';
import design from '@/assets/images/matching_graphic.png';
import arrow from '@/assets/icons/arrow_diagonal.svg';

const PaymentOptions = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-[56px] flex flex-col items-center">
      <h2 className="text-themetext font-extrabold text-[48px] mb-[56px]">
        Payment
      </h2>
      <div className="bg-background-second p-[60px] rounded-2xl flex items-center gap-[54px]">
        <div>
          <p className="text-neutral2 mb-4">
            Total cost:
            <span className="font-bold text-[36px] text-themetext">$789</span>
          </p>

          <div
            className="bg-background-second rounded-2xl relative p-5 flex flex-col justify-between cursor-pointer
            w-full overflow-hidden border border-transparent green_border_hover course_shadow z-20"
          >
            {
              <div className="absolute top-[-98px] right-[-13px] z-[-1]">
                <Image
                  src={design}
                  alt="background image"
                  className="ml-[80px]"
                />
              </div>
            }

            <button className="rounded-full bg-background-revert flex items-center justify-center w-[38px] h-[38px] mb-[60px]">
              <Image
                src={arrow}
                alt="move to course"
                width={21.27}
                className={cn({
                  graphic_gray_answer: resolvedTheme === 'dark',
                })}
              />
            </button>

            <div>
              <p className="px-4 py-2 rounded-full inline bg-opacity-primary text-success border border-primary">
                Beginer
              </p>

              <h2 className="font-extrabold text-[32px] leading-[44px] mt-4 text-themetext">
                Orientieren-Aufstellen-Loslegen
                <span className="text-primary font-medium">KIP GmbH</span>
              </h2>
              <p className="text-neutral2 font-medium text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>
          </div>
        </div>

        <div>
          <button>Pay</button>

        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
