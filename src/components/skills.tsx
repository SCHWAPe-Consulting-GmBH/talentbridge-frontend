import { RegisterForCourseButton } from "./registerForCourseButton";

interface Data {
  [key: string]: string[];
}

export const Skills = () => {
  const data: Data = {
    'hard skills': [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    ],
    'soft skills': [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    ],
  };

  return (
    <div className="mb-[100px]">
      <h2 className="font-extrabold text-[64px] leading-[87px] text-primary mb-8">
        skills, <br />
        <span className="text-themetext">which we will master</span>
      </h2>

      {Object.keys(data).map((key) => (
        <div className="flex justify-between relative mb-8 after:block after:h-[2px] after:bg-primary after:opacity-[30%]  after:absolute after:top-[-16px] after:w-full">
          <p className="text-themetext font-extrabold text-[48px]">{key}</p>
          <ol className="list-disc list-inside pl-4">
            {data[key].map(item => (
              <li className="text-themetext font-medium text-[24px] mb-4">{item}</li>
            ))}
          </ol>
        </div>
      ))}

      <div className="flex justify-end">
        <RegisterForCourseButton/>
      </div>
    </div>
  );
};
