import { AboutCoursesHeader } from "@/components/aboutCoursesHeader";
import { PaymentPlan } from "@/components/paymentPlan";
import { Skills } from "@/components/skills";
import { WhyUs } from "@/components/whyUs";

const AboutCourses = () => {
  return (
    <main className="bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[747px] z-10 bg3 ">
      </div>
      <div className="max-w-[1440px] mx-auto w-full z-20 relative p-[100px] ">
        <div className="w-[190px] h-[22px] bg-orange-300 mb-6 rounded-lg flex justify-center">
          breadcrumbs
        </div>
        <AboutCoursesHeader/>

        <div className='bg-background-second rounded-full w-full py-[56px] flex justify-center space-x-[120px] mb-[100px]'>
          <p className='text-themetext font-bold text-[64px] leading-[87px] flex flex-col items-center'>34+
            <span className='text-[24px] font-medium leading-[33px]'>Сlasses</span>
          </p>
          <p className='text-themetext font-bold text-[64px] leading-[87px] flex flex-col items-center'>800K+
            <span className='text-[24px] font-medium leading-[33px]'>Members</span>
          </p>
          <p className='text-themetext font-bold text-[64px] leading-[87px] flex flex-col items-center'>10k+
            <span className='text-[24px] font-medium leading-[33px]'>Mentor</span>
          </p>
          <p className='text-themetext font-bold text-[64px] leading-[87px] flex flex-col items-center'>4.8
            <span className='text-[24px] font-medium leading-[33px]'>Rating</span>
          </p>
        </div>

        <WhyUs/>
        <Skills/>
        
      </div>
      <PaymentPlan/>
    </main>
  );
};

export default AboutCourses;
