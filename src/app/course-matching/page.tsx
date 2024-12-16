import Image from 'next/image';
import people from '@/assets/images/Avatars5.png';
import { MatchingCourses } from '@/components/matchingCourses';

const CourseMatching = () => {
  return (
    <main className="bg2 background-style px-[50px] bg-background overflow-auto">
      <div className="max-w-[1240px] mx-auto pt-[150px] flex flex-col items-center">
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
          <Image src={people} alt="people" width={120} className="mr-[8px] h-auto" />
          <p className="text-neutral2 text-[16px] font-medium">
            Join over
            <span className="text-primary font-bold text-[20px]">+10K</span>{' '}
            student
          </p>
        </div>
        <MatchingCourses />
      </div>
    </main>
  );
};

export default CourseMatching;
