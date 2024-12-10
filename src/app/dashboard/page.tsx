import { HomeworkDashboard } from '@/components/dashboard/homeworkDashboard';
import { MeetingsDashboard } from '@/components/dashboard/meetingsDashboard';
import { ProgressChart } from '@/components/progressChart';
import { useAuth } from '@/firebase/context/authContext';

const Dashboard = () => {

  return (
    <div className="mt-[30px]">
      <div className="flex space-x-[30px]">
        <div className="w-full">
          <p className="text-themetext text-[24px] font-bold mb-[10px]">
            Progress
          </p>
          <p className="text-themetext text-[14px] mb-[15px] max-w-[377px]">
            Lorem ipsum dolor sit amet consectetur. Lectus gravida praesent
            pretium varius nulla arcu nunc elementum.{' '}
          </p>

          <ProgressChart maxHeightWrap={475} maxHeightInner={465} />
        </div>
        <MeetingsDashboard />
      </div>
      <HomeworkDashboard />
    </div>
  );
};

export default Dashboard;
