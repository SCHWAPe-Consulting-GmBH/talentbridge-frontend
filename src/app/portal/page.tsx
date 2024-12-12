'use client';

import cn from 'classnames';
import { HomeworkPortalCoach } from '@/components/portal/homeworkPortalCoach';
import { StudentPortalCoach } from '@/components/portal/studentPortalCoach';
import { CoursePortalCoach } from '@/components/portal/coursePortalCoach';
import { MeetingPortalCoach } from '@/components/portal/meetingPortalCoach';

const Portal = () => {
  return (
    <div
      className={cn(
        'mt-[20px] max-w-[1200px] pr-[24px]',
        'flex flex-col space-y-4'
      )}
    >
      <div className="flex justify-between  w-full ">
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
