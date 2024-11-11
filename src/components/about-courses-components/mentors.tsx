'use client'

import mentorsData from '@/dataJson/mentorsData.json';
import Slider from 'react-slick';
import { MentorCard } from './mentorCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Mentors = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    customPaging: () => (
      <div
        style={{
          backgroundColor: "#9F9F9F",
          borderRadius: "10px",
          height: "8px",
          width: "138px",
        }}
      >
      </div>
    )
  };

  return (
    <section className='mb-[100px]'>
      <p className="border border-primary rounded-full text-primary font-bold text-[24px] px-4 py-2 inline ">Meet professional mentors</p>
      <p className="text-themetext font-extrabold mt-6 text-[48px] leading-[65px] mb-8">explore Inspiring Online Courses</p>
      
      <div className="slider-container">
        <Slider {...settings}>
          {mentorsData.map(mentor => <MentorCard mentor={mentor} key={mentor.id}/>)}
        </Slider>
      </div>

    </section>
  );
};
