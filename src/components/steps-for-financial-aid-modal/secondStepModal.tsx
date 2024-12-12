import { updateUserPayment } from '@/firebase/auth';
import { useAuth } from '@/firebase/context/authContext';
import cn from 'classnames';
import { useState } from 'react';

interface Props {
  isSecondStepShown: boolean;
  onChangeSecondStepShown: (value: boolean) => void;
  onChangeReloadPayment: (value: string) => void;
}

export const SecondStepModal: React.FC<Props> = ({
  isSecondStepShown,
  onChangeSecondStepShown,
  onChangeReloadPayment,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [errors, setErrors] = useState({
    radio: '',
    email: '',
  });
  const [email, setEmail] = useState('');
  const { currentUser } = useAuth();

  const changeRadioValue = (value: string) => {
    if (errors.radio) {
      setErrors((prev) => ({ ...prev, radio: '' }));
    }

    setSelectedAnswer(value);
  };

  const changeEmail = (email: string) => {
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }

    setEmail(email);
  };

  const handleSend = async () => {
    if (!selectedAnswer) {
      setErrors((prev) => ({ ...prev, radio: 'Choose one variant, please' }));
    }

    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: 'Enter email, please' }));
      return;
    }

    const paymentToUpdate = {
      step_2: 'completed',
      step_3: 'in progress',
    };
    await updateUserPayment(currentUser.uid, paymentToUpdate);

    onChangeReloadPayment('12');
    onChangeSecondStepShown(false);
    return;
  };

  return (
    <div
      className={cn(
        'fixed inset-0 bg-opacity-modal flex justify-center items-center z-40',
        {
          hidden: !isSecondStepShown,
        }
      )}
    >
      <div className="bg-background-second rounded-xl shadow-xl relative p-[48px] flex flex-col w-[1082px]">
        <button
          onClick={() => onChangeSecondStepShown(false)}
          className="absolute top-4 right-8 text-5xl text-gray-500 hover:text-gray-800 btn_scale"
        >
          &times;
        </button>

        <h2 className="font-bold text-[24px] text-themetext leading-5 mb-9">
          Get Contact Info and Registration Help
        </h2>
        <p className="font-bold text-[16px] text-themetext mb-4">
          Follow the link below and follow the instructions.
        </p>

        <a
          className="text-primary mx-auto mb-6"
          href="https://web.arbeitsagentur.de/portal/metasuche/suche/dienststellen"
        >
          https://web.arbeitsagentur.de/portal/metasuche/suche/dienststellen
        </a>

        <p className="font-bold text-[18px] mb-2">Do you know Kundennummer?</p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="radio"
              checked={selectedAnswer === 'Yes'}
              onChange={() => changeRadioValue('Yes')}
            />
            <p>Yes</p>
          </div>

          {selectedAnswer === 'Yes' && (
            <input
              type="text"
              placeholder="Please enter your Kundennummer"
              className="h-[54px] input_text border border-light-gray mb-3 bg-background"
            />
          )}
        </div>
        <div className="flex gap-2 mb-6 relative">
          <input
            type="radio"
            checked={selectedAnswer === 'No'}
            onChange={() => changeRadioValue('No')}
          />
          <p>No</p>
        {errors.radio && <p className="text-error text-[12px] top-[25px] font-semibold absolute">{errors.radio}</p>}
        </div>
        

        <div className="mb-8 relative">
          <p className="font-semibold text-[16px] mb-3">
            Please provide your email address to ensure we can stay in touch
            with you.
          </p>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
            className={`h-[54px] w-full input_text border bg-background ${errors.email ? ' border-error' : ' border-light-gray'}`}
          />
          {errors.email && (
            <p className="text-error text-[12px] top-[90px] font-semibold absolute">
              {errors.email}
            </p>
          )}
        </div>

        <button
          onClick={() => handleSend()}
          className="bg-primary text-secondary py-[11px] w-full rounded-lg btn_green_hover"
        >
          Send
        </button>
      </div>
    </div>
  );
};
