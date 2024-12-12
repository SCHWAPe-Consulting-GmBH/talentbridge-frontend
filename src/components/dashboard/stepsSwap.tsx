import Image from 'next/image';
import steps from '@/dataJson/steps.json';
import currentStep from '@/assets/icons/current_step.svg';
import anotherStep from '@/assets/icons/another_step.svg';

interface Props {
  activeStepId: number,
}

export const StepsSwap: React.FC<Props> = ({ activeStepId }) => {
  return (
    <div className="relative flex ">
    <div className="absolute w-[680px] h-[2px] bg-primary top-6 z-[-1] left-[50%] translate-x-[-50%]" />
    <div className="flex flex-col items-center w-[230px]">
      {activeStepId > 1 && (
        <>
          <div className="rounded-xl bg-next-step-gray flex items-center justify-center w-[38px] h-[38px] mb-2 mb-2 mt-[5px]">
            <Image src={anotherStep} alt="" width={13} />
          </div>

          <p className="font-bold text-[16px] text-next-step-gray">
            Your Previous Step was ...
          </p>
          <p className="text-next-step-gray font-bold text-[14px] text-center">
            {steps[activeStepId - 2].title}
          </p>
        </>
      )}
    </div>

    <div className="flex flex-col items-center w-[462px]">
      {activeStepId != 6 && (
        <>
          <div className="rounded-xl bg-primary flex items-center justify-center w-[48px] h-[48px] ">
            <Image src={currentStep} alt="" width={13} />
          </div>

          <p className="text-lighter-green text-[30px] font-bold ">
            Your Current Step is...
          </p>
          <p className="text-white font-medium text-[20px] mb-[30px]">
            {steps[activeStepId - 1].title}
          </p>
          <div className="max-w-[465px] max-h-[47px]">
            <p className="text-white font-bold text-[16px] text-center line-clamp-3">
              {steps[activeStepId - 1].description}
            </p>
          </div>
        </>
      )}
    </div>

    <div className="flex flex-col items-center w-[230px]">
      {activeStepId < 5 && (
        <>
          <div className="rounded-xl bg-next-step-gray flex items-center justify-center w-[38px] h-[38px] mb-2 mt-[5px]">
            <Image src={anotherStep} alt="" width={13} />
          </div>

          <p className="font-bold text-[16px] text-next-step-gray">
            Your Next Step will be ...
          </p>
          <p className="text-next-step-gray font-bold text-[14px] text-center">
            {steps[activeStepId].title}
          </p>
        </>
      )}
    </div>
  </div>
  )
}