import { PathChoices } from "@/components/financial-components/pathChoices";

const ChoosePath = () => {
  return (
    <div className="max-w-[1240px] mx-auto pt-[150px] flex flex-col items-center">
      <h1 className="font-extrabold text-[48px] mb-4 leading-[65px] text-themetext text-center">
        Choose Your Path to Success!
      </h1>
      <p className="font-medium text-[24px] text-neutral2 text-center mb-8">
        Based on your selection, we recommend the following paths to help you
        reach your goal. <br/> Choose one to see the steps required.
      </p>
      <PathChoices />
    </div>
  );
};

export default ChoosePath;
