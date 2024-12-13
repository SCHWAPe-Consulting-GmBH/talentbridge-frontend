import Image from 'next/image';
import arrow_left from '@/assets/icons/slider_hub_left.svg';
import arrow_right from '@/assets/icons/slider_hub_right.svg';

interface ArrowProps {
  onClick?: () => void;
}


export const CustomNextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    className='absolute z-10 cursor-pointer right-[-50px] translate-y-[-50%] top-[50%] px-3 py-2 btn_light_shadow rounded-full'
  >
    <Image
      src={arrow_right}
      alt="arrow right"
      width={7}
    />
  </div>
);

export const CustomPrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    className='absolute z-10 cursor-pointer left-[-50px] translate-y-[-50%] top-[50%] px-3 py-2 btn_light_shadow rounded-full'
  >
    <Image
      src={arrow_left}
      alt="arrow left"
      width={7}
    />
  </div>
);