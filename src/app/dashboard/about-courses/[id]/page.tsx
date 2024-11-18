'use client';

import Image from "next/image";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import square from "@/assets/images/matching_graphic.png";
import courses from '@/dataJson/courses_recommendations.json';


const AboutCourses = ({}) => {
  const router = useRouter();
  const { id } = useParams();
  const currentCourse = courses.find(course => course.id === +(id || 0))
  console.log('current course:', currentCourse);

  return (
    <div className="mt-[56px] flex flex-col items-center">
      <h2 className="text-themetext font-extrabold text-[48px] mb-4">
        {currentCourse?.title}
      </h2>
      <p className="font-medium text-[24px] text-neutral2 text-center max-w-[968px] mb-4">
        This course will provide you with all the knowledge and skills needed to
        successfully apply for your AVGS. You’ll receive personalized coaching
        and practical advice from industry experts.
      </p>
      <button 
      onClick={() => router.push(`/dashboard/payment-options`)}
        className="px-[46px] py-[11px] bg-primary rounded-lg btn_green_hover font-semibold text-[16px] mb-8"
      >
        Book a place
      </button>
      <div className="bg-background-second p-6 rounded-2xl w-full relative">
        <p className="font-medium text-[12px] text-success border border-primary bg-opacity-primary px-4 py-2 rounded-full inline">
          4 weeks
        </p>
        <p className="text-themetext font-extrabold text-[20px] mb-1 mt-4 leading-[27px]">Instructors:</p>
        <p className="text-neutral2 font-medium text-[16px] mb-2 leading-[22px]">John Doe, Senior Coach | Jane Smith, CV Expert</p>
        <p className="text-themetext font-extrabold text-[20px] mb-1 leading-[27px]">Schedule:</p>
        <p className="text-neutral2 font-medium text-[16px] mb-2 leading-[22px]">Classes every Monday and Wednesday, 6 PM - 8 PM</p>
        <p className="text-themetext font-extrabold text-[20px] mb-1 leading-[27px]">Requirements:</p>
        <p className="text-neutral2 font-medium text-[16px] mb-2 leading-[22px]">No prior experience needed</p>
        <Image
          src={square}
          alt="abstraction"
          width={250}
          className="absolute top-[11px] right-[29px]"
        />
      </div>
    </div>
  );
};

export default AboutCourses;
