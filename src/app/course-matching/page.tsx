'use client';

import people from '@/assets/images/Avatars5.png';
import { MatchingCourses } from '@/components/matchingCourses';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CourseMatching = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/about-courses');
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="bg2 background-style px-[100px] bg-background">
      <div className="max-w-[1240px] mx-auto pt-[168px] flex flex-col items-center">
        <p className="text-primary border border-primary rounded-full font-bold text-[24px] px-4 py-2 mb-8">
          Welcome to us!
        </p>
        <h1 className="font-extrabold text-[48px] mb-4 leading-[65px] text-themetext">
          Let's lmprove your skills with us!
        </h1>
        <p className="font-medium text-[24px] text-neutral2 w-[737px] text-center px-[45px] mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna.
        </p>
        <div className="flex mb-[48px]">
          <Image src={people} alt="people" width={120} className="mr-[8px]" />
          <p className="text-neutral2 text-[16px] font-medium">
            Join over{' '}
            <span className="text-primary font-bold text-[20px]">+10K</span>{' '}
            student
          </p>
        </div>
        <MatchingCourses />
        <div className="w-full h-3 px-[50px] max-w-[1200px]">
          <div className=" h-full bg-white rounded-full overflow-hidden flex items-center px-1">
            <div className="h-2 bg-primary animate-loading rounded-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseMatching;
