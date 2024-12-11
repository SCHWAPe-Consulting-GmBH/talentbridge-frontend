import { IStep, TStepStatus } from "@/types/steps"
import Image from "next/image"
import cn from 'classnames';
import greenFire from '@/assets/icons/top_recommendations.svg';
import blueFire from '@/assets/icons/inprogress_blue_fire.svg';
import completed from '@/assets/icons/completed_step.svg';
import img1 from '@/assets/images/image_steps.jpg';
import img2 from '@/assets/images/image2_steps.jpg';
import img3 from '@/assets/images/image3_steps.jpg';

interface Props {
  step: IStep,
  status: TStepStatus,
  index: number,
  onOpenModal: (value: boolean) => void
}

export const Step: React.FC<Props> = ({ step, status, index, onOpenModal }) => {
  const images = [img1, img2, img3, img3, img3]
  return (
    <div
    className={`py-[39px] items-center flex gap-[104px] ${step.id % 2 != 0 ? 'self-end' : 'flex-row-reverse self-start'}`}
  >
    <div className="relative">
      <Image
        src={images[index]}
        alt="step picture"
        width={300}
        height={187}
      />
      <div
        className={cn(
          'absolute top-4 right-4 py-2 px-4 border rounded-full flex gap-2',
          {
            'border-primary bg-light-green':
              status === 'completed',
            'border-info bg-light-blue':
              status === 'in progress',
            'border-warning bg-light-orange':
              status === 'pending',
          }
        )}
      >
        {status != 'pending' && (
          <Image
            src={
              status === 'completed' ? greenFire : blueFire
            }
            alt=""
            width={12}
          />
        )}
        <p
          className={cn(
            'leading-4 font-medium text-[12px] capitalize',
            {
              'text-primary': status === 'completed',
              'text-info': status === 'in progress',
              'text-warning': status === 'pending',
            }
          )}
        >
          {status}
        </p>
      </div>
    </div>

    <div
      className={`flex flex-col max-w-[568px] ${step.id % 2 === 0 ? 'items-end' : 'items-start'}`}
    >
      <div
        className={cn(
          'h-12 w-12 flex items-center justify-center border-[2px] rounded-full mb-6',
          {
            'border-neutral2': status === 'pending',
            'border-primary bg-primary':
              status === 'completed',
            'border-primary': status === 'in progress',
          }
        )}
      >
        {status === 'completed' ? (
          <Image src={completed} alt="" width={23} />
        ) : (
          <p
            className={`font-semibold text-[32px] leading-[44px] ${status === 'pending' ? 'text-neutral2' : 'text-themetext'}`}
          >
            {step.id}
          </p>
        )}
      </div>

      <h3 className="text-themetext text-[24px] font-bold mb-[10px]">
        {step.title}
      </h3>
      <p
        className={`text-themetext mb-2 ${step.id % 2 === 0 && 'text-end'}`}
      >
        {step.description}
      </p>
      {status != 'completed' && (
        <button
          disabled={status === 'pending'}
          onClick={() => onOpenModal(true)}
          className={`px-[10px] py-[5px] rounded-lg font-semibold ${status === 'pending' ? 'bg-neutral2 text-white ' : 'bg-primary text-secondary btn_green_hover'}`}
        >
          More details
        </button>
      )}
    </div>
  </div>
  )
}