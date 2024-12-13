import Slider from 'react-slick';
import { OneSlideHub } from './oneSlideHub';
import { v4 as uuidv4 } from 'uuid';
import data from '@/dataJson/sliderHubData.json';
import { CustomNextArrow, CustomPrevArrow } from './customArrows';

export const MustKnowHub = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <section className="mt-[150px]">
      <h2 className="font-bold text-[48px] mb-[80px]">Must know!</h2>
      <div className="h-[625px] w-full">
        <Slider {...settings}>
          {data.map((slide, index) => (
            <OneSlideHub key={uuidv4()} slideData={slide} index={index}/>
          ))}
        </Slider>
      </div>
    </section>
  );
};
