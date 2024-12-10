'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import support from '@/assets/images/need-support-financial.png';
import fine from '@/assets/images/fine-financial.png';
import { useState } from 'react';
import { SupportDetailModal } from './supportDetailModal';

export const FinancialChoices = () => {
  const [isSupportDetailShown, setIsSupportDetailShown] = useState(false);
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="bg-background-second rounded-2xl p-6 flex flex-col box-border border border-transparent green_border_hover course_shadow">
        <p className="font-extrabold text-[24px] leading-[33px] text-themetext mb-4">
          No, I’m fine
        </p>
        <p className="font-medium text-[16px] leading-[22px] mb-[31px]">
          I do not need financial help at this time.
        </p>
        <Image
          src={fine}
          alt="financial fine"
          width={86}
          className="self-center mb-[31px]"
        />
        <button
          onClick={() => router.push('/financial-assistance/choose-path')}
          className="py-[11px] border border-themetext rounded-lg text-themetext btn_white_hover hover:border-transparent"
        >
          Continue
        </button>
      </div>
      <div className="bg-background-second rounded-2xl p-6 flex border border-transparent flex-col green_border_hover course_shadow">
        <p className="font-extrabold text-[24px] leading-[33px] text-themetext mb-2">
          Yes, I need support
        </p>
        <p className="font-medium text-[16px] leading-[22px] mb-6">
          I’d like to explore financial assistance options, including government
          programs
        </p>
        <Image
          src={support}
          alt="need support financial"
          width={86}
          className="self-center mb-6"
        />
        <button
          onClick={() => setIsSupportDetailShown(true)}
          className="py-[11px] border border-themetext rounded-lg text-themetext btn_white_hover hover:border-transparent"
        >
          Get Started
        </button>
      </div>

      {isSupportDetailShown && <SupportDetailModal isSupportDetailShown={isSupportDetailShown} onChangeSupportDetailShown={setIsSupportDetailShown}/>}
    </div>
  );
};
