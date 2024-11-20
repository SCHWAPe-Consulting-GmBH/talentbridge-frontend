import { DataForProgressBar } from '@/types/dataForProgressBar';
import { ProgressBar } from '../progressBar';

interface Props {
  data: DataForProgressBar;
}

export const CoachingProgress: React.FC<Props> = ({ data }) => {
  return (
    <div className="mt-[108px] flex flex-col items-center">
      <div className="flex flex-col items-center mb-[30px]">
        <p className="mb-[10px] font-bold text-[24px] text-themetext">
        Coaching progress
        </p>
        <p className="max-w-[465px] text-center font-bold text-[14px] text-themetext">
          Lorem ipsum dolor sit amet consectetur. Lectus gravida praesent
          pretium varius nulla arcu nunc elementum.
        </p>
      </div>
      <ProgressBar data={data}/>
    </div>
  );
};
