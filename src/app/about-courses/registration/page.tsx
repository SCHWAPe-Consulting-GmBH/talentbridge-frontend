'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Select } from 'antd';
import { useRouter } from 'next/navigation'
import months from '@/dataJson/months.json';
import { IconArrowForSelect } from '@/components/iconArrowForSelect';
import { RegistrationNotification } from '@/components/registrationNotification';
import { getVisibleDays } from '@/utils/getDays';
import { getVisibleHours } from '@/utils/getHours';


const Registration = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [scheduledDate, setSchedulateDate] = useState({
    month: '',
    day: 0,
    hours: ''
  })

  const router = useRouter();

  const visibleDays = getVisibleDays(scheduledDate.month);
  const visibleHours = getVisibleHours(scheduledDate.month, scheduledDate.day);

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
            className="font-semibold p-[10px] bg-primary border border-primary rounded-lg btn_hover"
          >
            Contact the coach now
          </button>
          <button
            onClick={handleOpenModal}
            className="font-semibold p-[10px] border border-primary rounded-lg btn_hover bg-background"
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

            <div className="flex items-center mb-8">
              <Select
                style={{ width: 228, height: 56 }}
                placeholder='Month'
                suffixIcon={<IconArrowForSelect/>}
                onChange={e => handleChangeDate(e, 'month')}
                options={months}
              />

              <div className='w-3 h-1 bg-neutral2 mx-2'></div>

              <Select
                style={{ width: 228, height: 56 }}
                placeholder='Day'
                suffixIcon={<IconArrowForSelect/>}
                onChange={e => handleChangeDate(e, 'day')}
                options={visibleDays}
              />

              <div className='w-3 h-1 bg-neutral2 mx-2'></div>

              <Select
                style={{ width: 228, height: 56 }}
                placeholder='Hours'
                suffixIcon={<IconArrowForSelect/>}
                onChange={e => handleChangeDate(e, 'hours')}
                options={visibleHours}
              />
            </div>

            <button className='btn_hover bg-primary p-[10px]'>Schedule a meeting</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
