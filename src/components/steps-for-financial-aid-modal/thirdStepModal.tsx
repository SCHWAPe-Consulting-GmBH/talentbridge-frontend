import cn from 'classnames';
import { useState } from 'react';
import { SelectDate } from '../selectDate';
import { updateUserPayment } from '@/firebase/auth';
import { useAuth } from '@/firebase/context/authContext';

interface Props {
  isThirdStepShown: boolean;
  onChangeThirdStepShown: (value: boolean) => void;
  onChangeReloadPayment: (value: string) => void;
}

export const ThirdStepModal: React.FC<Props> = ({
  isThirdStepShown,
  onChangeThirdStepShown,
  onChangeReloadPayment
}) => {
  const [scheduledDate, setSchedulateDate] = useState({
    month: '',
    day: 0,
    hours: ''
  })
  const { currentUser } = useAuth();

  const handleChangeDate = (value: string | number, field: string) => {
    setSchedulateDate(prevDate => ({...prevDate, [field]: value}));
  }

  const handleRegister = async() => {
    const paymentToUpdate = {
      step_3: 'completed',
      step_4: 'in progress',
    };
    await updateUserPayment(currentUser.uid, paymentToUpdate);

    onChangeReloadPayment('123');
    onChangeThirdStepShown(false);
    return;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 bg-opacity-modal flex justify-center items-center z-40',
        {
          hidden: !isThirdStepShown,
        }
      )}
    >
      <div className="bg-background-second rounded-xl shadow-xl relative p-[48px] flex flex-col w-[1082px]">
        <button
          onClick={() => onChangeThirdStepShown(false)}
          className="absolute top-4 right-8 text-5xl text-gray-500 hover:text-gray-800 btn_scale"
        >
          &times;
        </button>

        <h2 className="font-bold text-[24px] text-themetext leading-5 mb-9">
          Appointment for the AVGS
        </h2>
        <p className="font-bold text-[16px] text-themetext mb-3">
          Please select a convenient date and time for your appointment. Our team will confirm the meeting details shortly.
        </p>

        <SelectDate scheduledDate={scheduledDate} onChangeSheduledDate={handleChangeDate} width={310}/>

        <button
          onClick={() => handleRegister()}
          className='btn_green_hover bg-primary p-[10px] mt-8'
        >
          Register
        </button>
      </div>
    </div>
  );
};
