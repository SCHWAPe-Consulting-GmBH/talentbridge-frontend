import { DataForProgressBar } from "@/types/dataForProgressBar";
import { ProgressBar } from "../progressBar";

interface Props {
  data: DataForProgressBar;
}

export const CoachingProgressPortal: React.FC<Props> = ({ data }) => {
  return (
    <div >
      <h2 className="mb-2 text-themetext font-bold text-[20px]">Coaching progress</h2>
      <ProgressBar data={data}/>
    </div>
  );
}