import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { ISlideHub } from '@/types/sliderHub';
import premium_icon from '@/assets/icons/premium_content.svg';
import small1 from '@/assets/images/confidently-slider-hub.jpg';
import small2 from '@/assets/images/confidently-slider-hub2.jpg';
import small3 from '@/assets/images/confidently-slider-hub3.jpg';
import big1 from '@/assets/images/biggest-slider-hub.jpg';
import big2 from '@/assets/images/biggest-slider-hub2.jpg';

interface Props {
  slideData: ISlideHub;
  index: number;
}

export const OneSlideHub: React.FC<Props> = ({ slideData, index }) => {
  const images = [small1, small2, small3];

  return (
    <div className="grid grid-cols-2 gap-8 h-full w-full">
      <div className='relative h-full w-full'>
        <Image
          src={index % 2 === 0 ? big2 : big1}
          alt="Description"
          fill
          style={{ objectFit: 'cover' }}
          className='rounded-lg'
        />

        <div className='absolute top-[50%] translate-y-[-50%] flex flex-col items-center'>
          <p className='font-black text-[36px] text-center text-white mb-4'>{slideData.biggest}</p>
          <button className='bg-primary btn_green_hover text-secondary font-semibold text-[16px] py-[11px] w-[190px]'>
            See more
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {slideData.small.map((sliderSmall, index) => (
          <div key={uuidv4()} className={`bg-background-second p-5 rounded-lg flex gap-5 border border-transparent relative ${sliderSmall.premium ? '' : 'green_border_hover'}`}>
            <Image
              src={images[index]}
              alt="course image"
              width={239}
              className='rounded-l-xl'
            />

            <div className='w-full'>
              <div className='flex justify-between mb-2'>
                <p className='text-neutral2 leading-[19px]'>{`${sliderSmall.time} minutes`}</p>
                <p className='text-neutral2 leading-[19px]'>{sliderSmall.date}</p>
              </div>
              <div className='max-w-[238px] truncate'>
                <p className='text-themetext text-[16px] font-bold mb-1 truncate leading-[22px]'>{sliderSmall.title}</p>
              </div>

              <p className='text-themetext text-[16px] mb-3 leading-[22px]'>Learn how to confidently answer questions and make a lasting impression.</p>
              <button className='border border-primary rounded-lg btn_scale leading-[19px] text-primary py-[5px] w-full font-semibold'>See</button>
            </div>
            {sliderSmall.premium && (
              <div className='absolute w-full h-full top-0 left-0 bg-opacity-55 flex flex-col items-center justify-center'>
                <Image
                  src={premium_icon}
                  alt='premium content'
                  width={36}
                  className='mb-2 z-[2]'
                />
                <p className='text-white text-[24px] font-extrabold leading-[33px] z-[2]'>Premium content</p>
                <div className="absolute w-full h-full bg-gradient-to-b to-primary from-dark-gray rounded-lg opacity-60 z-[1]"/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
