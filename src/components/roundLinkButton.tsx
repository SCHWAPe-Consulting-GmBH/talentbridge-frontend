'use client';
import { useTheme } from 'next-themes';
import cn from 'classnames';
import Image from 'next/image';
import arrow from '@/assets/icons/arrow_diagonal.svg';

export const RoundLinkButton = () => {
  const { resolvedTheme } = useTheme();

  return (
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
  );
};
