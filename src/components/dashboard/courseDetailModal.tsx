import React from 'react';
import cn from 'classnames';
import { AboutCoursesHeader } from '../about-courses-components/aboutCoursesHeader';
import { SummeryInformation } from '../summaryInformation';
import { RegisterForCourseButton } from '../registerForCourseButton';

interface Props {
  isCourseDetailShown: boolean;
  onChangeCourseDetailShown: (value: boolean) => void;
  course: ICourse,
  onChangeSelectedCourse: (value: null | ICourse) => void;
}

export const CourseDetailModal: React.FC<Props> = ({
  isCourseDetailShown,
  onChangeCourseDetailShown,
  course,
  onChangeSelectedCourse
}) => {
  const data = {
    name: course.name,
    level: 'KIP GmbH',
    description: course.description,
    experience: 'basic web design skills, ability to work in Figma',
    start: 'October 22, 2024',
    group: '20 students',
    duration: '3 months',
  };

  const handleClose = () => {
    onChangeSelectedCourse(null);
    onChangeCourseDetailShown(false);
  }

  return (
    <div
      className={cn(
        'fixed inset-0 bg-opacity-modal flex justify-center items-center z-40',
        {
          hidden: !isCourseDetailShown,
        }
      )}
    >
      <div className="bg-background bg6 rounded-lg shadow-xl relative px-[50px] pt-[126px] flex flex-col max-w-[1340px]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-8 text-5xl text-gray-500 hover:text-gray-800 btn_scale"
        >
          &times;
        </button>

        <AboutCoursesHeader
          courseData={data}
          isNeedButtonRegistration={false}
          textSize={64}
          textLineHeight={87}
        />

        <div className="mb-[61px] relative ">
          <SummeryInformation />

        <div className='absolute left-[40%] bottom-[-30px]'>
          <RegisterForCourseButton paddingY={23} paddingX={46} textSize={24}/>
        </div>
        </div>

      </div>
    </div>
  );
};
