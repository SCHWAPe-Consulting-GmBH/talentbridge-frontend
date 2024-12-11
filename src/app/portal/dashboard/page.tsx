'use client';

import cn from 'classnames';
import { Meetings } from '@/components/meetings';
import { CoachingProgressPortal } from '@/components/portal/coachingProgressPortal';
import { DocumentsPortal } from '@/components/portal/documetsPortal';
import { HomeworkPortal } from '@/components/portal/homeworkPortal';
import { ProgressChart } from '@/components/progressChart';
import data from '@/dataJson/progressBarPortal.json';
import Link from 'next/link';
import { HomeworkPortalCoach } from '@/components/portal/homeworkPortalCoach';
import { StudentPortalCoach } from '@/components/portal/studentPortalCoach';
import { CoursePortalCoach } from '@/components/portal/coursePortalCoach';
import { MeetingPortalCoach } from '@/components/portal/meetingPortalCoach';

const PortalDashboard = () => {
  return (
    <div
      className={cn(
        'mt-[20px]  max-w-[1200px] mx-auto',
        'flex flex-col space-y-4'
      )}
    >
      <>
        <div className="flex">
          <HomeworkPortalCoach />
        </div>
        <div>
          <CoursePortalCoach />
        </div>
        <div>
          <MeetingPortalCoach />
        </div>

        <div>
          <StudentPortalCoach />
        </div>
      </>
    </div>
  );
};

export default PortalDashboard;
