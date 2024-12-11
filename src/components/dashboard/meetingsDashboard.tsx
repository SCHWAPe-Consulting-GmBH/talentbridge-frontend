
import { Meetings } from '../meetings';

interface Props {
  isShortVersion?: boolean;
}

export const MeetingsDashboard: React.FC<Props> = ({ isShortVersion }) => {
  return (
    <div className="min-w-[457px]">
      <p className="text-themetext text-[24px] font-bold mb-[10px]">Meetings</p>
      <p className="text-themetext text-[14px] mb-[15px] max-w-[377px]">
        Lorem ipsum dolor sit amet consectetur. Lectus gravida praesent pretium
        varius nulla arcu nunc elementum.
      </p>

      <Meetings />
    </div>
  );
};
