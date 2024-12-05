import Image from "next/image";
import { RegisterForCourseButton } from "../registerForCourseButton";
import icon from '@/assets/images/white_cube.png';

interface Props {
  textSize: number;
  textLineHeight: number;
  courseData: ICourseDetailedData;
  isNeedButtonRegistration: boolean;
}

export const AboutCoursesHeader: React.FC<Props> = ({ courseData, isNeedButtonRegistration, textSize, textLineHeight }) => {

  return (
    <div className="flex justify-between w-full mb-[95px]">
      <div className="flex flex-col justify-start max-w-[706px] mr-3">
        <h1
          style={{ fontSize: `${textSize}px`, lineHeight: `${textLineHeight}px` }}
          className="font-extrabold text-themetext mb-4"
        >
          {courseData.name} <br />
          <span className="text-primary font-medium">{courseData.level}</span>
        </h1>
        <p className="text-neutral2 font-medium text-[24px] leading-[33px] mb-8">
          {courseData.description}
        </p>
        {isNeedButtonRegistration && <RegisterForCourseButton/>}
      </div>
      <div className="bg-primary p-8 rounded-2xl max-w-[357px] relative z-20">
        <p className="text-white text-[16px]">Experience</p>
        <p className="text-neutral1 font-bold text-[24px] mb-4">
          {courseData.experience}
        </p>
        <p className="text-white text-[16px]">Start</p>
        <p className="text-neutral1 font-bold text-[24px] mb-4">
          {courseData.start}
        </p>
        <p className="text-white text-[16px]">Group</p>
        <p className="text-neutral1 font-bold text-[24px] mb-4">{courseData.group}</p>
        <p className="text-white text-[16px]">Duration</p>
        <p className="text-neutral1 font-bold text-[24px] ">{courseData.duration}</p>

        <Image
          src={icon}
          width={250}
          alt='background icon'
          className="absolute bottom-0 right-0 z-[-1]"
        />
      </div>
    </div>
  );
};
