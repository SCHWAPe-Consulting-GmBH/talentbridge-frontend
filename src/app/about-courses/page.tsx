import Image from 'next/image';
import { AboutCoursesHeader } from '@/components/about-courses-components/aboutCoursesHeader';
import { CourseProgram } from '@/components/about-courses-components/courseProgram';
import { Mentors } from '@/components/about-courses-components/mentors';
import { PaymentPlan } from '@/components/about-courses-components/paymentPlan';
import { Skills } from '@/components/about-courses-components/skills';
import { WhyUs } from '@/components/about-courses-components/whyUs';
import { RegisterForCourseButton } from '@/components/registerForCourseButton';
import up from '@/assets/icons/up-arrow.svg';
import { SummeryInformation } from '@/components/summaryInformation';

const AboutCourses = () => {
  const data = {
    name: 'Graphic Design',
    level: 'Beginning',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    experience: 'basic web design skills, ability to work in Figma',
    start: 'October 22, 2024',
    group: '20 students',
    duration: '3 months',
  };

  return (
    <>
      <div className="absolute top-0 left-0 h-[747px] z-10 bg3 w-full bg-cover"></div>
      <div className="max-w-[1440px] mx-auto w-full z-20 relative p-[100px] ">
        <div className="w-[190px] h-[22px] bg-orange-300 mb-6 rounded-lg flex justify-center">
          breadcrumbs
        </div>
        <AboutCoursesHeader
          courseData={data}
          isNeedButtonRegistration={true}
          textSize={96}
          textLineHeight={121}
        />

        <div className='mb-[100px]'>
          <SummeryInformation />
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
              className="rounded-full bg-primary w-16 h-16 flex justify-center items-center btn_green_hover cursor-pointer"
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
