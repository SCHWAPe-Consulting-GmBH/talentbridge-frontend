'use client';

import { useState } from 'react';
import cn from 'classnames';
// import { v4 as uuidv4 } from 'uuid';
import { Select } from 'antd';
// import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow_select.svg';
import { RegistrationNotification } from '@/components/registrationNotification';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Registration = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [scheduledDate, setSchedulateDate] = useState({
    month: '',
    day: 0,
    hours: ''
  })

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
          <button className="font-semibold p-[10px] bg-primary border border-primary rounded-lg btn_hover">
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
          <div className="bg-background-second rounded-lg shadow-xl max-w-md w-full relative p-[48px] flex flex-col items-center">
            <button
              onClick={() => setIsModalShown(false)}
              className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-[36px] font-semibold text-themetext mb-8">
              Choose a date
            </h2>

            <div className="flex ">
              {/* <ArrowIcon height={25} width={25} fill="pink" stroke="#0066ff"/> */}
              {/* <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                placeholder='month'
                suffixIcon={<ArrowIcon height={25} width={25} fill="pink" stroke="#0066ff"/>}
                onChange={e => handleChangeDate(e, 'month')}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              /> */}
              {/* <p>тут має бути select </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
