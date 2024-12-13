import { HomeworkPortalCoach } from '@/components/portal/homeworkPortalCoach';
import { StudentPortalCoach } from '@/components/portal/studentPortalCoach';
import { CoursePortalCoach } from '@/components/portal/coursePortalCoach';
import { MeetingPortalCoach } from '@/components/portal/meetingPortalCoach';

const Portal = () => {
  return (
    <div
      className='mt-[20px] max-w-[1300px] pb-[50px] mx-auto pr-[24px] flex flex-col space-y-4'
    >
      <div className="flex justify-between w-full ">
        <HomeworkPortalCoach />
        <CoursePortalCoach />
        <MeetingPortalCoach />
      </div>

      <div>
        <StudentPortalCoach />
      </div>
    </div>
  );
};

export default Portal;
