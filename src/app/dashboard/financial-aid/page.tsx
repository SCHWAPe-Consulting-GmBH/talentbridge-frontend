'use client';

import data from '@/dataJson/progressBarDashboard.json';
import { CoachingProgress } from '@/components/dashboard/coachingProgress';
import { useAuth } from '@/firebase/context/authContext';
import { getUserPayment, updateUserPayment } from '@/firebase/auth';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/loader';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import steps from '@/dataJson/steps.json';
import { StepsSwap } from '@/components/dashboard/stepsSwap';
import { IPaymentData, TStepStatus } from '@/types/steps';
import { Step } from '@/components/dashboard/step';
import { FirstStepModal } from '@/components/steps-for-financial-aid-modal/firstStepModal';
import { SecondStepModal } from '@/components/steps-for-financial-aid-modal/secondStepModal';
import { ThirdStepModal } from '@/components/steps-for-financial-aid-modal/thirdStepModal';
import { FourthStepModal } from '@/components/steps-for-financial-aid-modal/fourthStepModal';
import { FifthStepModal } from '@/components/steps-for-financial-aid-modal/fifthStepModal';
import { useRouter } from 'next/navigation';

function findKeyByValue(obj: IPaymentData, value: TStepStatus) {
  const result = Object.keys(obj).find(
    (key) => obj[key as keyof IPaymentData] === value
  );
  console.log('key', result);

  if (result) {
    const number = result[result.length - 1];
    console.log('number', number);

    return +number;
  } else {
    return 6;
  }
}

const FinancialAid = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { email, displayName } = currentUser;
  const [paymentData, setPaymentData] = useState<IPaymentData | null>(null);
  const [activeStepId, setActiveStepId] = useState(0);
  const [reloadPayment, setReloadPayment] = useState('');

  const [isFirstStepShown, setIsFirstStepShown] = useState(false);
  const [isSecondStepShown, setIsSecondStepShown] = useState(false);
  const [isThirdStepShown, setIsThirdStepShown] = useState(false);
  const [isFourthStepShown, setIsFourthStepShown] = useState(false);
  const [isFifthStepShown, setIsFifthStepShown] = useState(false);

  const functions = [
    setIsFirstStepShown,
    setIsSecondStepShown,
    setIsThirdStepShown,
    setIsFourthStepShown,
    setIsFifthStepShown,
  ];

  const payment = async () => {
    const payment = await getUserPayment(currentUser.uid);
    if (!payment || payment.done) {
      router.push('/dashboard');
      return;
    }
    setPaymentData(payment);

    const activeId = findKeyByValue(payment, 'in progress');
    setActiveStepId(activeId);
  };

  const ifDone = async () => {
    const paymentToUpdate = {
      done: true,
    };
    await updateUserPayment(currentUser.uid, paymentToUpdate);
  };

  if (activeStepId === 6) {
    ifDone();
    router.push('/dashboard');
  }

  useEffect(() => {
    payment();
  }, [reloadPayment]);

  return (
    <>
      {!paymentData ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader width={120} height={120} border={15} />
        </div>
      ) : (
        <>
          <div className="flex flex-col py-[16px] px-5 items-center mt-[105px] mx-auto rounded-xl bg-opacity-light-black max-w-[960px] z-10 min-h-[480px] backdrop-blur-sm">
            <h1 className="font-extrabold text-[60px] text-white mb-[40px]">
              Welcome,
              <br /> {displayName ? displayName : email.split('@')[0]}
            </h1>

            <StepsSwap activeStepId={activeStepId} />
          </div>
          <CoachingProgress data={data} />
          <div className="mt-[100px] flex flex-col items-center mb-16">
            <h2 className="mb-8 font-extrabold text-[48px] text-themetext">
              Steps to be Implemented
            </h2>
            <div className="bg-background-second rounded-full gap-3">
              <button
                className='py-2 px-[45px] font-semibold border rounded-full bg-opacity-primary border-primary text-themetext'
              >
                Steps to Success
              </button>
              <button
                onClick={() => router.push('/learning-hub')}
                className='py-2 px-[45px] font-semibold border rounded-full border-transparent text-neutral2'
              >
                Learning Hub
              </button>
            </div>
          </div>

          <div className="relative h-[1643px] max-w-[1240px]">
            <span className="absolute top-6 left-[50%] translate-x-[-50%] w-2 h-[1535px] bg-gradient-to-b from-neutral2 to-light-gray" />
            <span
              className={cn(
                'absolute top-6 left-[50%] translate-x-[-50%] w-2',
                {
                  'h-0': activeStepId === 1,
                  'h-[800px] bg-gradient-to-b from-primary to-transparent':
                    activeStepId === 2,
                  'h-[1200px] bg-gradient-to-b from-primary to-transparent':
                    activeStepId === 3,
                  'h-[1450px] bg-gradient-to-b from-primary to-transparent':
                    activeStepId === 4,
                  'h-[1535px] bg-gradient-to-b from-primary to-transparent':
                    activeStepId === 5,
                  'h-[1565px] bg-primary': activeStepId > 5,
                }
              )}
            />
            <span
              className={`absolute top-0 left-[50%] translate-x-[-50%] w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold ${activeStepId > 1 ? 'bg-primary text-success' : 'bg-neutral2 text-dark-gray '}`}
            >
              Start
            </span>
            <span className="absolute top-[1524px] left-[50%] translate-x-[-50%] w-16 h-16 bg-light-gray text-medium-gray rounded-full flex items-center justify-center text-[12px] font-bold">
              Finish
            </span>

            <div className="flex flex-col items-center pt-[35px]">
              {steps.map((step, index) => {
                const status = paymentData[
                  `step_${step.id}` as keyof IPaymentData
                ] as TStepStatus;

                return (
                  <Step
                    key={uuidv4()}
                    step={step}
                    status={status}
                    index={index}
                    onOpenModal={functions[index]}
                  />
                );
              })}
            </div>
          </div>

          {isFirstStepShown && (
            <FirstStepModal
              isFirstStepShown={isFirstStepShown}
              onChangeFirstStepShown={setIsFirstStepShown}
              onChangeReloadPayment={setReloadPayment}
            />
          )}

          {isSecondStepShown && (
            <SecondStepModal
              isSecondStepShown={isSecondStepShown}
              onChangeSecondStepShown={setIsSecondStepShown}
              onChangeReloadPayment={setReloadPayment}
            />
          )}

          {isThirdStepShown && (
            <ThirdStepModal
              isThirdStepShown={isThirdStepShown}
              onChangeThirdStepShown={setIsThirdStepShown}
              onChangeReloadPayment={setReloadPayment}
            />
          )}

          {isFourthStepShown && (
            <FourthStepModal
              isFourthStepShown={isFourthStepShown}
              onChangeFourthStepShown={setIsFourthStepShown}
              onChangeReloadPayment={setReloadPayment}
            />
          )}

          {isFifthStepShown && (
            <FifthStepModal
              isFifthStepShown={isFifthStepShown}
              onChangeFifthStepShown={setIsFifthStepShown}
              onChangeReloadPayment={setReloadPayment}
            />
          )}
        </>
      )}
    </>
  );
};

export default FinancialAid;
