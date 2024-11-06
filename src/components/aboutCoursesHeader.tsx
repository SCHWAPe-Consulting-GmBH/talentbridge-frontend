import { RegisterForCourseButton } from "./registerForCourseButton";

export const AboutCoursesHeader = () => {

  const data = {
    course: "Graphic Design",
    level: "Beginning",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    experience: "basic web design skills, ability to work in Figma",
    start: "October 22, 2024",
    group: "20 students",
    duration: "3 months"
  }

  return (
    <div className="flex justify-between w-full mb-[95px]">
      <div className="flex flex-col justify-start">
        <h1 className="font-extrabold text-[96px] text-themetext mb-4 leading-[121px]">
          {data.course} <br />
          <span className="text-primary font-medium">{data.level}</span>
        </h1>
        <p className="text-neutral2 font-medium text-[24px] leading-[33px] mb-8">
          {data.description}
        </p>
        <RegisterForCourseButton/>
      </div>
      <div className="bg-primary p-8 rounded-2xl">
        <p className="text-white text-[16px]">Experience</p>
        <p className="text-neutral1 font-bold text-[24px] mb-4">
          {data.experience}
        </p>
        <p className="text-white text-[16px]">Start</p>
        <p className="text-neutral1 font-bold text-[24px] mb-4">
          {data.start}
        </p>
        <p className="text-white text-[16px]">Group</p>
        <p className="text-neutral1 font-bold text-[24px] mb-4">{data.group}</p>
        <p className="text-white text-[16px]">Duration</p>
        <p className="text-neutral1 font-bold text-[24px]">{data.duration}</p>
      </div>
    </div>
  );
};
