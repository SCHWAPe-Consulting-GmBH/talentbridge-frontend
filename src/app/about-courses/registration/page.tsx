'use client';

import { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/navigation'
import { RegistrationNotification } from '@/components/registrationNotification';
import { IDateSelect } from '@/types/dateSelect';
import { SelectDate } from '@/components/selectDate';


const Registration = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [scheduledDate, setSchedulateDate] = useState<IDateSelect>({
    month: '',
    day: 0,
    hours: ''
  })

  const router = useRouter();

  const handleOpenModal = () => {
    setIsModalShown(true);
  };

  const handleChangeDate = (value: string | number, field: string) => {
    setSchedulateDate(prevDate => ({...prevDate, [field]: value}));
  }

  return (
    <div className="pt-[100px] px-[100px] max-w-[1440px] mx-auto relative">
      <RegistrationNotification />
      <div className="w-[306px] h-[22px] bg-orange-300 rounded-lg flex justify-center mb-[246px]">
        breadcrumbs
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-themetext font-extrabold text-[96px] leading-[131px] mb-4">
          Registration
        </h1>
        <p className="text-themetext text-[24px] text-center mb-8">
          Great news! Our coach is ready to connect with you right away and
          share all the important details. Alternatively, you can schedule a
          meeting at a time that suits you best. We look forward to your
          upcoming meeting!
        </p>
        <div className="flex justify-center space-x-[32px]">
          <button
            onClick={() => {router.push('/about-courses/registration/call-waiting')}}
            className="text-neutral1 font-semibold p-[10px] bg-primary border border-primary rounded-lg btn_green_hover"
          >
            Contact the coach now
          </button>
          <button
            onClick={handleOpenModal}
            className="text-btn-text font-semibold p-[10px] border border-primary rounded-lg btn_white_hover bg-background"
          >
            Schedule a Meeting
          </button>
        </div>

        <div
          className={cn(
            'fixed inset-0 bg-gray-800 bg-opacity-30 flex justify-center items-center',
            {
              hidden: !isModalShown,
            }
          )}
        >
          <div className="bg-background-second rounded-lg shadow-xl relative p-[48px] flex flex-col items-center">
            <button
              onClick={() => setIsModalShown(false)}
              className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-[36px] font-semibold text-themetext mb-8">
              Choose a date
            </h2>

            <SelectDate scheduledDate={scheduledDate} onChangeSheduledDate={handleChangeDate} width={228}/>

            <button className='btn_green_hover bg-primary p-[10px] mt-8'>Schedule a meeting</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
