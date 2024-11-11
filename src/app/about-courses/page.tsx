'use client';
import Image from 'next/image';
import { AboutCoursesHeader } from '@/components/about-courses-components/aboutCoursesHeader';
import { CourseProgram } from '@/components/about-courses-components/courseProgram';
import { Mentors } from '@/components/about-courses-components/mentors';
import { PaymentPlan } from '@/components/about-courses-components/paymentPlan';
import { Skills } from '@/components/about-courses-components/skills';
import { WhyUs } from '@/components/about-courses-components/whyUs';
import { RegisterForCourseButton } from '@/components/registerForCourseButton';
import up from '@/assets/icons/up-arrow.svg';

const AboutCourses = () => {
  return (
    <>
      <div className="absolute top-0 left-0 h-[747px] z-10 bg3 background-style "></div>
      <div className="max-w-[1440px] mx-auto w-full z-20 relative p-[100px] ">
        <div className="w-[190px] h-[22px] bg-orange-300 mb-6 rounded-lg flex justify-center">
          breadcrumbs
        </div>
        <AboutCoursesHeader />

        <div className="bg-background-second rounded-full w-full py-[56px] flex justify-center space-x-[120px] mb-[100px]">
          <p className="text-themetext font-bold text-[64px] leading-[87px] flex flex-col items-center">
            34+
            <span className="text-[24px] font-medium leading-[33px]">
              Сlasses
            </span>
          </p>
          <p className="text-themetext font-bold text-[64px] leading-[87px] flex flex-col items-center">
            800K+
            <span className="text-[24px] font-medium leading-[33px]">
              Members
            </span>
          </p>
          <p className="text-themetext font-bold text-[64px] leading-[87px] flex flex-col items-center">
            10k+
            <span className="text-[24px] font-medium leading-[33px]">
              Mentor
            </span>
          </p>
          <p className="text-themetext font-bold text-[64px] leading-[87px] flex flex-col items-center">
            4.8
            <span className="text-[24px] font-medium leading-[33px]">
              Rating
            </span>
          </p>
        </div>

        <WhyUs />
        <Skills />
      </div>
      <PaymentPlan />
      <div className="max-w-[1440px] mx-auto w-full z-20 relative p-[100px] mt-[100px]">
        <Mentors />
        <CourseProgram />
        <div>
          <div className="max-w-[794px]">
            <p className="text-primary font-extrabold text-[96px] mb-[35px]">
              decided? <br />
              <span className="text-themetext">
                here's how to get on the course
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <RegisterForCourseButton paddingY={19} paddingX={74} />
            <a
              href="#top"
              className="rounded-full bg-primary w-16 h-16 flex justify-center items-center btn_hover cursor-pointer"
            >
              <Image src={up} alt="move to top" width={8} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCourses;
