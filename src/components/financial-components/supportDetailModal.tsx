'use client';

import { Divider } from 'antd';
import cn from 'classnames';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/context/authContext';
import { updateUserPayment } from '@/firebase/auth';

interface Props {
  isSupportDetailShown: boolean;
  onChangeSupportDetailShown: (value: boolean) => void;
}

export const SupportDetailModal: React.FC<Props> = ({
  isSupportDetailShown,
  onChangeSupportDetailShown,
}) => {
  // const { changeFinancialSupport } = useAuth();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const addPaymentMethod = async () => {

    const payUserData = {
      method: 'aid',
      step_1: 'in progress',
      step_2: 'pending',
      step_3: 'pending',
      step_4: 'pending',
      step_5: 'pending',
      done: false,
    };

    await updateUserPayment(currentUser.uid, payUserData);

  }

  return (
    <div
      className={cn(
        'fixed inset-0 bg-opacity-modal flex justify-center items-center z-40',
        {
          hidden: !isSupportDetailShown,
        }
      )}
    >
      <div className="bg-background rounded-lg shadow-xl relative p-8 flex flex-col max-w-[1320px]">
        <button
          onClick={() => onChangeSupportDetailShown(false)}
          className="absolute top-4 right-8 text-5xl text-gray-500 hover:text-gray-800 btn_scale"
        >
          &times;
        </button>

        <h2 className="font-bold text-[24px] mt-8 text-themetext">
          What is and AVGS and why should you get it?
        </h2>
        <div className="flex items-center gap-4 mt-[42px]">
          <div>
            <p className="text-[12px] leading-5 mb-[40px]">
              {' '}
              An AVGS voucher (Aktivierungs- und Vermittlungsgutschein) is a
              government-sponsored program designed to help you enhance your
              skills, overcome employment barriers, and land your dream job.
              This voucher allows you to access free career coaching, training
              programs, and other services to improve your chances in the job
              market—all funded by the German Job Centers or Employment
              Agencies.
            </p>

            <h3 className="text-[24px] leading-6 ">Completely Free Coaching</h3>
            <p className="text-[12px] leading-5 mb-[20px]">
              Unlock personalized coaching services, including resume writing,
              interview preparation, and career strategy sessions—all at no cost
              to you.
            </p>

            <h3 className="text-[24px] leading-6 ">Career-Focused Guidance</h3>
            <p className="text-[12px] leading-5 mb-[20px]">
              Gain insights from experts who can help you identify
              opportunities, navigate the job market, and develop a concrete
              plan to achieve your goals.
            </p>

            <h3 className="text-[24px] leading-6 ">
              Access to Top Training Programs
            </h3>
            <p className="text-[12px] leading-5 mb-[20px]">
              The AVGS voucher covers specialized training that boosts your
              skills in high-demand industries.
            </p>

            <h3 className="text-[24px] leading-6 ">Overcome Barriers</h3>
            <p className="text-[12px] leading-5">
              Whether it’s a language barrier, lack of experience, or unclear
              career direction, the voucher provides resources to help you
              overcome challenges.
            </p>
          </div>

          <div className="flex flex-col">
            {isLoading && <div className='w-[597px] h-[379px] bg-light-gray mb-[42px] rounded-2xl animate-pulse'/>}
            <iframe
              width="597"
              height="379"
              className={`rounded-2xl mb-[42px] ${isLoading && 'hidden'}`}
              src="https://www.youtube.com/embed/gfU1iZnjRZM"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setIsLoading(false)}
            />

            <button
              onClick={async () => {
                await addPaymentMethod();
                router.push('/dashboard/financial-aid');
              }}
              className="bg-primary font-semibold text-[16px] p-[11px] rounded-lg btn_green_hover self-end"
            >
              Start Process
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
